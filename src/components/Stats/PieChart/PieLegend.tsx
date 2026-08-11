import { PIE_CHART_TEXT } from "./constants";
import styles from "./styles.module.css";
import { formatMinutes } from "./stats";
import type { MeditationTypeStat } from "./types";

interface PieLegendProps {
  stats: readonly MeditationTypeStat[];
}

export function PieLegend({ stats }: PieLegendProps) {
  return (
    <ul className={styles.legend}>
      {stats.map((stat) => (
        <li key={stat.id}>
          <span
            className={styles.legendDot}
            style={{ backgroundColor: stat.color }}
            aria-hidden="true"
          />
          <span className={styles.legendLabel}>{stat.label}</span>
          <span className={styles.legendMinutes}>
            {formatMinutes(stat.minutes)} {PIE_CHART_TEXT.minutesAbbreviation}
          </span>
          <strong>{stat.percentage}%</strong>
        </li>
      ))}
    </ul>
  );
}
