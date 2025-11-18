import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

export default function App() {
  return (
    <div className="min-h-screen bg-[#210635] text-white relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(245,213,224,0.08),rgba(33,6,53,0)_60%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-soft-light" />
      </div>

      <Nav />
      <main className="relative pt-20"> 
        <Outlet />
      </main>

      <footer className="relative border-t border-[rgba(123,51,126,0.25)] py-10 bg-[rgba(66,13,75,0.25)]/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[rgba(245,213,224,0.85)]">© {new Date().getFullYear()} The RAWKING. All rights reserved.</p>
          <div className="text-[rgba(245,213,224,0.65)]">Crafted under a moonlit sky.</div>
        </div>
      </footer>
    </div>
  )
}
