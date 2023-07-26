import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  );
}

export default home;
