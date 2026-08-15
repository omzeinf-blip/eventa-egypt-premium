import music from "@/assets/event-music.jpg";
import tech from "@/assets/event-tech.jpg";
import comedy from "@/assets/event-comedy.jpg";
import business from "@/assets/event-business.jpg";
import edm from "@/assets/event-edm.jpg";
import startup from "@/assets/event-startup.jpg";

export type Ticket = {
  id: string;
  name: string;
  price: number;
  perks: string[];
};

export type EventItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: number;
  image: string;
  organizer: string;
  description: string;
  tickets: Ticket[];
};

const defaultTickets: Ticket[] = [
  {
    id: "vip",
    name: "VIP",
    price: 1500,
    perks: ["دخول مبكر", "منطقة VIP أمام المسرح", "مشروبات مجانية"],
  },
  {
    id: "regular",
    name: "Regular",
    price: 750,
    perks: ["دخول عادي", "مكان بالمنطقة الرئيسية"],
  },
  {
    id: "early",
    name: "Early Bird",
    price: 500,
    perks: ["عدد محدود", "أفضل سعر متاح"],
  },
];

export const events: EventItem[] = [
  {
    id: "cairo-music-festival",
    title: "Cairo Music Festival",
    category: "حفلات",
    date: "12 سبتمبر 2026",
    time: "8:00 مساءً",
    location: "الحديقة الدولية",
    city: "القاهرة الجديدة",
    price: 500,
    image: music,
    organizer: "Eventa Live",
    description:
      "أكبر مهرجان موسيقي في مصر يجمع نخبة من الفنانين العرب على مسرح واحد، مع إضاءة وصوت بمعايير عالمية وتجربة حضور لا تُنسى تمتد لأكثر من خمس ساعات من العروض الحية.",
    tickets: defaultTickets,
  },
  {
    id: "tech-summit-egypt",
    title: "Tech Summit Egypt",
    category: "تكنولوجيا",
    date: "3 أكتوبر 2026",
    time: "10:00 صباحاً",
    location: "مركز مصر للمؤتمرات",
    city: "القاهرة",
    price: 500,
    image: tech,
    organizer: "Egypt Tech Council",
    description:
      "قمة تقنية تجمع المهندسين ورواد الأعمال وشركات التكنولوجيا لمناقشة الذكاء الاصطناعي والبنية السحابية ومستقبل المنتجات الرقمية في المنطقة، مع ورش عملية ومساحات للتواصل.",
    tickets: defaultTickets,
  },
  {
    id: "cairo-comedy-night",
    title: "Cairo Comedy Night",
    category: "كوميدي",
    date: "18 سبتمبر 2026",
    time: "9:30 مساءً",
    location: "مسرح النخبة",
    city: "الزمالك",
    price: 500,
    image: comedy,
    organizer: "Laugh Factory Cairo",
    description:
      "ليلة ستاند أب كوميدي مع ألمع نجوم الكوميديا المصرية، عروض حية قصيرة ومتنوعة في أجواء حميمية وقريبة من الجمهور.",
    tickets: defaultTickets,
  },
  {
    id: "business-leaders-meetup",
    title: "Business Leaders Meetup",
    category: "بزنس",
    date: "25 سبتمبر 2026",
    time: "6:00 مساءً",
    location: "فندق نايل ريتز",
    city: "وسط البلد",
    price: 500,
    image: business,
    organizer: "Cairo Business Club",
    description:
      "لقاء مغلق لقادة الأعمال والمستثمرين يناقش استراتيجيات النمو والتوسع الإقليمي، مع جلسات نقاشية وفرص تواصل مباشرة مع صنّاع القرار.",
    tickets: defaultTickets,
  },
  {
    id: "edm-night",
    title: "EDM Night",
    category: "حفلات",
    date: "2 أكتوبر 2026",
    time: "10:00 مساءً",
    location: "الساحل الشمالي - مارينا",
    city: "الساحل",
    price: 500,
    image: edm,
    organizer: "Pulse Events",
    description:
      "ليلة إلكترونية مع أشهر الـ DJs، إضاءة ليزر وأنظمة صوت ضخمة في واحدة من أقوى الحفلات الراقصة هذا الموسم.",
    tickets: defaultTickets,
  },
  {
    id: "startup-networking-night",
    title: "Startup Networking Night",
    category: "بزنس",
    date: "9 أكتوبر 2026",
    time: "7:00 مساءً",
    location: "GrEEK Campus",
    city: "الدقي",
    price: 500,
    image: startup,
    organizer: "Founders Hub",
    description:
      "مساحة مفتوحة للمؤسسين والمستثمرين وطلاب ريادة الأعمال لتبادل الأفكار وعرض المشاريع في جلسات Pitch سريعة وودّية.",
    tickets: defaultTickets,
  },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);

export const categories = [
  { name: "حفلات", icon: "🎤", count: 24 },
  { name: "مؤتمرات", icon: "🎯", count: 12 },
  { name: "كوميدي", icon: "😂", count: 9 },
  { name: "رياضة", icon: "⚽", count: 15 },
  { name: "بزنس", icon: "💼", count: 18 },
  { name: "تكنولوجيا", icon: "💡", count: 21 },
];
