import { createFileRoute } from '@tanstack/react-router'

import { PieChart } from '#/components/Stats'
import type { MeditationHistoryEntry } from '#/components/Stats'
import { Timer } from '#/components/Timer'
import type { MeditationTypeList } from '#/components/Timer'

const TIMER_PRESETS = [5, 15, 20] as const
const MEDITATION_TYPES = [
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'breathing', label: 'Breathing' },
  { id: 'body-scan', label: 'Body Scan' },
] as const satisfies MeditationTypeList
const MEDITATION_HISTORY = [
  {
    meditationType: MEDITATION_TYPES[0],
    durationMinutes: 70,
  },
  {
    meditationType: MEDITATION_TYPES[1],
    durationMinutes: 10,
  },
  {
    meditationType: MEDITATION_TYPES[2],
    durationMinutes: 20,
  },
] as const satisfies readonly MeditationHistoryEntry[]

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="sanctuary">
      <div className="sanctuary__wash" aria-hidden="true" />
      <header className="sanctuary__header">
        <span className="sanctuary__mark" aria-hidden="true" />
        <p>Shunyata</p>
      </header>

      <div className="sanctuary__content">
        <div className="sanctuary__intro">
          <p className="sanctuary__kicker">A space for one thing</p>
          <h1>Return to the present.</h1>
          <p className="sanctuary__copy">
            Choose a quiet interval. Let everything else wait.
          </p>
        </div>

        <div className="sanctuary__practice">
          <Timer
            meditationTypes={MEDITATION_TYPES}
            presets={TIMER_PRESETS}
          />
          <PieChart history={MEDITATION_HISTORY} />
        </div>
      </div>

      <p className="sanctuary__footnote">Breathe in · Breathe out</p>
    </main>
  )
}
