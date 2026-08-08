import { TIMER_TEXT } from './constants'
import styles from './styles.module.css'
import type { TimerPresetList } from './useTimer'

interface TimerPresetsProps {
  onSelect: (minutes: number) => void
  presets: TimerPresetList
  minutes: number | null
}

export function TimerPresets({
  onSelect,
  presets,
  minutes,
}: TimerPresetsProps) {
  return (
    <div
      className={styles.presets}
      aria-label={TIMER_TEXT.presetGroupLabel}
      role="group"
    >
      {presets.map((m) => (
        <button
          className={styles.preset}
          data-active={minutes === m}
          key={m}
          onClick={() => onSelect(m)}
          type="button"
          aria-pressed={minutes === m}
        >
          {m} {TIMER_TEXT.minuteUnit}
        </button>
      ))}
    </div>
  )
}
