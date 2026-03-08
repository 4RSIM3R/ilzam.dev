import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { PhoneCallIcon, MailIcon } from "lucide-react"

export function LandingTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden" />
        <img
          src="/profile.jpeg"
          alt="Ilzam - Software Engineer"
          width={32}
          height={32}
          className="size-8 rounded-full object-cover"
          loading="eager"
        />
        <div>
          <h1 className="text-sm font-semibold leading-tight">
            Ilzam
          </h1>
          <p className="text-xs text-muted-foreground">
            Fractional CTO
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="md:hidden" render={<a href="mailto:ilzammulkhaq85@gmail.com" />}>
          <MailIcon />
        </Button>
        <Button size="icon" className="md:hidden" render={<a href="https://cal.com/ilzam/intro" target="_blank" rel="noopener noreferrer" />}>
          <PhoneCallIcon />
        </Button>
        <Button variant="outline" size="default" className="hidden md:inline-flex" render={<a href="mailto:ilzammulkhaq85@gmail.com" />}>
          <MailIcon data-icon="inline-start" />
          Get in Touch
        </Button>
        <Button size="default" className="hidden md:inline-flex" render={<a href="https://cal.com/ilzam/intro" target="_blank" rel="noopener noreferrer" />}>
          <PhoneCallIcon data-icon="inline-start" />
          Book a Call
        </Button>
      </div>
    </header>
  )
}
