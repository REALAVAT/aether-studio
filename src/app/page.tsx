import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Manifesto />
        <Work />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
