import Image from "next/image";
import Hero from "./components/Hero/Hero";
import BrandStory from "./components/brand/Brand";
import ProductSlider from "./components/silder/Slider";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <ProductSlider />
    </main>
  );
}
