import { PIE_CHART_TEXT } from "./constants";
import styles from "./styles.module.css";

interface EmptyStateProps {
  title: string;
  titleId: string;
}

export function EmptyState({ title, titleId }: EmptyStateProps) {
  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <div className={styles.heading}>
        <p className={styles.kicker}>{PIE_CHART_TEXT.kicker}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      <div className={styles.empty}>
        <span className={styles.emptyRing} aria-hidden="true" />
        <div>
          <p>{PIE_CHART_TEXT.emptyTitle}</p>
          <span>{PIE_CHART_TEXT.emptyDescription}</span>
        </div>
      </div>
    </section>
  );
}
