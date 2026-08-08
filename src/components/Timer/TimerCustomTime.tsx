import './styles.css'

import { useId } from 'react'

interface TimerCustomTimeProps {
  maxMinutes: number
  minutes: number | null
  setTime: (minutes: number) => void
}

export function TimerCustomTime({
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
    <div className="timer__custom-wrap">
      <div className="timer__custom" data-active={minutes !== null}>
        <label htmlFor={inputId}>Custom</label>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          maxLength={String(maxMinutes).length}
          placeholder="Minutes"
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
        <span className="timer__custom-unit" aria-hidden="true">
          min
        </span>
      </div>
    </div>
  )
}
