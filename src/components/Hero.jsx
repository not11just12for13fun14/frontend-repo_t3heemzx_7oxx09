import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_10%,rgba(99,102,241,0.25),rgba(2,6,23,0)_70%)]" />
      <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[40rem] h-[40rem] bg-sky-400/10 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              Moon-made Premium Tees
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-xl">
              Clean, bold, and cosmic. Elevate your everyday with ultra-soft fits inspired by the moon.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#shop" className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition">Shop Now</a>
              <a href="#about" className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition">Learn More</a>
            </div>
          </div>
          <div className="relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/20 via-slate-800 to-slate-900 border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0)_30%,rgba(99,102,241,0.1),rgba(255,255,255,0)_70%)]" />
              <img src="https://images.unsplash.com/photo-1724987998547-1b8d9a21418c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMdW5hciUyMFRlZXxlbnwwfDB8fHwxNzYzNTAzNzU4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Lunar Tee" className="w-full h-full object-cover mix-blend-screen opacity-90"/>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
