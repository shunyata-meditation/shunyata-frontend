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
  return (
    <div className="timer__controls">
      <button
        className="timer__control timer__control--primary"
        disabled={isComplete}
        onClick={onToggle}
        type="button"
        aria-label={isRunning ? 'Pause focus timer' : 'Start focus timer'}
      >
        {isRunning ? <PauseIcon /> : <PlayIcon />}
        <span>{isRunning ? 'Pause' : 'Begin'}</span>
      </button>
      <button
        className="timer__control timer__control--quiet"
        onClick={onReset}
        type="button"
        aria-label={`Reset timer to ${selectedMinutes} minutes`}
      >
        <ResetIcon />
        <span>Reset</span>
      </button>
    </div>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m7.25 5.1 7 4.9-7 4.9V5.1Z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.5 5.25h2.25v9.5H6.5v-9.5Zm4.75 0h2.25v9.5h-2.25v-9.5Z" fill="currentColor" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M5.35 6.4A6 6 0 1 1 4 10.2M5.35 6.4V2.9m0 3.5h3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
