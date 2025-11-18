import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import MagneticButton from '../components/MagneticButton'
import GlassCard from '../components/GlassCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [size, setSize] = useState('M')
  const { add } = useCart()

  useEffect(()=>{
    fetch(`${API_BASE}/api/products/${id}`).then(r=> r.json()).then(setP)
  }, [id])

  if(!p) return <div className="min-h-[50vh] flex items-center justify-center text-[rgba(245,213,224,0.8)]">Loading...</div>

  const addToCart = () => {
    add({ product_id: p.id, name: p.title, price: p.price, size, quantity: 1, image: (p.images&&p.images[0])||'' })
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8">
        <GlassCard>
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img src={(p.images&&p.images[0])||''} alt={p.title} className="w-full h-full object-cover"/>
          </div>
        </GlassCard>
        <div>
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-3xl font-bold">{p.title}</motion.h1>
          <div className="mt-2 text-[rgba(245,213,224,0.85)]">${p.price.toFixed(2)}</div>
          <p className="mt-4 text-[rgba(245,213,224,0.85)]">{p.description}</p>

          <div className="mt-6">
            <div className="text-sm mb-2">Size</div>
            <div className="flex gap-2">
              {['S','M','L','XL'].map(s => (
                <button key={s} onClick={()=> setSize(s)} className={`px-3 py-2 rounded-full border ${size===s? 'bg-[#7B337E] border-transparent' : 'bg-[rgba(33,6,53,0.8)] border-[rgba(102,103,171,0.5)]'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <MagneticButton onClick={addToCart}>Add to Cart</MagneticButton>
            <MagneticButton as="a" href={`/cart`} className="bg-[rgba(33,6,53,0.8)] border border-[rgba(123,51,126,0.25)]">Buy Now</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
