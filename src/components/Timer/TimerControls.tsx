import { TIMER_TEXT, getResetTimerAriaLabel } from './constants'
import { TIMER_ICON_PATHS, TIMER_ICON_VIEW_BOX } from './iconPaths'
import styles from './styles.module.css'

interface TimerControlsProps {
  isComplete: boolean
  isRunning: boolean
  onReset: () => void
  onToggle: () => void
  selectedMinutes: number
}

export function TimerControls({
  isComplete,
  isRunning,
  onReset,
  onToggle,
  selectedMinutes,
}: TimerControlsProps) {
  const primaryControlClassName = [
    styles.control,
    styles.controlPrimary,
  ].join(' ')
  const quietControlClassName = [styles.control, styles.controlQuiet].join(' ')

  return (
    <div className={styles.controls}>
      <button
        className={primaryControlClassName}
        disabled={isComplete}
        onClick={onToggle}
        type="button"
        aria-label={
          isRunning
            ? TIMER_TEXT.controls.pauseAriaLabel
            : TIMER_TEXT.controls.startAriaLabel
        }
      >
        {isRunning ? <PauseIcon /> : <PlayIcon />}
        <span>
          {isRunning ? TIMER_TEXT.controls.pause : TIMER_TEXT.controls.begin}
        </span>
      </button>
      <button
        className={quietControlClassName}
        onClick={onReset}
        type="button"
        aria-label={getResetTimerAriaLabel(selectedMinutes)}
      >
        <ResetIcon />
        <span>{TIMER_TEXT.controls.reset}</span>
      </button>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg
      className={styles.filledIcon}
      viewBox={TIMER_ICON_VIEW_BOX}
      aria-hidden="true"
    >
      <path d={TIMER_ICON_PATHS.play} />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg
      className={styles.filledIcon}
      viewBox={TIMER_ICON_VIEW_BOX}
      aria-hidden="true"
    >
      <path d={TIMER_ICON_PATHS.pause} />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      className={styles.strokedIcon}
      viewBox={TIMER_ICON_VIEW_BOX}
      aria-hidden="true"
    >
      <path d={TIMER_ICON_PATHS.reset} />
    </svg>
  )
}
