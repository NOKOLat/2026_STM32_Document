import { useEffect, useState } from 'react';
import Topbar from '../layouts/Topbar';
import Footer from '../layouts/Footer';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import {
  SECTIONS,
  countCompletedLessons,
  ACTIVE_SECTIONS,
  calculateCompletedLessons,
  getTotalLessonCount,
  BEGINNER_COURSE_SECTIONS
} from '../utils';
import style from './mypage.module.css';

interface ProgressData {
  section1?: number;
  section2?: number;
  section3?: number;
  section4?: number;
  section5?: number;
  section6?: number;
  [key: string]: number | undefined;
}

export default function MyPage() {
  const [progressData, setProgressData] = useState<ProgressData>({});

  useEffect(() => {
    // localStorage から section1-6 のデータを読み込む
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

    // progressUpdated イベントをリッスンして更新
    window.addEventListener('progressUpdated', loadProgress);

    return () => {
      window.removeEventListener('progressUpdated', loadProgress);
    };
  }, []);

  const getProgressValue = (sectionId: number): number => {
    const bitmask = progressData[`section${sectionId}`] || 0;
    return countCompletedLessons(bitmask);
  };

  // 全体の進捗を計算
  const getTotalProgress = (): { current: number; max: number } => {
    const current = calculateCompletedLessons(progressData, 1, ACTIVE_SECTIONS);
    const max = getTotalLessonCount(ACTIVE_SECTIONS);
    return { current, max };
  };

  // Step3までの進捗を計算
  const getStep3Progress = (): { current: number; max: number } => {
    const current = calculateCompletedLessons(progressData, 1, BEGINNER_COURSE_SECTIONS);
    const max = getTotalLessonCount(BEGINNER_COURSE_SECTIONS);
    return { current, max };
  };

  return (
    <div>
      <Topbar pageTitle='マイページ' />
      
      <div className={style.container}>

        <h1 className={style.title}>マイページ</h1>

        <p>ここまでにクリアした講座の一覧です！</p>

        <p>新歓講座としてはStep3までのクリアを目標にしてみよう</p>

        {(() => {
          const step3Progress = getStep3Progress();
          return (
            <ProgressBar
              current={step3Progress.current}
              max={step3Progress.max}
              label="STM32講座進捗（新歓講座）"
            />
          );
        })()}

        {(() => {
          const totalProgress = getTotalProgress();
          return (
            <ProgressBar
              current={totalProgress.current}
              max={totalProgress.max}
              label="全体進捗"
            />
          );
        })()}

        <div className={style.progressGrid}>
          {SECTIONS.slice(0, ACTIVE_SECTIONS).map((section) => (
            <ProgressCircle
              key={section.id}
              label={section.name}
              current={getProgressValue(section.id)}
              max={section.lessonCount}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
