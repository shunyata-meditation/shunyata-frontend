import { TIMER_TEXT } from './constants'
import styles from './styles.module.css'

export interface MeditationType {
  id: string
  label: string
}

export type MeditationTypeList = readonly [
  MeditationType,
  ...MeditationType[],
]

interface TimerMeditationTypesProps {
  disabled: boolean
  meditationTypes: MeditationTypeList
  onSelect: (id: string) => void
  selectedId: string
}

export function TimerMeditationTypes({
  disabled,
  meditationTypes,
  onSelect,
  selectedId,
}: TimerMeditationTypesProps) {
  return (
    <div
      className={styles.meditationTypes}
      aria-label={TIMER_TEXT.meditationTypeGroupLabel}
      role="group"
    >
      {meditationTypes.map(({ id, label }) => (
        <button
          aria-pressed={selectedId === id}
          className={styles.meditationType}
          data-active={selectedId === id}
          disabled={disabled}
          key={id}
          onClick={() => onSelect(id)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
