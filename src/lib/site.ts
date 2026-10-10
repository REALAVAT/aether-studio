function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://studio.ahmadkhajeh.com";
}

export const site = {
  name: "Aether Studio",
  shortName: "Aether",
  url: resolveSiteUrl(),
  title: "Aether Studio — Brand, product & digital craft from Dubai",
  description:
    "Aether Studio is an independent creative and product studio in Dubai Design District. We build brands, products, websites and motion for founders across the Gulf and the world.",
  email: "hello@aether.studio",
  phone: "+971 4 000 0000",
  address: {
    street: "Building 7, Dubai Design District (d3)",
    locality: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
  },
  credit: {
    label: "Demo project by Ahmad Khajeh — ahmadkhajeh.com",
    href: "https://ahmadkhajeh.com",
  },
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
] as const;

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  discipline: string;
  year: string;
  location: string;
  result: string;
  image: string;
  alt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mirage-eyewear",
    client: "Mirage Optics",
    title: "Eyewear cast in desert light",
    discipline: "Brand · Product launch",
    year: "2026",
    location: "Dubai · Milan",
    result: "Sold out first drop in 41 hours",
    image: "/work/work-mirage-eyewear.jpg",
    alt: "Titanium sunglasses resting on a rippled sand dune at golden hour",
  },
  {
    slug: "falcon-pay",
    client: "Falcon Pay",
    title: "A calmer way to move money",
    discipline: "Product · App design",
    year: "2026",
    location: "DIFC, Dubai",
    result: "4.8★ rating, 310k users in year one",
    image: "/work/work-falcon-pay.jpg",
    alt: "Dark smartphone showing an amber banking interface on black stone",
  },
  {
    slug: "sahra-hotels",
    client: "Sahra Hotels",
    title: "Hospitality that starts online",
    discipline: "Web · Booking platform",
    year: "2025",
    location: "Ras Al Khaimah",
    result: "+62% direct bookings",
    image: "/work/work-sahra-hotels.jpg",
    alt: "Minimal stone desert hotel with a reflecting pool at dusk",
  },
  {
    slug: "volt-ev",
    client: "Volt Motors",
    title: "Launching a coupe in a single line",
    discipline: "Motion · Launch film",
    year: "2025",
    location: "Dubai · Munich",
    result: "12M views across launch week",
    image: "/work/work-volt-ev.jpg",
    alt: "Graphite electric coupe traced by a single amber light line",
  },
  {
    slug: "oud-noir",
    client: "Maison Oud Noir",
    title: "Scent, rendered as smoke",
    discipline: "Brand · CGI campaign",
    year: "2025",
    location: "Riyadh · Paris",
    result: "Gulf-wide launch in 38 stores",
    image: "/work/work-oud-noir.jpg",
    alt: "Faceted amber perfume bottle surrounded by golden smoke",
  },
  {
    slug: "d3-art-week",
    client: "d3 Art Week",
    title: "An identity built from light",
    discipline: "Identity · Wayfinding",
    year: "2024",
    location: "Dubai Design District",
    result: "48k visitors over five nights",
    image: "/work/work-d3-art-week.jpg",
    alt: "Monolithic sculptures and amber light lines in a dark gallery",
  },
];

export const services = [
  {
    id: "brand",
    title: "Brand",
    summary:
      "Identity systems with a point of view — strategy, naming, typography and the rules that keep it all coherent at scale.",
    deliverables: ["Strategy & positioning", "Naming", "Visual identity", "Brand guidelines"],
    from: { aed: "45,000", usd: "12,250" },
  },
  {
    id: "product",
    title: "Product",
    summary:
      "Apps and platforms designed around real behaviour, from first prototype to the design system your engineers love.",
    deliverables: ["UX research", "Product design", "Design systems", "Prototyping"],
    from: { aed: "90,000", usd: "24,500" },
  },
  {
    id: "web",
    title: "Web",
    summary:
      "Fast, accessible, unmistakably crafted websites — engineered in-house with Next.js and real-time 3D where it earns its place.",
    deliverables: ["Art direction", "Next.js engineering", "WebGL & 3D", "CMS & localisation"],
    from: { aed: "70,000", usd: "19,000" },
  },
  {
    id: "motion",
    title: "Motion",
    summary:
      "Launch films, product CGI and interface motion that give a brand its rhythm — on screens, stages and façades.",
    deliverables: ["Launch films", "Product CGI", "UI motion", "Spatial content"],
    from: { aed: "35,000", usd: "9,500" },
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    body: "Two weeks in your world. Stakeholder sessions, market and user research, and an honest audit of where you stand.",
    duration: "1–2 weeks",
  },
  {
    step: "02",
    title: "Design",
    body: "Directions, then one direction. We prototype early, test with real people and refine until it feels inevitable.",
    duration: "3–6 weeks",
  },
  {
    step: "03",
    title: "Build",
    body: "Designers and engineers in one room in d3. Production-grade code, motion and 3D — reviewed weekly, shipped continuously.",
    duration: "4–10 weeks",
  },
  {
    step: "04",
    title: "Launch",
    body: "Launch day, then the weeks after. We measure, tune and hand over a system your team can own and grow.",
    duration: "Ongoing",
  },
] as const;

export const budgets = [
  { value: "35-70", label: "AED 35k–70k (USD 9.5k–19k)" },
  { value: "70-150", label: "AED 70k–150k (USD 19k–41k)" },
  { value: "150-350", label: "AED 150k–350k (USD 41k–95k)" },
  { value: "350+", label: "AED 350k+ (USD 95k+)" },
] as const;
