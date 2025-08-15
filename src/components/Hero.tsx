import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white py-24 px-6 text-center">
      <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg font-mono">
        Empower Change with <span className="text-indigo-400">dochain</span>
      </h1>
      <p className="text-xl max-w-3xl mx-auto mb-12 drop-shadow-md tracking-wide">
        Transparent, decentralized donations tracked on the blockchain. Join donors and charities making a difference.
      </p>
      <div className="space-x-6">
        <Button asChild>
          <a href="/create" className="text-indigo-900 font-bold">
            Start a Campaign
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/campaigns" className="">
            View Campaigns
          </a>
        </Button>
      </div>
    </section>
  );
}
