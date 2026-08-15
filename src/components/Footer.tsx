import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone, MapPin, Ticket, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-black text-primary-foreground">
              E
            </span>
            <span className="text-xl font-extrabold">EVENTA</span>
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            منصة مصرية لحجز تذاكر الحفلات والفعاليات بسهولة وأمان.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-border transition-colors hover:border-primary hover:bg-primary/10"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-bold">روابط سريعة</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              { label: "الرئيسية", hash: "" },
              { label: "الإيفنتات", hash: "events" },
              { label: "عن المنصة", hash: "about" },
              { label: "تواصل معنا", hash: "contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link to="/" {...(l.hash ? { hash: l.hash } : {})} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">الأقسام</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["حفلات", "مؤتمرات", "كوميدي", "رياضة", "بزنس"].map((c) => (
              <li key={c} className="transition-colors hover:text-foreground">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" /> hello@eventa.eg
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" /> 0100 123 4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" /> القاهرة الجديدة، مصر
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 EVENTA. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
