import { ACTIVE_COURSE_SECTIONS } from '../../features/course/courseData';
import styles from './Sidebar.module.css';

interface SidebarNavProps {
  isOpen: boolean;
  onSectionClick: (sectionNumber: number) => void;
  onScrollToTop: () => void;
  onMyPageClick: () => void;
  onLogout: () => void;
}

export default function SidebarNav({
  isOpen,
  onSectionClick,
  onScrollToTop,
  onMyPageClick,
  onLogout
}: SidebarNavProps) {
  return (
    <>
      <div className={styles.navSection}>
        <h3 className={styles.sectionTitle}>講座</h3>
        <ul className={styles.navList}>
          {ACTIVE_COURSE_SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={styles.navLink}
                title={section.label}
              >
                {isOpen && <span className={styles.label}>{section.label}</span>}
                <span className={styles.icon}>📚</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.navSection}>
        <h3 className={styles.sectionTitle}>メニュー</h3>
        <ul className={styles.navList}>
          <li>
            <button className={styles.navButton} onClick={onScrollToTop} title="ページトップへ">
              {isOpen && <span className={styles.label}>トップへ</span>}
              <span className={styles.icon}>⬆️</span>
            </button>
          </li>
          <li>
            <button className={styles.navButton} onClick={onMyPageClick} title="マイページ">
              {isOpen && <span className={styles.label}>マイページ</span>}
              <span className={styles.icon}>👤</span>
            </button>
          </li>
          <li>
            <button className={styles.navButton} onClick={onLogout} title="ログアウト">
              {isOpen && <span className={styles.label}>ログアウト</span>}
              <span className={styles.icon}>🚪</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
