import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Timer } from '#/components/Timer'

import { MEDITATION_TYPES, TIMER_PRESETS } from './-constants'
import styles from './styles.module.css'

export const Route = createFileRoute('/timer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedMeditationTypeId, setSelectedMeditationTypeId] = useState<string>(
    MEDITATION_TYPES[0].id,
  )

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
          onMeditationTypeChange={setSelectedMeditationTypeId}
          presets={TIMER_PRESETS}
          selectedMeditationTypeId={selectedMeditationTypeId}
        />
      </div>

      <p className={styles.footnote}>Breathe in · Breathe out</p>
    </main>
  )
}
