import { useEffect, useState } from 'react'
import DisclaimerModal from './components/DisclaimerModal'
import Guide from './components/Guide'
import Scene from './components/Scene'
import TeaOasis from './components/TeaOasis'
import { api } from './lib/api'

function App() {
  const [journeyId, setJourneyId] = useState(null)
  const [guideText, setGuideText] = useState('Willkommen, Reisende. Atme tief ein und blicke um dich: Wähle, was deiner Stimmung entspricht.')
  const [recommendation, setRecommendation] = useState(null)

  useEffect(() => {
    api.seedTeas().catch(()=>{})
  }, [])

  const start = async () => {
    const res = await api.startJourney({ consent: true, guide_name: 'Auri' })
    setJourneyId(res.journey_id)
    setGuideText('Folge deiner Neugier. Berühre die Symbole in der Landschaft – sie sprechen für deine Stimmung.')
  }

  const record = async (type, value) => {
    if (!journeyId) return
    await api.recordInteraction({ journey_id: journeyId, type, value })
  }

  const onMetaphorPick = async (metaphor) => {
    setGuideText(
      metaphor === 'clouds'
        ? 'Die Wolken der Schwere ziehen vorüber – du sehnst dich nach Ruhe.'
        : metaphor === 'sparks'
        ? 'Lichtfunken tanzen – ein Hauch von Leichtigkeit und Aufbruch.'
        : 'Verwurzelung schenkt Klarheit – du suchst Fokus und Erdung.'
    )
    await record('metaphor_pick', { metaphor })
  }

  const onSparkCollect = async (count) => {
    await record('spark_collect', { count })
  }

  const analyze = async () => {
    if (!journeyId) return
    const rec = await api.analyze(journeyId)
    setRecommendation(rec)
    setGuideText('Am Rand der Oase warten Pflanzen, die dir guttun könnten.')
  }

  const reset = () => {
    setJourneyId(null)
    setRecommendation(null)
    setGuideText('Willkommen, Reisende. Atme tief ein und blicke um dich: Wähle, was deiner Stimmung entspricht.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_60%)]" />

      {!journeyId && <DisclaimerModal onAccept={start} />}

      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-emerald-200">Tee & Seele</h1>
          <button onClick={analyze} className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50" disabled={!journeyId}>
            Empfehlung anzeigen
          </button>
        </header>

        <Scene onMetaphorPick={onMetaphorPick} onSparkCollect={onSparkCollect} />

        <TeaOasis recommendation={recommendation} onReset={reset} />
      </div>

      <Guide text={guideText} />
    </div>
  )
}

export default App
