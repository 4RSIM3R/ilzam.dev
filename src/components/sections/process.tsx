import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CrosshairIcon,
  ClipboardCheckIcon,
  WorkflowIcon,
  BarChart3Icon,
  SearchIcon,
  UsersIcon,
  PenToolIcon,
  RocketIcon,
  CodeIcon,
  TestTubesIcon,
  GitBranchIcon,
  LayersIcon,
  TargetIcon,
  DatabaseIcon,
  ServerIcon,
  GaugeIcon,
} from "lucide-react";

type ProcessStep = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type IssueRow = {
  issue: string;
  suggestion: string;
};

type TabData = {
  steps: ProcessStep[];
  issues: IssueRow[];
};

const tabsData: Record<string, TabData> = {
  "ux-audit": {
    steps: [
      {
        icon: CrosshairIcon,
        title: "Define Objective",
        description:
          "Identify goal of the audit what business or user problem you want to solve.",
      },
      {
        icon: ClipboardCheckIcon,
        title: "Heuristic Evaluation",
        description:
          "Review the interface using standard UX principles (e.g. Nielsen's 10 heuristics).",
      },
      {
        icon: WorkflowIcon,
        title: "User Flow Analysis",
        description:
          "Check how users move through the product and where they might get stuck.",
      },
      {
        icon: BarChart3Icon,
        title: "Behavioral Data Analysis",
        description:
          "Use analytics or heatmaps to validate friction points with real user data.",
      },
    ],
    issues: [
      {
        issue: 'Ambiguous "arrow" button (send icon)',
        suggestion:
          '"open map", or "send ticket". Replace with a location pin icon or a "Map" label.',
      },
      {
        issue: "Bottom bar affordance",
        suggestion: "Add color highlight or glowing effect to current tab.",
      },
      {
        issue: "Profile photo placement",
        suggestion:
          'Add label (e.g. "by Chef Renatta") or move avatar into metadata row.',
      },
      {
        issue: "Confusing notification icons",
        suggestion:
          "Redesign icons to be more intuitive and provide tooltips for clarification.",
      },
      {
        issue: "Filter icon (hamburger)",
        suggestion:
          "Use rounded background or filter-funnel icon for better clarity.",
      },
      {
        issue: "Typographic contrast",
        suggestion: "Slightly darken to improve readability under sunlight.",
      },
    ],
  },
  "user-segmentation": {
    steps: [
      {
        icon: SearchIcon,
        title: "Research & Discovery",
        description:
          "Gather qualitative and quantitative data about your users through interviews, surveys, and analytics.",
      },
      {
        icon: UsersIcon,
        title: "Segment Identification",
        description:
          "Group users by shared behaviors, goals, demographics, or pain points into clear segments.",
      },
      {
        icon: TargetIcon,
        title: "Persona Development",
        description:
          "Create detailed personas that represent each segment to guide design and product decisions.",
      },
      {
        icon: DatabaseIcon,
        title: "Data Validation",
        description:
          "Validate segments against real usage data and iterate based on emerging patterns.",
      },
    ],
    issues: [
      {
        issue: "Overgeneralized user base",
        suggestion:
          "Break down into at least 3–4 distinct segments based on behavior and goals.",
      },
      {
        issue: "Missing behavioral data",
        suggestion:
          "Integrate analytics tools to track user journeys and interaction patterns.",
      },
      {
        issue: "Static personas",
        suggestion:
          "Update personas quarterly based on new data and shifting user needs.",
      },
      {
        issue: "No prioritization",
        suggestion:
          "Rank segments by business impact to focus design efforts effectively.",
      },
    ],
  },
  "ui-ux-design": {
    steps: [
      {
        icon: PenToolIcon,
        title: "Wireframing",
        description:
          "Sketch out the structure and layout of key screens to establish information hierarchy.",
      },
      {
        icon: LayersIcon,
        title: "Visual Design",
        description:
          "Apply branding, typography, and color systems to create a cohesive visual language.",
      },
      {
        icon: WorkflowIcon,
        title: "Interactive Prototyping",
        description:
          "Build clickable prototypes to simulate real user flows and gather early feedback.",
      },
      {
        icon: ClipboardCheckIcon,
        title: "Usability Testing",
        description:
          "Test prototypes with real users to validate design decisions before development.",
      },
    ],
    issues: [
      {
        issue: "Inconsistent spacing",
        suggestion:
          "Adopt an 8px grid system for consistent alignment across all screens.",
      },
      {
        issue: "Low color contrast",
        suggestion:
          "Ensure all text meets WCAG AA standards (4.5:1 ratio minimum).",
      },
      {
        issue: "Missing hover states",
        suggestion:
          "Add clear interactive feedback for all clickable elements.",
      },
      {
        issue: "Complex navigation",
        suggestion:
          "Simplify to max 5 top-level items and use progressive disclosure.",
      },
    ],
  },
  "mvp-development": {
    steps: [
      {
        icon: RocketIcon,
        title: "Scope Definition",
        description:
          "Identify the core features that deliver the most value and cut everything else.",
      },
      {
        icon: CodeIcon,
        title: "Rapid Development",
        description:
          "Build fast with modern frameworks, focusing on functionality over perfection.",
      },
      {
        icon: TestTubesIcon,
        title: "Testing & Iteration",
        description:
          "Ship early, collect feedback, and iterate quickly based on real user behavior.",
      },
      {
        icon: GitBranchIcon,
        title: "Launch & Learn",
        description:
          "Deploy to production, monitor key metrics, and plan the next iteration cycle.",
      },
    ],
    issues: [
      {
        issue: "Feature creep",
        suggestion:
          "Limit to 3–5 core features. Everything else goes to the backlog.",
      },
      {
        issue: "No success metrics",
        suggestion:
          "Define KPIs before launch to measure what 'working' actually means.",
      },
      {
        issue: "Skipping user feedback",
        suggestion:
          "Set up feedback loops from day one — in-app surveys, analytics, interviews.",
      },
      {
        issue: "Over-engineering",
        suggestion:
          "Use proven tools and frameworks. Build for now, architect for later.",
      },
    ],
  },
};

