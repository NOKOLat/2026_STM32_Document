/**
 * 進捗計算ユーティリティ
 * lesson_id配列ベースの進捗管理（ビットマスクは使用しない）
 */

import { SECTIONS } from './constants';
import type { ProgressItem } from '../types/progress';

/**
 * lesson_id から section と page_number を逆算
 *
 * @param lessonId - レッスンID文字列
 * @returns section と page のオブジェクト、無効な場合はnull
 *
 * @example
 * getSectionPageFromLessonId("1")  // => { section: 1, page: 1 }
 * getSectionPageFromLessonId("5")  // => { section: 2, page: 1 }
 * getSectionPageFromLessonId("13") // => { section: 3, page: 5 }
 */
export function getSectionPageFromLessonId(lessonId: string): { section: number; page: number } | null {
  const id = parseInt(lessonId, 10);

  if (isNaN(id) || id < 1) {
    return null;
  }

  let cumulativeCount = 0;

  for (let i = 0; i < SECTIONS.length; i++) {
    const sectionConfig = SECTIONS[i];
    const nextCumulative = cumulativeCount + sectionConfig.lessonCount;

    if (id <= nextCumulative) {
      return {
        section: sectionConfig.id,
        page: id - cumulativeCount
      };
    }

    cumulativeCount = nextCumulative;
  }

  return null;
}

/**
 * section と page_number から lesson_id を計算
 *
 * @param section - セクション番号 (1-7)
 * @param pageNumber - ページ番号 (1-n)
 * @returns lesson_id文字列、無効な場合は空文字列
 *
 * @example
 * getLessonId(1, 1) // => "1"
 * getLessonId(2, 1) // => "5" (Step1の4レッスン + 1)
 * getLessonId(3, 5) // => "13" (Step1の4 + Step2の4 + 5)
 */
export function getLessonId(section: number, pageNumber: number): string {
  // バリデーション
  if (section < 1 || section > SECTIONS.length) {
    console.error(`Invalid section: ${section}`);
    return '';
  }

  const sectionConfig = SECTIONS[section - 1];
  if (pageNumber < 1 || pageNumber > sectionConfig.lessonCount) {
    console.error(`Invalid page number: ${pageNumber} for section ${section}`);
    return '';
  }

  // 前のセクションまでのレッスン数を累積
  let lessonId = 0;
  for (let i = 0; i < section - 1; i++) {
    lessonId += SECTIONS[i].lessonCount;
  }
  lessonId += pageNumber;

  return String(lessonId);
}

/**
 * 指定セクションの完了済みlesson_idを取得
 *
 * @param progressData - 進捗データ配列
 * @param section - セクション番号（省略時は全セクション）
 * @returns 完了済みlesson_idの配列
 *
 * @example
 * getCompletedLessonIds(progressData, 1) // => ["1", "2", "4"]
 */
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

/**
 * 完了したレッスン数をカウント（配列ベース）
 *
 * @param progressData - 進捗データ配列
 * @param section - セクション番号（省略時は全完了数）
 * @returns 完了レッスン数
 *
 * @example
 * countCompletedLessons(progressData) // => 10
 * countCompletedLessons(progressData, 1) // => 4
 */
export function countCompletedLessons(
  progressData: ProgressItem[],
  section?: number
): number {
  return getCompletedLessonIds(progressData, section).length;
}

/**
 * 指定lesson_idが完了済みかチェック
 *
 * @param progressData - 進捗データ配列
 * @param lesson_id - レッスンID
 * @returns 完了していればtrue
 *
 * @example
 * isLessonCompletedById(progressData, "1") // => true
 */
export function isLessonCompletedById(
  progressData: ProgressItem[],
  lesson_id: string
): boolean {
  const lesson = progressData.find(item => item.lesson_id === lesson_id);
  return lesson?.is_completed === 1;
}

/**
 * セクション範囲の完了レッスン数を計算
 *
 * @param progressData - 進捗データ配列
 * @param startSection - 開始セクション（含む）
 * @param endSection - 終了セクション（含む）
 * @returns 完了レッスン数
 *
 * @example
 * calculateCompletedLessons(progressData, 1, 3) // => Step1-3の完了数
 */
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
