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
    ? 'The moment is complete.'
    : isRunning
      ? 'Stay with this breath.'
      : 'Begin when you are ready.'

  return (
    <div className="timer__face" data-complete={isComplete}>
      <div className="timer__time-wrap">
        <span className="timer__eyebrow">
          {isComplete ? 'Complete' : 'Focus'}
        </span>
        <time className="timer__time" dateTime={`PT${remainingSeconds}S`}>
          {formatTime(remainingSeconds)}
        </time>
        <span className="timer__status" aria-live="polite">
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
