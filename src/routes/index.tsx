import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Timer } from '#/components/Timer'
import type { MeditationTypeList } from '#/components/Timer'

const TIMER_PRESETS = [5, 15, 20] as const
const MEDITATION_TYPES = [
  { id: 'mindfulness', label: 'Mindfulness' },
  { id: 'breathing', label: 'Breathing' },
  { id: 'body-scan', label: 'Body Scan' },
] as const satisfies MeditationTypeList

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [selectedMeditationTypeId, setSelectedMeditationTypeId] = useState<string>(
    MEDITATION_TYPES[0].id,
  )

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

        <Timer
          meditationTypes={MEDITATION_TYPES}
          onMeditationTypeChange={setSelectedMeditationTypeId}
          presets={TIMER_PRESETS}
          selectedMeditationTypeId={selectedMeditationTypeId}
        />
      </div>

      <p className="sanctuary__footnote">Breathe in · Breathe out</p>
    </main>
  )
}
