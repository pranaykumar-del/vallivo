import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 550)
    }, 1700)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream cream-veil"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.img
            src="/images/logo-seal.jpg"
            alt=""
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full float-soft shadow-[0_16px_48px_rgba(28,46,36,0.1)] mb-8"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.p
            className="font-display text-3xl tracking-[0.24em] text-forest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            VALLIVO
          </motion.p>
          <motion.p
            className="label-rule mt-4 text-[9px] tracking-[0.32em] uppercase text-forest/40 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Lifestyle Tea
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
