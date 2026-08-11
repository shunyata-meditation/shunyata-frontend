export const CHART_SIZE = 120;
export const CHART_CENTER = CHART_SIZE / 2;
export const CHART_RADIUS = 48;
export const CHART_CIRCUMFERENCE = 2 * Math.PI * CHART_RADIUS;

export const KNOWN_TYPE_ORDER = [
  "mindfulness",
  "breathing",
  "body-scan",
] as const;

export const TYPE_COLORS: Record<string, string> = {
  mindfulness: "#a9654e",
  breathing: "#789262",
  "body-scan": "#c29a5b",
};

export const FALLBACK_COLORS = [
  "#667c7b",
  "#8b7185",
  "#8c7658",
  "#6d755b",
] as const;

export const PIE_CHART_TEXT = {
  defaultTitle: "Practice by type",
  emptyDescription: "Complete a meditation to see your practice mix.",
  emptyTitle: "No practice recorded yet",
  kicker: "Meditation mix",
  minutesAbbreviation: "min",
  minutesLabel: "minutes",
  percentageLabel: "percent",
  totalMinutesLabel: "total meditation minutes",
} as const;
