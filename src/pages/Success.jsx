import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Success() {
  const [params] = useSearchParams()
  const session_id = params.get('session_id')

  useEffect(() => {
    if (!session_id) return
    fetch(`${API_BASE}/api/order/by-session/${session_id}`).catch(() => {})
  }, [session_id])

  return (
    <section className="min-h-[60vh] py-20 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-black">Thank you!</h1>
        <p className="mt-4 text-[rgba(245,213,224,0.85)]">Your order has been received. A confirmation will arrive shortly.</p>
        <Link to="/shop" className="inline-block mt-8 px-8 py-3 bg-[#7B337E] rounded-2xl font-semibold hover:shadow-[0_8px_30px_rgba(123,51,126,0.5)] transition-all">Continue Shopping</Link>
      </div>
    </section>
  )
}
