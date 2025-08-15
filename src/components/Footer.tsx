// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#101828] text-cyan-400 py-9 px-6 text-center mt-10 border-t-2 border-cyan-400 font-mono">
      <p className="text-lg uppercase tracking-widest">© 2025 DOCHAIN • On-Chain for Good</p>
      <div className="mt-2 space-x-6">
        <a href="/terms" className="hover:text-yellow-400 transition">Terms</a>
        <a href="/privacy" className="hover:text-yellow-400 transition">Privacy</a>
        <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
      </div>
    </footer>
  );
}
