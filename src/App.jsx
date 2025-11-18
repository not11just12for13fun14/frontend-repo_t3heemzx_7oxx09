import Nav from './components/Nav'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_-10%,rgba(99,102,241,0.15),rgba(2,6,23,0)_60%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

      <Nav />
      <main className="relative">
        <Hero />
        <ProductGrid />
      </main>

      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">© {new Date().getFullYear()} TheRawKing. All rights reserved.</p>
          <div className="text-slate-400">Crafted under a moonlit sky.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
