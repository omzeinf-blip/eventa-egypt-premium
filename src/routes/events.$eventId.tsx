import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Check, Clock, MapPin, User } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getEvent } from "@/data/events";

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "الإيفنت غير موجود — EVENTA" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    const title = `${event.title} — تذاكر على EVENTA`;
    return {
      meta: [
        { title },
        { name: "description", content: `${event.title} — ${event.date} في ${event.location}. احجز تذكرتك الآن.` },
        { property: "og:title", content: title },
        { property: "og:description", content: event.description.slice(0, 150) },
      ],
    };
  },
  component: EventDetails,
});

function EventDetails() {
  const { event } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[42vh] min-h-72 overflow-hidden sm:h-[55vh]">
        <img
          src={event.image}
          alt={event.title}
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.13_0.015_285/0.4),oklch(0.13_0.015_285/0.98))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
            {event.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">{event.title}</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div className="space-y-8">
          <div className="surface-card grid gap-5 p-6 sm:grid-cols-2">
            {[
              { icon: CalendarDays, label: "التاريخ", value: event.date },
              { icon: Clock, label: "الوقت", value: event.time },
              { icon: MapPin, label: "المكان", value: `${event.location}، ${event.city}` },
              { icon: User, label: "المنظم", value: event.organizer },
            ].map((row) => (
              <div key={row.label} className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15">
                  <row.icon className="h-5 w-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="truncate font-bold">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="surface-card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold">عن الإيفنت</h2>
            <p className="mt-4 leading-9 text-muted-foreground">{event.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["دخول بتذكرة إلكترونية", "مواقف سيارات متاحة", "مناطق مأكولات ومشروبات", "أمن وتنظيم على مدار الحدث"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-xl font-extrabold">أنواع التذاكر</h2>
          {event.tickets.map((t) => (
            <div
              key={t.id}
              className="surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="truncate text-lg font-extrabold">{t.name}</h3>
                <p className="shrink-0 text-lg font-extrabold gradient-text">
                  {t.price.toLocaleString("en-US")} EGP
                </p>
              </div>
              <ul className="mt-3 space-y-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/checkout"
                search={{ event: event.id, ticket: t.id }}
                className="btn-hero mt-5 w-full"
              >
                احجز الآن
              </Link>
            </div>
          ))}
        </aside>
      </section>

      <Footer />
    </div>
  );
}
