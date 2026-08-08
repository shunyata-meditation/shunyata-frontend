export const TIMER_TEXT = {
  accessibleName: "Focus timer",
  presetGroupLabel: "Choose session length",
  minuteUnit: "min",
  custom: {
    label: "Custom",
    placeholder: "Minutes",
  },
  display: {
    completeLabel: "Complete",
    focusLabel: "Focus",
    completeStatus: "The moment is complete.",
    runningStatus: "Stay with this breath.",
    idleStatus: "Begin when you are ready.",
  },
  controls: {
    begin: "Begin",
    pause: "Pause",
    reset: "Reset",
    startAriaLabel: "Start focus timer",
    pauseAriaLabel: "Pause focus timer",
  },
} as const;

export function getResetTimerAriaLabel(minutes: number) {
  return `Reset timer to ${minutes} minutes`;
}
