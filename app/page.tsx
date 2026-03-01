import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Tool from "@/components/landing/tools";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tool />
      <Features />
      <Footer />
    </>
  );
}
