import React from "react";
import Hero from "../Hero/Hero";
import BrandStory from "../brand/Brand";
import ProductSlider from "../slider/Slider";
import FAQ from "../Faq/Faq";
import Contact from "../contact/Contact";

function Main() {
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

export default Main;
