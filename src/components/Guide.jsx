import { motion } from 'framer-motion'

export default function Guide({ text }) {
  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto z-40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-4"
      >
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-300 to-cyan-400 shadow-inner" />
          <div>
            <p className="text-slate-800 font-semibold">Auri</p>
            <p className="text-slate-700 text-sm leading-relaxed">{text}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
