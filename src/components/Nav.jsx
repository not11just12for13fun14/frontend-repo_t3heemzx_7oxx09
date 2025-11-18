import { Menu } from "lucide-react";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="text-white font-black tracking-tight text-xl">
          TheRawKing
        </a>
        <nav className="hidden md:flex items-center gap-8 text-slate-200">
          <a href="#shop" className="hover:text-white transition">Shop</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <button className="md:hidden text-white"><Menu /></button>
      </div>
    </header>
  )
}
