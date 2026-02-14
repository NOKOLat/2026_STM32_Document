import { useEffect, useState, useMemo, useCallback } from 'react';
import Topbar from '../layouts/Topbar';
import Footer from '../layouts/Footer';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
import {
  SECTIONS,
  ACTIVE_SECTIONS,
  getTotalLessonCount,
  BEGINNER_COURSE_SECTIONS,
  countCompletedLessons,
  calculateCompletedLessons
} from '../utils';
import type { ProgressItem } from '../types/progress';
import style from './mypage.module.css';

export default function MyPage() {
  const [progressData, setProgressData] = useState<ProgressItem[]>([]);

  useEffect(() => {
    // localStorage から progressData を読み込む
    const loadProgress = () => {
      try {
        const raw = localStorage.getItem('progressData');
        if (raw) {
          const data: ProgressItem[] = JSON.parse(raw);
          setProgressData(data);
        } else {
          setProgressData([]);
        }
      } catch (e) {
        console.error('Failed to load progress data:', e);
        setProgressData([]);
      }
    };

    loadProgress();

    // progressUpdated イベントをリッスンして更新
    window.addEventListener('progressUpdated', loadProgress);

    return () => {
      window.removeEventListener('progressUpdated', loadProgress);
    };
  }, []);

  // セクション単位の完了レッスン数を取得（メモ化）
  const getProgressValue = useCallback((sectionId: number): number => {
    return countCompletedLessons(progressData, sectionId);
  }, [progressData]);

  // 全体の進捗を計算（メモ化）
  const totalProgress = useMemo(() => {
    const current = calculateCompletedLessons(progressData, 1, ACTIVE_SECTIONS);
    const max = getTotalLessonCount(ACTIVE_SECTIONS);
    return { current, max };
  }, [progressData]);

  // Step3までの進捗を計算（メモ化）
  const step3Progress = useMemo(() => {
    const current = calculateCompletedLessons(progressData, 1, BEGINNER_COURSE_SECTIONS);
    const max = getTotalLessonCount(BEGINNER_COURSE_SECTIONS);
    return { current, max };
  }, [progressData]);

  return (
    <div>
      <Topbar pageTitle='マイページ' />

      <div className={style.container}>

        <h1 className={style.title}>マイページ</h1>

        <p>ここまでにクリアした講座の一覧です！</p>

        <p>新歓講座としてはStep3までのクリアを目標にしてみよう</p>

        <ProgressBar
          current={step3Progress.current}
          max={step3Progress.max}
          label="STM32講座進捗（新歓講座）"
        />

        <ProgressBar
          current={totalProgress.current}
          max={totalProgress.max}
          label="全体進捗"
        />

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
