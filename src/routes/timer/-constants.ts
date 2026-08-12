import type { MeditationTypeList } from "#/components/Timer";

export const TIMER_PRESETS = [5, 15, 20] as const;

export const MEDITATION_TYPES = [
  { id: "mindfulness", name: "Mindfulness" },
  { id: "breathing", name: "Breathing" },
  { id: "body-scan", name: "Body Scan" },
] as const satisfies MeditationTypeList;
