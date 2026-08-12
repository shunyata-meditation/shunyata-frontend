import { FALLBACK_COLORS, KNOWN_TYPE_ORDER, TYPE_COLORS } from "./constants";
import type { MeditationSession } from "#/domain/models";
import type { MeditationTypeStat } from "./types";

function formatMeditationType(type: string) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getTypeColor(id: string) {
  if (TYPE_COLORS[id]) return TYPE_COLORS[id];

  const hash = Array.from(id).reduce(
    (value, character) => value + character.charCodeAt(0),
    0,
  );

  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

function roundPercentages(values: readonly number[]) {
  const rounded = values.map(Math.floor);
  const remainderOrder = values
    .map((value, index) => ({ fraction: value - rounded[index], index }))
    .sort(
      (left, right) =>
        right.fraction - left.fraction || left.index - right.index,
    );

  let remaining = 100 - rounded.reduce((total, value) => total + value, 0);

  for (const { index } of remainderOrder) {
    if (remaining === 0) break;
    rounded[index] += 1;
    remaining -= 1;
  }

  return rounded;
}

export function getMeditationStats(history: readonly MeditationSession[]) {
  const grouped = new Map<
    string,
    Omit<MeditationTypeStat, "color" | "percentage">
  >();

  for (const session of history) {
    if (!Number.isFinite(session.duration) || session.duration <= 0) {
      continue;
    }

    const current = grouped.get(session.meditationType);

    grouped.set(session.meditationType, {
      id: session.meditationType,
      label: current?.label ?? formatMeditationType(session.meditationType),
      minutes: (current?.minutes ?? 0) + session.duration,
    });
  }

  const totalMinutes = Array.from(grouped.values()).reduce(
    (total, stat) => total + stat.minutes,
    0,
  );

  if (totalMinutes === 0) return { stats: [], totalMinutes: 0 };

  const typeOrder = new Map<string, number>(
    KNOWN_TYPE_ORDER.map((id, index) => [id, index]),
  );
  const ordered = Array.from(grouped.values()).sort((left, right) => {
    const leftOrder = typeOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = typeOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER;

    return leftOrder - rightOrder || left.label.localeCompare(right.label);
  });
  const exactPercentages = ordered.map(
    (stat) => (stat.minutes / totalMinutes) * 100,
  );
  const percentages = roundPercentages(exactPercentages);
  const stats = ordered.map((stat, index) => ({
    ...stat,
    color: getTypeColor(stat.id),
    percentage: percentages[index],
  }));

  return { stats, totalMinutes };
}

export function formatMinutes(minutes: number) {
  return Number.isInteger(minutes) ? String(minutes) : minutes.toFixed(1);
}
