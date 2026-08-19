import Image from "next/image";
import Hero from "./components/Hero/Hero";
import BrandStory from "./components/brand/Brand";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandStory />
    </main>
  );
}
