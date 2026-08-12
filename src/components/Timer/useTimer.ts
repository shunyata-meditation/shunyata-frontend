import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@tanstack/react-router";

import type { MeditationSession } from "#/domain/models";
import type BaseRepository from "#/repository/BaseRepository";

import type { MeditationTypeList } from "./types";
import { useTimerStore } from "./usetimerStore";
import type { TimerPresetList } from "./usetimerStore";

export function useTimer(
  presets: TimerPresetList,
  meditationTypes: MeditationTypeList,
  repository: BaseRepository<MeditationSession>,
) {
  const isHydrated = useHydrated();
  const [isReady, setIsReady] = useState(false);
  const { initialize, ...timer } = useTimerStore();
  const wasComplete = useRef(timer.isComplete);

  useEffect(() => {
    if (!isHydrated) return;

    void Promise.resolve(useTimerStore.persist.rehydrate())
      .then(() => {
        const state = useTimerStore.getState();
        const hasValidPreset =
          state.selectedMinutes.kind !== "preset" ||
          presets.includes(state.selectedMinutes.minutes);

        if (!hasValidPreset) initialize(presets);
      })
      .finally(() => setIsReady(true));
  }, [initialize, isHydrated, presets]);

  useEffect(() => {
    if (!isReady) {
      wasComplete.current = timer.isComplete;
      return;
    }

    const hasJustCompleted = timer.isComplete && !wasComplete.current;
    wasComplete.current = timer.isComplete;

    if (!hasJustCompleted) return;

    const endTime = new Date();
    const startTime = timer.startedAt
      ? new Date(timer.startedAt)
      : new Date(endTime.getTime() - timer.selectedMinutes.minutes * 60_000);

    void repository
      .add({
        id: crypto.randomUUID(),
        meditationType: timer.meditationType?.id ?? meditationTypes[0].id,
        startTime,
        endTime,
        duration: timer.selectedMinutes.minutes,
        completed: true,
        notes: "",
      })
      .catch((error: unknown) => {
        console.error("Failed to save meditation session", error);
      });
  }, [
    isReady,
    meditationTypes,
    repository,
    timer.isComplete,
    timer.meditationType,
    timer.selectedMinutes.minutes,
    timer.startedAt,
  ]);

  return timer;
}

export type { TimerPresetList };
