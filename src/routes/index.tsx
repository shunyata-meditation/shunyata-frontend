import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { PieChart } from '#/components/Stats'
import { Timer } from '#/components/Timer'
import type { MeditationTypeList } from '#/components/Timer'
import type { MeditationSession } from '#/domain/models'
import FakeMeditationSessionRepository from '#/repository/FakeMeditationSessionRepository'

const TIMER_PRESETS = [5, 15, 20] as const
const MEDITATION_TYPES = [
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'breathing', name: 'Breathing' },
  { id: 'body-scan', name: 'Body Scan' },
] as const satisfies MeditationTypeList
const MEDITATION_HISTORY = [
  {
    id: 'session-1',
    meditationType: MEDITATION_TYPES[0].id,
    startTime: new Date('2026-08-09T08:00:00'),
    endTime: new Date('2026-08-09T09:10:00'),
    duration: 70,
    completed: true,
    notes: '',
  },
  {
    id: 'session-2',
    meditationType: MEDITATION_TYPES[1].id,
    startTime: new Date('2026-08-10T08:00:00'),
    endTime: new Date('2026-08-10T08:10:00'),
    duration: 10,
    completed: true,
    notes: '',
  },
  {
    id: 'session-3',
    meditationType: MEDITATION_TYPES[2].id,
    startTime: new Date('2026-08-11T08:00:00'),
    endTime: new Date('2026-08-11T08:20:00'),
    duration: 20,
    completed: true,
    notes: '',
  },
] as const satisfies readonly MeditationSession[]

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [repository] = useState(
    () => new FakeMeditationSessionRepository(MEDITATION_HISTORY),
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

        <div className="sanctuary__practice">
          <Timer
            meditationTypes={MEDITATION_TYPES}
            presets={TIMER_PRESETS}
            repository={repository}
          />
          <PieChart history={MEDITATION_HISTORY} />
        </div>
      </div>

      <p className="sanctuary__footnote">Breathe in · Breathe out</p>
    </main>
  )
}
