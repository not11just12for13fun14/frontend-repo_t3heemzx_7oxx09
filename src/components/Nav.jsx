import { Menu, ShoppingCart, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const c = cart.reduce((s, i) => s + (i.quantity || 1), 0);
        setCount(c);
      } catch {}
    };
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-xl bg-[rgba(66,13,75,0.5)] border-b border-[rgba(123,51,126,0.2)]' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="text-[rgba(245,213,224,0.95)] font-black tracking-tight text-xl">
          The RAWKING
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[rgba(245,213,224,0.8)]">
          <a href="/shop" className="hover:text-white transition">Shop</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-[rgba(245,213,224,0.9)] hover:text-white"><Search size={20}/></button>
          <a href="/cart" className="relative text-[rgba(245,213,224,0.9)] hover:text-white">
            <ShoppingCart />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-[#7B337E] text-white w-5 h-5 grid place-items-center rounded-full">{count}</span>
            )}
          </a>
          <button className="md:hidden text-white"><Menu /></button>
        </div>
      </div>
    </header>
  )
}
