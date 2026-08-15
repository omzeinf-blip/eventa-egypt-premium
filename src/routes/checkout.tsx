import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Lock, Minus, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { events, getEvent } from "@/data/events";

type CheckoutSearch = { event?: string | undefined; ticket?: string | undefined };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    event: typeof search["event"] === "string" ? search["event"] : undefined,
    ticket: typeof search["ticket"] === "string" ? search["ticket"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "إتمام الحجز — EVENTA" },
      { name: "description", content: "أكمل بيانات الحجز واختر عدد التذاكر لإتمام عملية الشراء." },
      { property: "og:title", content: "إتمام الحجز — EVENTA" },
      { property: "og:description", content: "أكمل بيانات الحجز واختر عدد التذاكر." },
      { property: "og:image", content: "/logo.png" },
      { name: "twitter:image", content: "/logo.png" },
    ],

  }),
  component: Checkout,
});

const field =
  "w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Checkout() {
  const search = Route.useSearch();
  const event = getEvent(search.event ?? "") ?? events[0]!;
  const [ticketId, setTicketId] = useState(search.ticket ?? event.tickets[0]!.id);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);

  const ticket = event.tickets.find((t) => t.id === ticketId) ?? event.tickets[0]!;
  const subtotal = ticket.price * qty;
  const fees = Math.round(subtotal * 0.05);
  const total = subtotal + fees;
  const fmt = (n: number) => `${n.toLocaleString("en-US")} EGP`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">إتمام الحجز</h1>
        <p className="mt-3 text-muted-foreground">
          راجع بيانات الحجز الخاصة بـ <span className="font-bold text-foreground">{event.title}</span>
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="space-y-8"
          >
            <div className="surface-card space-y-4 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold">بيانات الحاجز</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">الاسم بالكامل</label>
                  <input required placeholder="اكتب اسمك" className={field} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">رقم الهاتف</label>
                  <input required placeholder="01xxxxxxxxx" className={field} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-bold">البريد الإلكتروني</label>
                  <input required type="email" placeholder="name@email.com" className={field} />
                </div>
              </div>
            </div>

            <div className="surface-card space-y-4 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold">التذكرة المختارة</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {event.tickets.map((t) => {
                  const active = t.id === ticket.id;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTicketId(t.id)}
                      className={`rounded-2xl border p-4 text-right transition-all duration-300 hover:-translate-y-0.5 ${
                        active
                          ? "border-primary bg-primary/10 glow-ring"
                          : "border-border bg-background/40"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-bold">{t.name}</span>
                        {active && <Check className="h-4 w-4 shrink-0 text-primary" />}
                      </span>
                      <span dir="ltr" className="mt-1 block text-right text-sm text-muted-foreground">
                        {fmt(t.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-sm font-bold">عدد التذاكر</span>
                <div className="flex items-center gap-3 rounded-full border border-border p-1">
                  <button
                    type="button"
                    aria-label="زيادة"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-extrabold">{qty}</span>
                  <button
                    type="button"
                    aria-label="إنقاص"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-hero w-full lg:hidden">
              <Lock className="h-4 w-4" />
              الدفع الآن
            </button>
            {done && (
              <p className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-center text-sm font-bold lg:hidden">
                تم تأكيد الحجز مبدئياً — هذا نموذج تجريبي بدون دفع حقيقي.
              </p>
            )}

            <div className="hidden lg:block">
              {done && (
                <p className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-center text-sm font-bold">
                  تم تأكيد الحجز مبدئياً — هذا نموذج تجريبي بدون دفع حقيقي.
                </p>
              )}
            </div>
          </form>

          <aside className="surface-card h-fit p-6 lg:sticky lg:top-24 sm:p-8">
            <h2 className="text-xl font-extrabold">ملخص الطلب</h2>
            <div className="mt-5 flex gap-3">
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-20 w-24 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-bold">{event.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{event.date}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">نوع التذكرة</dt>
                <dd className="font-bold">{ticket.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">الكمية</dt>
                <dd className="font-bold">{qty}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">الإجمالي الفرعي</dt>
                <dd dir="ltr" className="font-bold">{fmt(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">رسوم الخدمة</dt>
                <dd dir="ltr" className="font-bold">{fmt(fees)}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="font-bold">الإجمالي</span>
              <span dir="ltr" className="text-2xl font-extrabold gradient-text">{fmt(total)}</span>
            </div>

            <button
              type="button"
              onClick={() => setDone(true)}
              className="btn-hero mt-6 hidden w-full lg:inline-flex"
            >
              <Lock className="h-4 w-4" />
              الدفع الآن
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              نموذج تجريبي — لا تتم أي عملية دفع فعلية.
            </p>
            <Link to="/" hash="events" className="btn-ghost mt-4 w-full !py-2 text-sm">
              العودة للإيفنتات
            </Link>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
