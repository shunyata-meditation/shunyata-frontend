import { useEffect } from "react";
import { useHydrated } from "@tanstack/react-router";

import { useTimerStore } from "./usetimerStore";
import type { TimerPresetList } from "./usetimerStore";

export function useTimer(presets: TimerPresetList) {
  const isHydrated = useHydrated();
  const { initialize, ...timer } = useTimerStore();

  useEffect(() => {
    if (!isHydrated) return;

    void Promise.resolve(useTimerStore.persist.rehydrate()).then(() => {
      const state = useTimerStore.getState();
      const hasValidPreset =
        state.selectedMinutes.kind !== "preset" ||
        presets.includes(state.selectedMinutes.minutes);

      if (!hasValidPreset) initialize(presets);
    });
  }, [initialize, isHydrated, presets]);

  return timer;
}

export type { TimerPresetList };
