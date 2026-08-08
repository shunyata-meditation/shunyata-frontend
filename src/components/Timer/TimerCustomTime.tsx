import { useId } from 'react'

import { TIMER_TEXT } from './constants'
import styles from './styles.module.css'

interface TimerCustomTimeProps {
  disabled: boolean
  maxMinutes: number
  minutes: number | null
  setTime: (minutes: number) => void
}

export function TimerCustomTime({
  disabled,
  maxMinutes,
  minutes,
  setTime,
}: TimerCustomTimeProps) {
  const inputId = useId()
  let minutesString = ''
  if (minutes == null) {
    minutesString = ''
  } else {
    minutesString = minutes !== 0 ? String(minutes) : ''
  }

  return (
    <div className={styles.customWrap}>
      <div
        className={styles.custom}
        data-active={minutes !== null}
        data-disabled={disabled}
      >
        <label htmlFor={inputId}>{TIMER_TEXT.custom.label}</label>
        <input
          disabled={disabled}
          id={inputId}
          type="text"
          inputMode="numeric"
          maxLength={String(maxMinutes).length}
          placeholder={TIMER_TEXT.custom.placeholder}
          value={minutesString}
          onChange={(event) => {
            if (event.target.value === '') {
              setTime(0)
              return
            }
            const inputValue = event.target.value
            const numericValue = parseInt(inputValue, 10)
            if (!isNaN(numericValue)) {
              setTime(numericValue)
            }
          }}
        />
        <span className={styles.customUnit} aria-hidden="true">
          {TIMER_TEXT.minuteUnit}
        </span>
      </div>
    </div>
  )
}
