export interface MeditationHistoryEntry {
  meditationType: {
    id: string;
    label: string;
  };
  durationMinutes: number;
}

export interface PieChartProps {
  history: readonly MeditationHistoryEntry[];
  title?: string;
}

export interface MeditationTypeStat {
  color: string;
  id: string;
  label: string;
  minutes: number;
  percentage: number;
}
