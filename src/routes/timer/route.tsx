import { createFileRoute } from '@tanstack/react-router'

import { Timer } from '#/components/Timer'

import { MEDITATION_TYPES, TIMER_PRESETS } from './-constants'
import styles from './styles.module.css'

export const Route = createFileRoute('/timer')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className={styles.sanctuary}>
      <div className={styles.wash} aria-hidden="true" />
      <header className={styles.header}>
        <span className={styles.mark} aria-hidden="true" />
        <p>Shunyata</p>
      </header>

      <div className={styles.timer}>
        <Timer
          meditationTypes={MEDITATION_TYPES}
          presets={TIMER_PRESETS}
        />
      </div>

      <p className={styles.footnote}>Breathe in · Breathe out</p>
    </main>
  )
}
