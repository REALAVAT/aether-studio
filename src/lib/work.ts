import type { StaticImageData } from "next/image";
import mirage from "@/assets/work/mirage-eyewear.jpg";
import falcon from "@/assets/work/falcon-pay.jpg";
import sahra from "@/assets/work/sahra-hotels.jpg";
import volt from "@/assets/work/volt-ev.jpg";
import oud from "@/assets/work/oud-noir.jpg";
import d3 from "@/assets/work/d3-art-week.jpg";

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  discipline: string;
  year: string;
  location: string;
  result: string;
  image: StaticImageData;
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
    image: mirage,
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
    image: falcon,
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
    image: sahra,
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
    image: volt,
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
    image: oud,
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
    image: d3,
    alt: "Monolithic sculptures and amber light lines in a dark gallery",
  },
];
