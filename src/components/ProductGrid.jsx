import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (e) {
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const buy = async (p) => {
    try {
      const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "",
          items: [{ product_id: p.id, quantity: 1 }],
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert("Checkout failed");
    }
  };

  if (loading) return <p className="text-slate-300">Loading products...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <section id="shop" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Featured</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={(p.images && p.images[0]) || ""} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  {p.tag && <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">{p.tag}</span>}
                </div>
                <p className="mt-2 text-slate-300 text-sm line-clamp-2">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white font-bold">${p.price.toFixed(2)}</span>
                  <button onClick={() => buy(p)} className="px-4 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition">Buy now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
