
// components/DynamicHero.tsx

"use client";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function DynamicHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
      {/* Animated Crypto Circles */}
      <motion.div
        className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-cyan-400 blur-3xl opacity-20 -z-10"
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-0 bottom-0 w-[480px] h-[480px] rounded-full bg-yellow-400 blur-2xl opacity-10 -z-10"
        initial={{ scale: 0.7 }}
        animate={{ scale: [0.8, 1, 0.8] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      {/* Center Card */}
      <div className="relative z-20 text-center px-8 py-20 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl border-4 border-cyan-400">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1 }}
          className="text-7xl font-extrabold text-cyan-400 mb-8 leading-tight font-mono drop-shadow-lg uppercase"
        >
          dochain
        </motion.h1>
        <div className="text-2xl font-mono text-yellow-300 mb-12 max-w-2xl drop-shadow-xl uppercase tracking-widest">
          <Typewriter
            options={{
              strings: [
                "Crypto. Transparency. Power.",
                "The blockchain way to donate.",
                "Tech for Good — On-Chain."
              ],
              autoStart: true,
              loop: true,
              delay: 38,
            }}
          />
        </div>
        <motion.a
          whileHover={{ scale: 1.1, boxShadow: "0 4px 32px #38bdf8" }}
          href="/create"
          className="bg-cyan-400 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-2xl border-cyan-400 border-2 transition uppercase"
        >
          Start a Campaign
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.07, boxShadow: "0 4px 32px #FFD600" }}
          href="/campaigns"
          className="ml-4 bg-yellow-400 text-[#101828] font-bold text-lg px-8 py-4 rounded-xl shadow-2xl border-yellow-400 border-2 transition uppercase"
        >
          View Campaigns
        </motion.a>
      </div>
    </section>
  );
}
