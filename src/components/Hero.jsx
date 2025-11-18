import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  // Parallax orbs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const orb1X = useTransform(sx, (v) => v * 0.03);
  const orb1Y = useTransform(sy, (v) => v * 0.03);
  const orb2X = useTransform(sx, (v) => v * -0.04);
  const orb2Y = useTransform(sy, (v) => v * -0.02);

  const onMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    mx.set(x * 100);
    my.set(y * 100);
  };

  return (
    <section className="relative pt-28 pb-24 overflow-hidden" onMouseMove={onMove}>
      {/* atmospheric gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(245,213,224,0.12),rgba(33,6,53,0)_65%)]" />

      {/* floating orbs with parallax */}
      <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-[#7B337E]/25 rounded-full blur-3xl" />
      <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute -bottom-40 -left-24 w-[46rem] h-[46rem] bg-[#6667AB]/20 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.7 } },
          }}
          className="grid md:grid-cols-2 items-center gap-10"
        >
          <div>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="text-5xl sm:text-6xl font-black tracking-tight text-white">
              Moon-made Premium Tees
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-5 text-lg text-[rgba(245,213,224,0.85)] max-w-xl">
              Clean, bold, and cosmic. Elevate your everyday with ultra-soft fits inspired by the moon.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex gap-4">
              <MagneticButton as="a" href="#shop">Shop Now</MagneticButton>
              <MagneticButton as="a" href="#about" className="bg-[rgba(33,6,53,0.8)] border border-[rgba(123,51,126,0.25)]">
                Learn More
              </MagneticButton>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="aspect-square rounded-3xl border border-[rgba(123,51,126,0.25)] bg-[rgba(66,13,75,0.35)] backdrop-blur-2xl shadow-[0_12px_48px_rgba(123,51,126,0.25)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.08),rgba(255,255,255,0)_30%,rgba(123,51,126,0.12),rgba(255,255,255,0)_70%)]" />
              <img
                src="https://images.unsplash.com/photo-1724987998547-1b8d9a21418c?ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
                alt="Lunar Tee"
                className="w-full h-full object-cover mix-blend-screen opacity-90"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