const tabs = [
  { value: "ux-audit", label: "UX Audit" },
  { value: "user-segmentation", label: "User Segmentation" },
  { value: "ui-ux-design", label: "UI/UX Design & Prototyping" },
  { value: "mvp-development", label: "MVP Product Development" },
];

export function ProcessSection() {
  const [activeTab, setActiveTab] = useState("ux-audit");
  const data = tabsData[activeTab];

  return (
    <section
      id="process"
      className="snap-start min-h-[calc(100vh-3.5rem)] px-6 py-12 md:px-10 md:py-16"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="max-w-lg text-4xl font-light leading-tight tracking-tight md:text-5xl">
          A Process Rooted in
          <br />
          <span className="rounded-sm bg-amber-100 px-1 font-normal">
            Clarity &amp; Insight
          </span>
          .
        </h2>
        <Badge
          variant="outline"
          className="hidden shrink-0 rounded-none border-0 font-mono text-xs uppercase tracking-widest md:inline-flex"
        >
          [ Work Process ]
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
        <div className="flex justify-center">
          <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border border-border px-4 py-1.5 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left — process steps */}
              <div className="flex flex-col">
                {tabsData[tab.value].steps.map((step, i) => (
                  <div key={step.title}>
                    <div className="py-4">
                      <div className="mb-2 flex items-center gap-2">
                        <step.icon className="size-4 text-muted-foreground" />
                        <h3 className="text-base font-semibold">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {i < tabsData[tab.value].steps.length - 1 && (
                      <Separator className="border-dashed" />
                    )}
                  </div>
                ))}
              </div>

              {/* Right — issues & suggestions table */}
              <Card className="group gap-0 overflow-hidden border-0 bg-muted/30 p-0">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 border-b bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Issue</span>
                    <span>Suggestions</span>
                  </div>
                  {tabsData[tab.value].issues.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 gap-4 border-b px-4 py-3 last:border-b-0"
                    >
                      <p className="text-sm text-muted-foreground">
                        {row.issue}
                      </p>
                      <p className="text-sm font-medium">{row.suggestion}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
