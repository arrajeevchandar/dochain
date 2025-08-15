import Header from "@/components/Header";
import DynamicHero from "@/components/DynamicHero";
import BlockchainStats from "@/components/BlockchainStats";
import MatrixCarousel from "@/components/MatrixCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <DynamicHero />
        <BlockchainStats />
        <MatrixCarousel />
      </main>
      <Footer />
    </>
  );
}
