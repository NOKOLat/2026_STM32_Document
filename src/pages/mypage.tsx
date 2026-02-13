import { useEffect, useState } from 'react';
import Topbar from '../layouts/Topbar';
import Footer from '../layouts/Footer';
import ProgressBar from '../components/ProgressBar';
import ProgressCircle from '../components/ProgressCircle';
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

const SECTION_LENGTHS = [
  { id: 1, name: 'Section 1', max: 4 },
  { id: 2, name: 'Section 2', max: 4 },
  { id: 3, name: 'Section 3', max: 5 },
  { id: 4, name: 'Section 4', max: 3 },
  { id: 5, name: 'Section 5', max: 7 },
  { id: 6, name: 'Section 6', max: 8 },
];

// ビット列から1の個数をカウントする関数
const countCompletedLessons = (bitmask: number): number => {
  let count = 0;
  while (bitmask > 0) {
    count += bitmask & 1;
    bitmask >>= 1;
  }
  return count;
};

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
    const key = `section${sectionId}`;
    const bitmask = progressData[key] || 0;
    // ビット列から完了した講座の数をカウント
    return countCompletedLessons(bitmask);
  };

  // 全体の進捗を計算
  const getTotalProgress = (): { current: number; max: number } => {
    let totalCurrent = 0;
    let totalMax = 0;

    SECTION_LENGTHS.forEach((section) => {
      totalCurrent += getProgressValue(section.id);
      totalMax += section.max;
    });

    return { current: totalCurrent, max: totalMax };
  };

  // Step3までの進捗を計算
  const getStep3Progress = (): { current: number; max: number } => {
    let totalCurrent = 0;
    let totalMax = 0;

    SECTION_LENGTHS.slice(0, 3).forEach((section) => {
      totalCurrent += getProgressValue(section.id);
      totalMax += section.max;
    });

    return { current: totalCurrent, max: totalMax };
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
          {SECTION_LENGTHS.map((section) => (
            <ProgressCircle
              key={section.id}
              label={section.name}
              current={getProgressValue(section.id)}
              max={section.max}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
