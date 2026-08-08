import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MeditationType } from "./TimerMeditationTypes";

import {
  DEFAULT_MINUTES,
  MAX_CUSTOM_MINUTES,
  SECONDS_PER_MINUTE,
  TICK_INTERVAL_MS,
} from "./constants";

type TimerPresetList = readonly [number, ...number[]];

type SelectedMinutes =
  { kind: "preset"; minutes: number } | { kind: "custom"; minutes: number };

interface TimerState {
  isComplete: boolean;
  isRunning: boolean;
  maxCustomMinutes: number;
  meditationType: MeditationType | null;
  remainingSeconds: number;
  selectedMinutes: SelectedMinutes;
}

interface TimerActions {
  initialize: (presets: TimerPresetList) => void;
  resetTimer: () => void;
  setCustomTime: (minutes: number) => void;
  setPresetTime: (minutes: number) => void;
  setMeditationType: (meditationType: MeditationType) => void;
  toggleTimer: () => void;
}

type TimerStore = TimerState & TimerActions;

const initialState: TimerState = {
  isComplete: false,
  isRunning: false,
  maxCustomMinutes: MAX_CUSTOM_MINUTES,
  meditationType: null,
  remainingSeconds: DEFAULT_MINUTES * SECONDS_PER_MINUTE,
  selectedMinutes: { kind: "preset", minutes: DEFAULT_MINUTES },
};

function clampMinutes(minutes: number) {
  return Math.max(0, Math.min(MAX_CUSTOM_MINUTES, minutes));
}

function getRemainingSeconds(deadline: number) {
  return Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => {
      let deadline: number | null = null;
      let interval: NodeJS.Timeout | null = null;

      const stopTicking = () => {
        if (interval !== null) clearInterval(interval);
        interval = null;
        deadline = null;
      };

      const setTime = (kind: SelectedMinutes["kind"], minutes: number) => {
        const clampedMinutes = clampMinutes(minutes);
        stopTicking();
        set({
          isComplete: false,
          isRunning: false,
          remainingSeconds: clampedMinutes * SECONDS_PER_MINUTE,
          selectedMinutes: { kind, minutes: clampedMinutes },
        });
      };

      const tick = () => {
        if (deadline === null) return;

        const remainingSeconds = getRemainingSeconds(deadline);

        if (remainingSeconds === 0) {
          stopTicking();
          set({ isComplete: true, isRunning: false, remainingSeconds: 0 });
          return;
        }

        if (remainingSeconds !== get().remainingSeconds) {
          set({ remainingSeconds });
        }
      };

      return {
        ...initialState,
        initialize: (presets) => {
          const minutes = presets[0];
          setTime("preset", minutes);
        },
        setMeditationType: (meditationType) => set({ meditationType }),
        resetTimer: () => {
          stopTicking();
          set((state) => ({
            isComplete: false,
            isRunning: false,
            remainingSeconds:
              state.selectedMinutes.minutes * SECONDS_PER_MINUTE,
          }));
        },
        setCustomTime: (minutes) => setTime("custom", minutes),
        setPresetTime: (minutes) => setTime("preset", minutes),
        toggleTimer: () => {
          const { isComplete, isRunning, remainingSeconds } = get();
          if (isComplete) return;

          if (isRunning) {
            const nextRemaining =
              deadline === null
                ? remainingSeconds
                : getRemainingSeconds(deadline);
            stopTicking();
            set({
              isComplete: nextRemaining === 0,
              isRunning: false,
              remainingSeconds: nextRemaining,
            });
            return;
          }

          deadline = Date.now() + remainingSeconds * 1000;
          set({ isRunning: true });
          interval = setInterval(tick, TICK_INTERVAL_MS);
          tick();
        },
      };
    },
    {
      name: "timer-storage",
      partialize: (state) => ({
        ...state,
        isRunning: false,
      }),
      skipHydration: true,
    },
  ),
);

export type { SelectedMinutes, TimerPresetList, TimerState, TimerStore };
