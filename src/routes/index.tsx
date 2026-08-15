import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { categories, events } from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVENTA — احجز تذاكر أقوى الإيفنتات في مصر" },
      {
        name: "description",
        content:
          "منصة EVENTA لحجز تذاكر الحفلات والمؤتمرات والفعاليات في مصر بسهولة وأمان وبطرق دفع متعددة.",
      },
      { property: "og:title", content: "EVENTA — احجز تذاكر أقوى الإيفنتات في مصر" },
      {
        property: "og:description",
        content: "اكتشف أفضل الحفلات والفعاليات واحجز تذكرتك بسهولة وأمان.",
      },
      { property: "og:image", content: "/logo.png" },
      { name: "twitter:image", content: "/logo.png" },
    ],

  }),
  component: Index,
});

const benefits = [
  { icon: Zap, title: "حجز سريع وسهل", desc: "احجز تذكرتك في أقل من دقيقة بخطوات بسيطة وواضحة." },
  { icon: ShieldCheck, title: "تذاكر آمنة", desc: "تذاكر إلكترونية مؤمّنة بكود QR فريد لكل حضور." },
  { icon: CreditCard, title: "طرق دفع متعددة", desc: "بطاقات بنكية، محافظ إلكترونية، والدفع عند الاستلام." },
  { icon: Headphones, title: "دعم العملاء", desc: "فريق دعم متاح طوال أيام الأسبوع للرد على استفساراتك." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="حفل موسيقي بإضاءة بنفسجية"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.13_0.015_285/0.6),oklch(0.13_0.015_285/0.95))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1.5 text-xs font-bold backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            أكثر من 120 إيفنت هذا الموسم
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.25] font-extrabold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2]">
            احجز مكانك في <span className="gradient-text">أقوى الإيفنتات</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            اكتشف أفضل الحفلات والفعاليات واحجز تذكرتك بسهولة وأمان.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/" hash="events" className="btn-hero">
              استكشف الإيفنتات
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link to="/" hash="about" className="btn-ghost">
              اعرف المزيد
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ["120+", "إيفنت"],
              ["85 ألف", "تذكرة مباعة"],
              ["4.9/5", "تقييم العملاء"],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="text-2xl font-extrabold sm:text-3xl">{v}</dt>
                <dd className="text-sm text-muted-foreground">{k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">الإيفنتات القادمة</h2>
            <p className="mt-3 text-muted-foreground">أحدث الفعاليات المتاحة للحجز الآن</p>
          </div>
          <span className="hidden text-sm font-bold text-primary sm:inline">عرض الكل</span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border/60 bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">تصفح حسب الفئة</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <div
                key={c.name}
                className="surface-card group cursor-pointer p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  {c.icon}
                </div>
                <p className="mt-3 font-bold">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.count} إيفنت</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">ليه تختار EVENTA؟</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          منصة مبنية لتجربة حجز سلسة من أول اختيار الإيفنت لحد دخولك بالتذكرة.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15">
                <b.icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="surface-card relative mx-auto max-w-7xl overflow-hidden p-10 text-center sm:p-16">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              جاهز تحضر الإيفنت الجاي؟
            </h2>
            <p className="mt-4 text-muted-foreground">
              اختار الإيفنت اللي يناسبك واحجز تذكرتك في دقائق.
            </p>
            <Link to="/" hash="events" className="btn-hero mt-8">
              استكشف الإيفنتات
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
