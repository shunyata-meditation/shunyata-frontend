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
      className="timer__presets"
      aria-label="Choose session length"
      role="group"
    >
      {presets.map((m) => (
        <button
          className="timer__preset"
          data-active={minutes === m}
          key={m}
          onClick={() => onSelect(m)}
          type="button"
          aria-pressed={minutes === m}
        >
          {m} min
        </button>
      ))}
    </div>
  )
}
