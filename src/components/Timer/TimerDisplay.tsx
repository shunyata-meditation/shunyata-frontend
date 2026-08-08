import { TIMER_TEXT } from './constants'
import styles from './styles.module.css'

interface TimerDisplayProps {
  isComplete: boolean
  isRunning: boolean
  remainingSeconds: number
}

export function TimerDisplay({
  isComplete,
  isRunning,
  remainingSeconds,
}: TimerDisplayProps) {
  const statusText = isComplete
    ? TIMER_TEXT.display.completeStatus
    : isRunning
      ? TIMER_TEXT.display.runningStatus
      : TIMER_TEXT.display.idleStatus

  return (
    <div
      className={styles.face}
      data-complete={isComplete}
      data-running={isRunning}
    >
      <div className={styles.timeWrap}>
        <span className={styles.eyebrow}>
          {isComplete
            ? TIMER_TEXT.display.completeLabel
            : TIMER_TEXT.display.focusLabel}
        </span>
        <time className={styles.time} dateTime={`PT${remainingSeconds}S`}>
          {formatTime(remainingSeconds)}
        </time>
        <span className={styles.status} aria-live="polite">
          {statusText}
        </span>
      </div>
    </div>
  )
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}
