import './styles.css'

import { TimerControls } from './TimerControls'
import { TimerCustomTime } from './TimerCustomTime'
import { TimerDisplay } from './TimerDisplay'
import { TimerPresets } from './TimerPresets'
import { useTimer } from './useTimer'
import type { TimerPresetList } from './useTimer'

export interface TimerProps {
  presets: TimerPresetList
}

export function Timer({ presets }: TimerProps) {
  const {
    isComplete,
    isRunning,
    maxCustomMinutes,
    remainingSeconds,
    setCustomTime,
    setPresetTime,
    resetTimer,
    selectedMinutes,
    toggleTimer,
  } = useTimer(presets)

  const presetMinutes = selectedMinutes.kind === 'preset' ? selectedMinutes.minutes : null
  const customMinutes = selectedMinutes.kind === 'custom' ? selectedMinutes.minutes : null
  const controlledSelectedMinutes = presetMinutes ?? customMinutes ?? 0

  return (
    <section className="timer" aria-label="Focus timer">
      <TimerPresets
        presets={presets}
        minutes={presetMinutes}
        onSelect={setPresetTime}
      />
      <TimerCustomTime
        maxMinutes={maxCustomMinutes}
        setTime={setCustomTime}
        minutes={customMinutes}
      />
      <TimerDisplay
        isComplete={isComplete}
        isRunning={isRunning}
        remainingSeconds={remainingSeconds}
      />
      <TimerControls
        isComplete={isComplete}
        isRunning={isRunning}
        selectedMinutes={controlledSelectedMinutes}
        onReset={resetTimer}
        onToggle={toggleTimer}
      />
    </section>
  )
}
