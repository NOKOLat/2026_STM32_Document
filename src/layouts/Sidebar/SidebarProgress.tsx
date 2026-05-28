import { useMemo } from 'react';
import { useProgress } from '../../features/progress/useProgress';
import {
  getTotalLessonCount,
  BEGINNER_COURSE_SECTIONS,
  ACTIVE_SECTIONS
} from '../../shared/constants';
import { calculateCompletedLessons } from '../../features/progress/selectors';
import styles from './Sidebar.module.css';

function getProgressPercent(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}

function SidebarProgressItem({ label, completed, total }: { label: string; completed: number; total: number }) {
  const percent = getProgressPercent(completed, total);

  return (
    <>
      <div className={styles.progressItem}>
        <span className={styles.progressItemLabel}>{label}</span>
        <span className={styles.progressItemText}>{completed}/{total}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressBarFill}
          style={{ width: percent + '%' }}
        ></div>
      </div>
      <div className={styles.progressPercentage}>{percent}%</div>
    </>
  );
}

export default function SidebarProgress({ isOpen }: { isOpen: boolean }) {
  const progressData = useProgress();

  const beginnerProgress = useMemo(() => {
    const completed = calculateCompletedLessons(progressData, 1, BEGINNER_COURSE_SECTIONS);
    const total = getTotalLessonCount(BEGINNER_COURSE_SECTIONS);
    return { completed, total };
  }, [progressData]);

  const totalProgress = useMemo(() => {
    const completed = calculateCompletedLessons(progressData, 1, ACTIVE_SECTIONS);
    const total = getTotalLessonCount(ACTIVE_SECTIONS);
    return { completed, total };
  }, [progressData]);

  return (
    <div className={styles.progressContainer}>
      <h3 className={styles.sectionTitle}>進捗</h3>
      {isOpen && (
        <>
          <SidebarProgressItem label="新歓講座" {...beginnerProgress} />
          <SidebarProgressItem label="全体" {...totalProgress} />
        </>
      )}
    </div>
  );
}
