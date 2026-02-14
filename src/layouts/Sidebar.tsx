import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { Logout } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

interface ProgressData {
    [key: string]: number | undefined;
}

export default function Sidebar() {
    const { isOpen, toggleSidebar } = useSidebar();
    const navigate = useNavigate();
    const [progressData, setProgressData] = useState<ProgressData>({});

    useEffect(() => {
        const loadProgress = () => {
            const data: ProgressData = {};
            for (let i = 1; i <= 6; i++) {
                const sectionData = localStorage.getItem(`section${i}`);
                if (sectionData) {
                    data[`section${i}`] = parseInt(sectionData, 10);
                }
            }
            setProgressData(data);
        };

        loadProgress();

        window.addEventListener('progressUpdated', loadProgress);
        return () => {
            window.removeEventListener('progressUpdated', loadProgress);
        };
    }, []);

    const countCompletedLessons = (bitmask: number): number => {
        let count = 0;
        while (bitmask > 0) {
            count += bitmask & 1;
            bitmask >>= 1;
        }
        return count;
    };

    // 新歓講座（Step 1-3）の進捗
    const getShinkantosaProgress = (): { completed: number; total: number } => {
        let completed = 0;
        const lessonCounts = [4, 4, 5]; // Step 1, 2, 3のレッスン数
        for (let i = 1; i <= 3; i++) {
            completed += countCompletedLessons(progressData[`section${i}`] || 0);
        }
        return { completed, total: lessonCounts.reduce((a, b) => a + b, 0) };
    };

    // 全体の進捗
    const getTotalProgress = (): { completed: number; total: number } => {
        let completed = 0;
        const lessonCounts = [4, 4, 5, 3, 7, 8]; // 全Stepのレッスン数
        for (let i = 1; i <= 6; i++) {
            completed += countCompletedLessons(progressData[`section${i}`] || 0);
        }
        return { completed, total: lessonCounts.reduce((a, b) => a + b, 0) };
    };

    const shinkantosaProgress = getShinkantosaProgress();
    const totalProgress = getTotalProgress();

    const handleLogout = () => {
        Logout();
        navigate('/');
    };

    const handleMyPageClick = () => {
        navigate('/mypage');
    };

    const handleSectionClick = (sectionNumber: number) => {
        navigate('/mainpage');
        // Navigate first, then scroll after a short delay to ensure page is loaded
        setTimeout(() => {
            const element = document.getElementById(`section${sectionNumber}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const sections = [
        { number: 1, label: 'Step 1' },
        { number: 2, label: 'Step 2' },
        { number: 3, label: 'Step 3' },
        { number: 4, label: 'Step 4' },
        { number: 5, label: 'Step 5' },
        { number: 6, label: 'Step 6' },
    ];

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <button
                className={styles.toggleButton}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
                title="メニューを開く/閉じる"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav className={styles.nav}>
                <div className={styles.progressContainer}>
                    <h3 className={styles.sectionTitle}>進捗</h3>
                    {isOpen && (
                        <>
                            <div className={styles.progressItem}>
                                <span className={styles.progressItemLabel}>新歓講座</span>
                                <span className={styles.progressItemText}>
                                    {shinkantosaProgress.completed}/{shinkantosaProgress.total}
                                </span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressBarFill}
                                    style={{ width: `${(shinkantosaProgress.completed / shinkantosaProgress.total) * 100}%` }}
                                ></div>
                            </div>
                            <div className={styles.progressPercentage}>
                                {Math.round((shinkantosaProgress.completed / shinkantosaProgress.total) * 100)}%
                            </div>

                            <div className={styles.progressItem}>
                                <span className={styles.progressItemLabel}>全体</span>
                                <span className={styles.progressItemText}>
                                    {totalProgress.completed}/{totalProgress.total}
                                </span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressBarFill}
                                    style={{ width: `${(totalProgress.completed / totalProgress.total) * 100}%` }}
                                ></div>
                            </div>
                            <div className={styles.progressPercentage}>
                                {Math.round((totalProgress.completed / totalProgress.total) * 100)}%
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.navSection}>
                    <h3 className={styles.sectionTitle}>講座</h3>
                    <ul className={styles.navList}>
                        {sections.map((section) => (
                            <li key={section.number}>
                                <button
                                    onClick={() => handleSectionClick(section.number)}
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
                            <button
                                className={styles.navButton}
                                onClick={handleScrollToTop}
                                title="ページトップへ"
                            >
                                {isOpen && <span className={styles.label}>トップへ</span>}
                                <span className={styles.icon}>⬆️</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={styles.navButton}
                                onClick={handleMyPageClick}
                                title="マイページ"
                            >
                                {isOpen && <span className={styles.label}>マイページ</span>}
                                <span className={styles.icon}>👤</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={styles.navButton}
                                onClick={handleLogout}
                                title="ログアウト"
                            >
                                {isOpen && <span className={styles.label}>ログアウト</span>}
                                <span className={styles.icon}>🚪</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
}
