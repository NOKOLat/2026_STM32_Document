/**
 * 進捗計算ユーティリティ
 * ビットマスク処理とlesson_id変換ロジック
 */

import { SECTIONS } from './constants';

/**
 * ビットマスクから完了したレッスン数をカウント
 * ビット列の1の個数を数える（Brian Kernighanのアルゴリズム）
 *
 * @param bitmask - 進捗を表すビットマスク
 * @returns 完了したレッスンの数
 *
 * @example
 * countCompletedLessons(0b1011) // => 3 (ビット1が3個)
 * countCompletedLessons(15)     // => 4 (0b1111 = ビット1が4個)
 */
export function countCompletedLessons(bitmask: number): number {
  let count = 0;
  while (bitmask > 0) {
    count += bitmask & 1;
    bitmask >>= 1;
  }
  return count;
}

/**
 * section と page_number から lesson_id を計算
 * ハードコードされたマッピングを削除し、計算で導出
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
 * 進捗データから指定範囲の完了レッスン数を計算
 *
 * @param progressData - セクションごとの進捗ビットマスク
 * @param startSection - 開始セクション（含む）
 * @param endSection - 終了セクション（含む）
 * @returns 完了レッスン数
 */
export function calculateCompletedLessons(
  progressData: Record<string, number | undefined>,
  startSection: number = 1,
  endSection: number = 6
): number {
  let completed = 0;

  for (let i = startSection; i <= endSection; i++) {
    const bitmask = progressData[`section${i}`] || 0;
    completed += countCompletedLessons(bitmask);
  }

  return completed;
}
