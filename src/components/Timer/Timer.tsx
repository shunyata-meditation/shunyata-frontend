import { TimerControls } from './TimerControls'
import { TimerCustomTime } from './TimerCustomTime'
import { TimerDisplay } from './TimerDisplay'
import { TimerMeditationTypes } from './TimerMeditationTypes'
import { TimerPresets } from './TimerPresets'
import { TIMER_TEXT } from './constants'
import styles from './styles.module.css'
import { useTimer } from './useTimer'
import type { TimerPresetList } from './useTimer'
import type { MeditationTypeList } from './TimerMeditationTypes'

export interface TimerProps {
  meditationTypes: MeditationTypeList
  presets: TimerPresetList
}

export function Timer({
  meditationTypes,
  presets,
}: TimerProps) {
  const {
    isComplete,
    isRunning,
    maxCustomMinutes,
    remainingSeconds,
    selectedMinutes,
    meditationType,
    setMeditationType,
    setCustomTime,
    setPresetTime,
    resetTimer,
    toggleTimer,
  } = useTimer(presets)

  const presetMinutes = selectedMinutes.kind === 'preset' ? selectedMinutes.minutes : null
  const customMinutes = selectedMinutes.kind === 'custom' ? selectedMinutes.minutes : null
  const controlledSelectedMinutes = presetMinutes ?? customMinutes ?? 0

  return (
    <section className={styles.timer} aria-label={TIMER_TEXT.accessibleName}>
      <TimerMeditationTypes
        disabled={isRunning}
        meditationTypes={meditationTypes}
        onSelect={setMeditationType}
        selectedId={meditationType?.id ?? meditationTypes[0].id}
      />
      <TimerPresets
        disabled={isRunning}
        presets={presets}
        minutes={presetMinutes}
        onSelect={setPresetTime}
      />
      <TimerCustomTime
        disabled={isRunning}
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
