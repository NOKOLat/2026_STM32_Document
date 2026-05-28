import type { ProgressData } from './types';

const PROGRESS_STORAGE_KEY = 'progressData';

// 進捗データをローカルストレージから読み込む関数
export function readProgressData(): ProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return [];

    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Failed to load progress data:', e);
    return [];
  }
}

export function saveProgressData(progressData: ProgressData): void {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
}
