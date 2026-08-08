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
  onMeditationTypeChange: (id: string) => void
  presets: TimerPresetList
  selectedMeditationTypeId: string
}

export function Timer({
  meditationTypes,
  onMeditationTypeChange,
  presets,
  selectedMeditationTypeId,
}: TimerProps) {
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
    <section className={styles.timer} aria-label={TIMER_TEXT.accessibleName}>
      <TimerMeditationTypes
        disabled={isRunning}
        meditationTypes={meditationTypes}
        onSelect={onMeditationTypeChange}
        selectedId={selectedMeditationTypeId}
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
