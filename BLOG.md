# Exploring Upstash Box: I Turned It Into a Repo Security Scanner

I came across [Upstash Box](https://upstash.com/docs/box/overall/quickstart) recently — isolated cloud containers with a built-in AI agent. Each box gets its own filesystem, shell, git, and runtime. The agent inside can read files, execute bash commands, and reason about what it finds. Not just an LLM call — a full autonomous agent loop with tool use.

Naturally, I wanted to push it and see what it could actually do. So I built **safescan** — a CLI that throws any GitHub repo into a sandboxed container, lets an AI agent rip through the code, and spits out a security report. Static analysis, dynamic analysis, structured findings, all inside a throwaway box that gets destroyed when it's done.

Here's how I put it together.

## What Upstash Box Gives You

> [Upstash Box Docs](https://upstash.com/docs/box/overall/quickstart)

Before diving into the code — here's what I'm working with:

- **Isolation** — each box is a Docker container with its own filesystem, processes, and network stack. No inter-box communication. Code inside can't reach anything outside.
- **Built-in AI agent** — attach a Codex or Claude agent that can read files, run bash, use git, grep, glob — all autonomously inside the container.
- **Ephemeral** — `box.delete()` and everything is gone. No cleanup.
- **Multi-runtime** — Node, Python, Go, Ruby, Rust. One API for all of them.
- **Pay per use** — CPU billed only during active execution. Idle boxes cost almost nothing.

This combination makes it interesting for running untrusted code. You get a real environment where things can actually execute, but nothing escapes.

## Step 1: Spinning Up the Sandbox

The first thing safescan does is create a box with an OpenAI Codex agent attached:

```ts
const box = await Box.create({
  runtime: "node",
  agent: {
    runner: Agent.Codex,
    model: OpenAICodex.GPT_5_3_Codex,
    apiKey: process.env.OPENAI_API_KEY!,
  },
});
```

That's it. One call and you get a fresh Alpine Linux container — 2 vCPU, 2GB RAM, 10GB disk — with an AI agent ready to go. No Docker setup, no container orchestration, no agent framework wiring.

## Step 2: Clone and Let the Agent Loose

Next, clone the target repo and hand it off to the agent with a security audit prompt:

```ts
await box.git.clone({ repo: repoUrl });

const stream = await box.agent.stream({
  prompt: SCAN_PROMPT,
  timeout: 300_000,
  onToolUse(tool) {
    logTool(tool.name, tool.input);
  },
});
```

I'm using `stream()` instead of `run()` here — this was a deliberate choice. With streaming, I can watch the agent work in real-time through the `onToolUse` callback. Every time the agent calls a tool (reads a file, runs a bash command, greps for a pattern), I see it.

The agent performs two phases:

**Phase 1 — Static Analysis:**
- Obfuscated code, `eval()`, `exec()`, `Function()` constructors
- Suspicious `postinstall` / `preinstall` scripts
- Environment variable harvesting (`process.env`, `os.environ`)
- Hardcoded network calls to unknown external endpoints
- Filesystem access outside the project directory
- Crypto mining patterns, reverse shells, data exfiltration
- Typosquatting in dependency names
- GitHub Actions workflow supply chain risks

**Phase 2 — Dynamic Analysis:**
- Actually runs `npm install` (or `pip install`, `go mod download`) and observes what happens
- Checks what files were created or modified after install
- Looks at network-related code that runs on import

The dynamic part is where sandboxing really matters. Some packages only do malicious things at install time. Inside the box, the agent can just run it and see what happens.

## Step 3: Watching the Agent Work

This is the part that made me appreciate the `stream()` API. I set up tool icons so each agent action gets a clean log line:

```ts
const TOOL_ICONS: Record<string, string> = {
  Read: "📄",
  Write: "✏️",
  Bash: "⚡",
  Glob: "🔍",
  Grep: "🔎",
};

function logTool(name: string, input: Record<string, unknown>) {
  const icon = TOOL_ICONS[name] || "🔧";
  let detail = "";

  if (name === "Bash" && input.command) {
    detail = ` $ ${input.command}`;
  } else if (name === "Read" && input.file_path) {
    detail = ` ${input.file_path}`;
  } else if (name === "Grep" && input.pattern) {
    detail = ` /${input.pattern}/`;
  }

  console.log(`  ${icon} ${name}${detail}`);
}
```

Then consume the stream and show reasoning progress:

```ts
for await (const chunk of stream) {
  if (chunk.type === "reasoning") {
    process.stdout.write(".");
  }
}
```

In the terminal, you see the agent thinking and acting — reading `package.json`, globbing for shell scripts, grepping for `eval(`, running `npm install`, inspecting what changed. It's not a black box.

## Step 4: Structured Output and the Report

After the stream completes, I parse the agent's output into a typed report:

```ts
interface Finding {
  severity: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  location: string;
  detail: string;  // full explanation of the vulnerability
}

interface ScanReport {
  riskLevel: "safe" | "warning" | "dangerous";
  summary: string;
  findings: Finding[];
  cost?: { totalUsd: number; computeMs: number };
}
```

Each finding has a `detail` field — a 2-4 sentence explanation of what the code does, why it's dangerous, how it could be exploited, and the recommended fix. The agent writes these because it actually read and understood the code.

The report renders in the terminal with color-coded severity, and also gets saved as a Markdown file:

```ts
const slug = repoSlug(repoUrl);
const filename = `safescan-${slug}-${Date.now()}.md`;
const md = generateMarkdown(repoUrl, report);
await Bun.write(filename, md);
```

The Markdown includes a summary table, each finding as its own section with full detail, and a footer explaining the sandbox methodology. Share it with your team or attach it to a PR.

## Step 5: Destroy the Box

No matter what — success, failure, timeout — the box gets destroyed:

```ts
try {
  // ... scan logic
} finally {
  await box.delete();
}
```

Whatever the repo tried to do, it's gone.

## The Prompt

The security audit prompt is the core of the whole thing. Here's what I'm sending to the agent:

```ts
const SCAN_PROMPT = `You are a security auditor. Analyze the cloned
repository in /work for security risks.

PHASE 1 — Static Analysis:
- Check for obfuscated code, base64-encoded strings, eval(), exec(),
  Function() constructors
- Inspect install hooks: postinstall, preinstall, prepare scripts
  in package.json, setup.py, Makefile, etc.
- Look for environment variable harvesting (process.env, os.environ)
- Detect suspicious network calls (fetch, http, axios, requests)
  to hardcoded external URLs
- Check for filesystem access outside the project directory
- Identify minified or bundled files that could hide malicious intent
- Look for crypto mining patterns, reverse shells, data exfiltration
- Check for typosquatting in dependency names
- Examine GitHub Actions workflows for supply chain risks

PHASE 2 — Dynamic Analysis:
- Run the install step (npm install / pip install / go mod download)
  and observe what happens
- Check what files were created or modified after install
- Look at any network-related code that runs on import or install

IMPORTANT: After your analysis, output your final result as a single
JSON block:
{
  "riskLevel": "safe" | "warning" | "dangerous",
  "summary": "one-line summary of what you found",
  "findings": [
    {
      "severity": "HIGH" | "MEDIUM" | "LOW",
      "title": "short description of the issue",
      "location": "file/path:line",
      "detail": "A detailed explanation of the vulnerability..."
    }
  ]
}

Be specific about file paths and line numbers.
If the repo looks clean, return riskLevel "safe" with empty findings.
Only flag real, concrete issues — not hypothetical ones.`;
```

That last line matters. Without it, the agent over-reports — flagging every theoretical risk it can imagine. Telling it to stick to concrete issues keeps the signal-to-noise ratio high.

## Demo

Here's what a scan looks like end-to-end:

```
$ bun run index.ts
```

<!-- TODO: INSERT TERMINAL RECORDING (e.g. asciinema or gif) OF FULL SCANNING PROCESS HERE -->

```
┌  safescan — AI-powered repo security scanner
│  Powered by Upstash Box sandboxed environments

◆  GitHub repo URL to scan
│  https://github.com/example/suspicious-package

◐  Creating isolated sandbox...
◐  Cloning repository...
◐  Scanning — agent is working...

  Agent activity:

  📄 Read  /work/package.json
  🔍 Glob  **/*.sh
  ⚡ Bash  $ cat scripts/postinstall.sh
  🔎 Grep  /eval\(/
  ⚡ Bash  $ npm install
  🔎 Grep  /process\.env/
  📄 Read  /work/src/utils/helper.js
  ⚡ Bash  $ find /work -name "*.min.js" -newer /work/package.json
  ......

──────────────────────────────────────────────────

  Repository:  https://github.com/example/suspicious-package
  Risk Level:   WARNING
  Summary:     Suspicious postinstall hook and obfuscated code detected

  Findings:

  HIGH    postinstall script sends ENV vars to external endpoint
          → scripts/postinstall.sh:14

  MEDIUM  base64-encoded payload decoded at runtime
          → src/utils/helper.js:89

  LOW     Unused network dependency not mentioned in README
          → package.json → node-fetch

  Cost: $0.0032 | Time: 12.4s

──────────────────────────────────────────────────

✔  Report saved to safescan-example-suspicious-package-1741794000000.md
```

<!-- TODO: INSERT SCREENSHOT OF THE GENERATED MARKDOWN REPORT FILE HERE -->

### Example Generated Report

<!-- TODO: INSERT SCREENSHOT OR RENDERED PREVIEW OF A REAL safescan-*.md REPORT HERE -->

The generated Markdown report includes:
- A summary table with repository URL, risk level, scan cost, and duration
- Each finding as its own section with severity badge, file location, and a detailed explanation
- A footer explaining the sandbox methodology

## Try It Yourself

```bash
# Clone the repo
git clone https://github.com/your-username/safescan.git
cd safescan

# Install dependencies
bun install

# Set your API keys
cp .env.example .env
# Edit .env with your keys:
#   UPSTASH_BOX_API_KEY=abx_...
#   OPENAI_API_KEY=sk-...

# Run
bun run index.ts
```

You'll need:
- An [Upstash account](https://console.upstash.com/) with a Box API key — see the [Upstash Box quickstart](https://upstash.com/docs/box/overall/quickstart) for setup
- An [OpenAI API key](https://platform.openai.com/) for the Codex agent

<!-- TODO: REPLACE WITH YOUR ACTUAL REPO URL -->
> Full source code: **[github.com/your-username/safescan](https://github.com/your-username/safescan)**

## Where This Could Go

I built this as an exploration, but the pieces are there for something bigger:

- **CI/CD integration** — scan every new dependency before it enters your lockfile
- **Batch scanning** — `Promise.all()` with multiple boxes to scan your entire `package.json` in parallel
- **Snapshots** — `box.snapshot()` the pre-install state and diff against post-install for precise filesystem change detection
- **Multi-model comparison** — spin up one box with Claude and another with Codex, compare their findings

Upstash Box handled the hard parts — container isolation, agent tool calling, ephemeral environments. I just had to write the prompt and the CLI around it.

---

*Built with [Upstash Box](https://upstash.com/docs/box/overall/quickstart), [Bun](https://bun.sh), and a mass curiosity about what's actually hiding in those `node_modules`.*
