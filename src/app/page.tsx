import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Carousel />
        {/* Optional additional content here */}
      </main>
      <Footer />
    </>
  );
}
