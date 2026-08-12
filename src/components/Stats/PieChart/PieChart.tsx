import { useId } from "react";

import { PIE_CHART_TEXT } from "./constants";
import { EmptyState } from "./EmptyState";
import { PieGraphic } from "./PieGraphic";
import { PieLegend } from "./PieLegend";
import { formatMinutes, getMeditationStats } from "./stats";
import styles from "./styles.module.css";
import type { PieChartProps } from "./types";

export type { PieChartProps } from "./types";

export function PieChart({
  history,
  title = PIE_CHART_TEXT.defaultTitle,
}: PieChartProps) {
  const titleId = useId();
  const descriptionId = useId();
  const { stats, totalMinutes } = getMeditationStats(history);

  if (stats.length === 0) {
    return <EmptyState title={title} titleId={titleId} />;
  }

  const description = stats
    .map(
      (stat) =>
        `${stat.label} ${stat.percentage} ${PIE_CHART_TEXT.percentageLabel}`,
    )
    .join(", ");

  return (
    <figure className={styles.card} aria-labelledby={titleId}>
      <figcaption className={styles.heading}>
        <p className={styles.kicker}>{PIE_CHART_TEXT.kicker}</p>
        <h2 id={titleId}>{title}</h2>
      </figcaption>

      <div className={styles.content}>
        <PieGraphic
          descriptionId={descriptionId}
          stats={stats}
          titleId={titleId}
          totalMinutes={totalMinutes}
        />
        <PieLegend stats={stats} />
      </div>

      <p className={styles.srOnly} id={descriptionId}>
        {formatMinutes(totalMinutes)} {PIE_CHART_TEXT.totalMinutesLabel}.{" "}
        {description}.
      </p>
    </figure>
  );
}
