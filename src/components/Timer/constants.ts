export const DEFAULT_MINUTES = 25;
export const MAX_CUSTOM_MINUTES = 99999;
export const TICK_INTERVAL_MS = 250;
export const SECONDS_PER_MINUTE = 60;

export const TIMER_TEXT = {
  accessibleName: "Focus timer",
  meditationTypeGroupLabel: "Choose meditation type",
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
