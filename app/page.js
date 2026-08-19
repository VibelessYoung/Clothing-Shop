import Image from "next/image";
import Hero from "./components/Hero/Hero";
import BrandStory from "./components/brand/Brand";
import ProductSlider from "./components/silder/Slider";
import FAQ from "./components/Faq/Faq";
import Contact from "./components/contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <ProductSlider />
      <FAQ />
      <Contact />
    </main>
  );
}
