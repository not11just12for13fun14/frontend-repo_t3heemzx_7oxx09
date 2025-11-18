import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const CATEGORIES = ['All','Street','Core','Graphic','Minimal']

export default function Shop(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('newest')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const load = async (append=false) => {
    setLoading(true)
    const params = new URLSearchParams()
    if(category && category!=='All') params.set('category', category)
    if(sort) params.set('sort', sort)
    params.set('limit','12')
    params.set('offset', String(append ? offset : 0))
    const res = await fetch(`${API_BASE}/api/products?${params.toString()}`)
    const data = await res.json()
    const list = data.products || []
    setProducts(append ? [...products, ...list] : list)
    setHasMore(list.length >= 12)
    setOffset(append ? offset + list.length : list.length)
    setLoading(false)
  }

  useEffect(()=>{ load(false) }, [category, sort])

  const onScroll = () => {
    if(!hasMore || loading) return
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 400){
      load(true)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  })

  return (
    <section className="py-10">
      <div className="sticky top-16 z-30 bg-[rgba(66,13,75,0.5)] backdrop-blur-xl border-b border-[rgba(123,51,126,0.2)]">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={()=> setCategory(c)} className={`px-4 py-2 rounded-full border ${category===c? 'bg-[#7B337E] border-transparent' : 'bg-[rgba(33,6,53,0.8)] border-[rgba(102,103,171,0.5)]'}`}>{c}</button>
            ))}
          </div>
          <select value={sort} onChange={e=> setSort(e.target.value)} className="px-4 py-2 rounded-lg bg-[rgba(33,6,53,0.8)] border border-[rgba(102,103,171,0.5)]">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map(p => (
          <article key={p.id} className="group bg-[rgba(66,13,75,0.3)] backdrop-blur-xl border border-[rgba(123,51,126,0.2)] rounded-xl overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={(p.images&&p.images[0])||''} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300"/>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-sm">${p.price.toFixed(2)}</span>
              </div>
              {p.stock_count < 10 && <div className="mt-1 text-xs text-yellow-200">Only {p.stock_count} left</div>}
            </div>
          </article>
        ))}
      </div>

      {loading && <div className="text-center py-6 text-[rgba(245,213,224,0.8)]">Loading...</div>}
      {!hasMore && <div className="text-center py-6 text-[rgba(245,213,224,0.8)]">End of list</div>}
    </section>
  )
}
