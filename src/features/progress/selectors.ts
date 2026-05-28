import type { ProgressItem } from './types';
import { getSectionPageFromLessonId } from '../course/courseProgress';

// 進捗データから完了したレッスンIDのリストを取得する関数
export function getCompletedLessonIds(
  progressData: ProgressItem[],
  section?: number
): string[] {
  return progressData
    .filter(item => {
      if (item.is_completed !== 1) return false;
      if (!section) return true;

      const sp = getSectionPageFromLessonId(item.lesson_id);
      return sp?.section === section;
    })
    .map(item => item.lesson_id);
}

// 進捗データから完了したレッスンの数をカウントする関数
export function countCompletedLessons(
  progressData: ProgressItem[],
  section?: number
): number {
  return getCompletedLessonIds(progressData, section).length;
}

// レッスンIDが完了しているかを判定する関数
export function isLessonCompletedById(
  progressData: ProgressItem[],
  lesson_id: string
): boolean {
  const lesson = progressData.find(item => item.lesson_id === lesson_id);
  return lesson?.is_completed === 1;
}

// セクション範囲内で完了したレッスンの数を計算する関数
export function calculateCompletedLessons(
  progressData: ProgressItem[],
  startSection: number = 1,
  endSection: number = 6
): number {
  return progressData.filter(item => {
    if (item.is_completed !== 1) return false;

    const sp = getSectionPageFromLessonId(item.lesson_id);
    if (!sp) return false;

    return sp.section >= startSection && sp.section <= endSection;
  }).length;
}
