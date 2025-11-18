import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?featured=true`);
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

  if (loading) return <p className="text-[rgba(245,213,224,0.8)]">Loading products...</p>;
  if (error) return <p className="text-red-300">{error}</p>;

  return (
    <section id="shop" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Featured</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <a key={p.id} href={`/product/${p.id}`} className="group rounded-2xl overflow-hidden border border-[rgba(123,51,126,0.2)] bg-[rgba(66,13,75,0.3)] backdrop-blur-xl hover:bg-[rgba(66,13,75,0.4)] hover:border-[rgba(123,51,126,0.4)] transition hover:shadow-[0_12px_48px_rgba(123,51,126,0.4)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={(p.images && p.images[0]) || ""} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  {p.tag && <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">{p.tag}</span>}
                </div>
                <p className="mt-2 text-[rgba(245,213,224,0.8)] text-sm line-clamp-2">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white font-bold">${p.price.toFixed(2)}</span>
                  <span className="px-4 py-2 rounded-full bg-[#7B337E] text-white font-semibold">View</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
