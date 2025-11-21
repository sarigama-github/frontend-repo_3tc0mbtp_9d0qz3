export default function TeaOasis({ recommendation, onReset }) {
  if (!recommendation) return null
  return (
    <div className="mt-10 bg-white/5 border border-emerald-400/20 rounded-3xl p-6 backdrop-blur-md">
      <h3 className="text-2xl font-semibold text-emerald-200 mb-2">Dein Seelen-Tee</h3>
      <p className="text-emerald-100/80 text-sm mb-4">Basierend auf deiner Reise empfehlen wir dir Folgendes:</p>
      {recommendation.teas.length === 0 ? (
        <p className="text-slate-200">Noch keine Empfehlung – sammle Eindrücke in der Landschaft.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {recommendation.teas.map((t) => (
            <li key={t} className="rounded-2xl border border-emerald-300/20 bg-emerald-900/20 p-4">
              <p className="text-emerald-100 font-medium">{t}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <button onClick={onReset} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">Neue Reise</button>
      </div>
    </div>
  )
}
