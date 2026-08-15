import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/data/events";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      to="/events/$eventId"
      params={{ eventId: event.id }}
      className="surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-full bg-background/70 px-3 py-1 text-xs font-bold backdrop-blur">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-extrabold tracking-tight">{event.title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            {event.date} — {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            {event.location}، {event.city}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">يبدأ من</p>
            <p dir="ltr" className="truncate text-lg font-extrabold gradient-text">
              {event.price.toLocaleString("en-US")} EGP
            </p>
          </div>
          <span className="btn-hero !px-5 !py-2 text-sm">احجز الآن</span>
        </div>
      </div>
    </Link>
  );
}
