import { useEffect, useState } from 'react';
import type { ProgressData } from './types';
import { subscribeProgressUpdated } from './events';
import { readProgressData } from './storage';

// 進捗データを取得するカスタムフック
export function useProgress(): ProgressData {
  const [progressData, setProgressData] = useState<ProgressData>(() =>
    readProgressData()
  );

  useEffect(() => {
    const loadProgress = () => {
      setProgressData(readProgressData());
    };

    loadProgress();
    return subscribeProgressUpdated(loadProgress);
  }, []);

  return progressData;
}
