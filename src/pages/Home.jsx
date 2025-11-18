import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'

const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.08 } },
}

export default function Home() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}>
      <Hero />
      <ProductGrid />
    </motion.div>
  )
}
