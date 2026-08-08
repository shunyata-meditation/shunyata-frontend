import { useEffect, useReducer, useRef } from "react";

type TimerPresetList = readonly [number, ...number[]];

enum TimerStatus {
  Idle = "idle",
  Running = "running",
  Complete = "complete",
}

type SelectedMinutes =
  { kind: "preset"; minutes: number } | { kind: "custom"; minutes: number };

type TimerState = {
  selectedMinutes: SelectedMinutes;
  remainingSeconds: number;
  status: TimerStatus;
};

type TimerAction =
  | { type: "pause"; remainingSeconds: number }
  | { type: "reset" }
  | { type: "setPresetTime"; minutes: number }
  | { type: "setCustomTime"; minutes: number }
  | { type: "start" }
  | { type: "tick"; remainingSeconds: number };

const DEFAULT_MINUTES: number = 25;
const MAX_CUSTOM_MINUTES = 999;
const TICK_INTERVAL_MS = 250;
const SECONDS_PER_MINUTE = 60;

function createInitialState(presets: TimerPresetList): TimerState {
  const selectedMinutes = presets.includes(DEFAULT_MINUTES)
    ? DEFAULT_MINUTES
    : presets[0];

  return {
    selectedMinutes: { kind: "preset", minutes: selectedMinutes },
    remainingSeconds: selectedMinutes * SECONDS_PER_MINUTE,
    status: TimerStatus.Idle,
  };
}

function getRemainingSeconds(deadline: number) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "pause":
      return {
        ...state,
        remainingSeconds: action.remainingSeconds,
        status:
          action.remainingSeconds === 0
            ? TimerStatus.Complete
            : TimerStatus.Idle,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: action.remainingSeconds,
        status:
          action.remainingSeconds === 0
            ? TimerStatus.Complete
            : TimerStatus.Running,
      };
    case "reset":
      return {
        ...state,
        remainingSeconds: state.selectedMinutes.minutes * SECONDS_PER_MINUTE,
        status: TimerStatus.Idle,
      };
    case "setPresetTime":
      return {
        selectedMinutes: { kind: "preset", minutes: action.minutes },
        remainingSeconds: action.minutes * SECONDS_PER_MINUTE,
        status: TimerStatus.Idle,
      };
    case "setCustomTime":
      return {
        selectedMinutes: { kind: "custom", minutes: action.minutes },
        remainingSeconds: action.minutes * SECONDS_PER_MINUTE,
        status: TimerStatus.Idle,
      };
    case "start":
      return { ...state, status: TimerStatus.Running };
  }
}

function tickEffectHandler(
  isRunning: boolean,
  deadlineRef: React.RefObject<number | null>,
  dispatch: React.Dispatch<TimerAction>,
): () => void {
  if (!isRunning) return () => {};

  const tick = () => {
    const deadline = deadlineRef.current;
    if (deadline === null) return;

    const nextRemaining = getRemainingSeconds(deadline);
    dispatch({ type: "tick", remainingSeconds: nextRemaining });

    if (nextRemaining === 0) deadlineRef.current = null;
  };

  tick();
  const interval = window.setInterval(tick, TICK_INTERVAL_MS);

  return () => window.clearInterval(interval);
}

export function useTimer(presets: TimerPresetList) {
  const [state, dispatch] = useReducer(
    timerReducer,
    presets,
    createInitialState,
  );
  const deadlineRef = useRef<number | null>(null);
  const { remainingSeconds, selectedMinutes, status } = state;

  const isRunning = status === TimerStatus.Running;
  const isComplete = status === TimerStatus.Complete;

  useEffect(
    () => tickEffectHandler(isRunning, deadlineRef, dispatch),
    [isRunning],
  );

  const createSetTime = (actionType: "setPresetTime" | "setCustomTime") => {
    return (minutes: number) => {
      const clampedMinutes = Math.max(0, Math.min(MAX_CUSTOM_MINUTES, minutes));
      dispatch({ type: actionType, minutes: clampedMinutes });
    };
  };

  const toggleTimer = () => {
    if (status === TimerStatus.Complete) return;

    if (status === TimerStatus.Running) {
      const deadline = deadlineRef.current;
      deadlineRef.current = null;
      dispatch({
        type: "pause",
        remainingSeconds:
          deadline === null ? remainingSeconds : getRemainingSeconds(deadline),
      });
      return;
    }

    deadlineRef.current = Date.now() + remainingSeconds * 1000;
    dispatch({ type: "start" });
  };

  const resetTimer = () => {
    deadlineRef.current = null;
    dispatch({ type: "reset" });
  };

  return {
    isComplete,
    isRunning,
    maxCustomMinutes: MAX_CUSTOM_MINUTES,
    remainingSeconds,
    setCustomTime: createSetTime("setCustomTime"),
    setPresetTime: createSetTime("setPresetTime"),
    resetTimer,
    selectedMinutes,
    toggleTimer,
  };
}

export type { TimerPresetList };
