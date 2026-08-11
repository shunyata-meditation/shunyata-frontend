import {
  CHART_CENTER,
  CHART_CIRCUMFERENCE,
  CHART_RADIUS,
  CHART_SIZE,
  PIE_CHART_TEXT,
} from "./constants";
import styles from "./styles.module.css";
import { formatMinutes } from "./stats";
import type { MeditationTypeStat } from "./types";

interface PieGraphicProps {
  descriptionId: string;
  stats: readonly MeditationTypeStat[];
  titleId: string;
  totalMinutes: number;
}

export function PieGraphic({
  descriptionId,
  stats,
  titleId,
  totalMinutes,
}: PieGraphicProps) {
  let offset = 0;

  return (
    <div className={styles.chartWrap}>
      <svg
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        className={styles.chart}
        role="img"
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      >
        <circle
          className={styles.track}
          cx={CHART_CENTER}
          cy={CHART_CENTER}
          r={CHART_RADIUS}
        />
        {stats.map((stat) => {
          const segmentLength =
            (stat.minutes / totalMinutes) * CHART_CIRCUMFERENCE;
          const segmentOffset = offset;
          offset += segmentLength;

          return (
            <circle
              className={styles.segment}
              cx={CHART_CENTER}
              cy={CHART_CENTER}
              key={stat.id}
              r={CHART_RADIUS}
              stroke={stat.color}
              strokeDasharray={`${segmentLength} ${CHART_CIRCUMFERENCE - segmentLength}`}
              strokeDashoffset={-segmentOffset}
            />
          );
        })}
      </svg>
      <div className={styles.total} aria-hidden="true">
        <strong>{formatMinutes(totalMinutes)}</strong>
        <span>{PIE_CHART_TEXT.minutesLabel}</span>
      </div>
    </div>
  );
}
