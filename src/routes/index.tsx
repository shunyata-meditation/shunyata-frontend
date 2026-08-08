import { createFileRoute } from '@tanstack/react-router'

import { Timer } from '#/components/Timer'

const TIMER_PRESETS = [5, 15, 20] as const

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

        <Timer presets={TIMER_PRESETS} />
      </div>

      <p className="sanctuary__footnote">Breathe in · Breathe out</p>
    </main>
  )
}
