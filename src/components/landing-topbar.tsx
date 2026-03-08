import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { PhoneCallIcon, MailIcon } from "lucide-react"

export function LandingTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <img
          src="https://picsum.photos/seed/ilzam/200/200"
          alt="Ilzam - Software Engineer"
          width={32}
          height={32}
          className="size-8 rounded-full object-cover"
          loading="eager"
        />
        <div>
          <h1 className="text-sm font-semibold leading-tight">
            Hello, Ilzam's here!
          </h1>
          <p className="text-xs text-muted-foreground">
            Software Engineer
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="default" render={<a href="mailto:ilzammulkhaq85@gmail.com" />}>
          <MailIcon data-icon="inline-start" />
          Mail Me
        </Button>
        <Button size="default" render={<a href="https://cal.com/ilzam/intro" target="_blank" rel="noopener noreferrer" />}>
          <PhoneCallIcon data-icon="inline-start" />
          Call with Me
        </Button>
      </div>
    </header>
  )
}
