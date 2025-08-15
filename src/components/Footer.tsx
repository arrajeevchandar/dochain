export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-indigo-300 py-6 px-6 text-center drop-shadow-lg">
      <p className="font-mono text-sm select-none">© 2025 dochain. Built with transparency on blockchain.</p>
      <div className="mt-2 space-x-6">
        <a href="/terms" className="hover:text-white transition">Terms</a>
        <a href="/privacy" className="hover:text-white transition">Privacy</a>
        <a href="/contact" className="hover:text-white transition">Contact</a>
      </div>
    </footer>
  );
}
