import { useState } from 'react'

export default function DisclaimerModal({ onAccept }) {
  const [open, setOpen] = useState(true)
  const accept = () => { setOpen(false); onAccept?.() }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white/95 max-w-lg w-full rounded-2xl shadow-2xl p-6 border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Hinweis & Einverständnis</h2>
        <p className="text-slate-700 text-sm leading-relaxed mb-4">
          Diese Erfahrung dient dem Wohlbefinden und ersetzt keine medizinische Beratung, Diagnose
          oder Behandlung. Bei anhaltenden Beschwerden wende dich bitte an ärztliche oder
          psychotherapeutische Fachpersonen. Durch Fortfahren bestätigst du, dass du mindestens 18
          Jahre alt bist und den Hinweis verstanden hast.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm mb-4">
          Bei akuter Belastung (z.B. Suizidgedanken) wende dich bitte umgehend an professionelle Hilfe
          oder den örtlichen Notruf.
        </div>
        <button onClick={accept} className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
          Einverstanden und Reise beginnen
        </button>
      </div>
    </div>
  )
}
