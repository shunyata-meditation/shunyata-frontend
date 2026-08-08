import type { MeditationTypeList } from "#/components/Timer";

export const TIMER_PRESETS = [5, 15, 20] as const;

export const MEDITATION_TYPES = [
  { id: "mindfulness", label: "Mindfulness" },
  { id: "breathing", label: "Breathing" },
  { id: "body-scan", label: "Body Scan" },
] as const satisfies MeditationTypeList;
