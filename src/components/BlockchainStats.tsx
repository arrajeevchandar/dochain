"use client";
import { motion } from "framer-motion";

export default function BlockchainStats() {
  const stats = [
    { label: "Total Donated", value: "$4,392,520" },
    { label: "Active Campaigns", value: "134" },
    { label: "Donors", value: "12,405" },
    { label: "On-chain Transactions", value: "38,292" }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-900 to-indigo-800 text-yellow-400 flex flex-wrap justify-center items-center gap-14">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
          viewport={{ once: true }}
          className="min-w-[220px] bg-black/30 rounded-xl shadow-lg p-8 text-center font-mono border border-yellow-400"
        >
          <div className="text-4xl font-bold mb-3">{stat.value}</div>
          <div className="text-base font-semibold text-yellow-200">{stat.label}</div>
        </motion.div>
      ))}
    </section>
  );
}
