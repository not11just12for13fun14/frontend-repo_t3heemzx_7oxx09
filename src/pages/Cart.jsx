import { useCart } from '../context/CartContext'

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function Cart() {
  const { cart, remove, updateQty, total, clear } = useCart();

  const checkout = async () => {
    try {
      const items = cart.map((c) => ({ product_id: c.product_id, quantity: c.quantity, size: c.size }));
      const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('Checkout failed');
    }
  };

  return (
    <section className="min-h-[60vh] py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-[rgba(245,213,224,0.85)]">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-[rgba(66,13,75,0.3)] backdrop-blur-xl border border-[rgba(123,51,126,0.2)] rounded-xl p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg"/>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button onClick={() => remove(idx)} className="text-sm text-red-300 hover:text-red-200">Remove</button>
                    </div>
                    <div className="text-sm text-[rgba(245,213,224,0.8)]">Size: {item.size || '—'}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(idx, Math.max(1, (item.quantity||1)-1))} className="px-2 py-1 rounded-lg bg-[rgba(33,6,53,0.8)] border border-[rgba(102,103,171,0.5)]">-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQty(idx, (item.quantity||1)+1)} className="px-2 py-1 rounded-lg bg-[rgba(33,6,53,0.8)] border border-[rgba(102,103,171,0.5)]">+</button>
                    </div>
                  </div>
                  <div className="font-semibold">${(item.price * (item.quantity||1)).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <aside className="bg-[rgba(66,13,75,0.3)] backdrop-blur-xl border border-[rgba(123,51,126,0.2)] rounded-xl p-6 h-max">
              <div className="flex items-center justify-between text-sm text-[rgba(245,213,224,0.8)]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-4 text-sm text-[rgba(245,213,224,0.8)]">${(Math.max(0, 100-total)).toFixed(2)} more for free shipping</div>
              <button onClick={checkout} className="w-full mt-6 px-6 py-3 bg-[#7B337E] rounded-2xl font-semibold hover:shadow-[0_8px_30px_rgba(123,51,126,0.5)] transition-all">Proceed to Checkout</button>
              <button onClick={clear} className="w-full mt-3 px-6 py-3 bg-[rgba(33,6,53,0.8)] rounded-2xl font-semibold border border-[rgba(123,51,126,0.2)]">Clear Cart</button>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
