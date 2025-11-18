import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={
        "rounded-3xl border border-[rgba(123,51,126,0.25)] bg-[rgba(66,13,75,0.35)] backdrop-blur-2xl shadow-[0_12px_48px_rgba(123,51,126,0.25)] " +
        className
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
