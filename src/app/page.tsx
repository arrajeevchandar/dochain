import Header from "@/components/Header";
import BlockchainStats from "@/components/BlockchainStats";
import ExplodingCarousel from "@/components/ExplodingCarousel";
import Footer from "@/components/Footer";
import DynamicHero from "@/components/DynamicHero";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <DynamicHero />
        <BlockchainStats />
        <ExplodingCarousel />
      </main>
      <Footer />
    </>
  );
}
