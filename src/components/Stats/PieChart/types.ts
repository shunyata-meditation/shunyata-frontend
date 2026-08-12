import type { MeditationSession } from "#/domain/models";

export interface PieChartProps {
  history: readonly MeditationSession[];
  title?: string;
}

export interface MeditationTypeStat {
  color: string;
  id: string;
  label: string;
  minutes: number;
  percentage: number;
}
