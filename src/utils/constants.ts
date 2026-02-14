/**
 * コース構造定数定義
 * 全てのセクションのレッスン数を定義
 */

export interface SectionConfig {
  id: number;
  name: string;
  lessonCount: number;
}

/**
 * 全セクションの設定
 * Step 1-7までのレッスン数を定義
 */
export const SECTIONS: readonly SectionConfig[] = [
  { id: 1, name: 'Step 1', lessonCount: 4 },
  { id: 2, name: 'Step 2', lessonCount: 4 },
  { id: 3, name: 'Step 3', lessonCount: 5 },
  { id: 4, name: 'Step 4', lessonCount: 3 },
  { id: 5, name: 'Step 5', lessonCount: 7 },
  { id: 6, name: 'Step 6', lessonCount: 8 },
  { id: 7, name: 'Step 7', lessonCount: 6 },
] as const;

/**
 * 新歓講座の範囲（Step 1-3）
 */
export const BEGINNER_COURSE_SECTIONS = 3;

/**
 * 現在有効なセクション数（Step 1-6）
 */
export const ACTIVE_SECTIONS = 6;

/**
 * 総レッスン数を計算
 * @param upToSection 指定したセクションまでの合計（デフォルト: 全て）
 */
export function getTotalLessonCount(upToSection?: number): number {
  const sections = upToSection
    ? SECTIONS.slice(0, upToSection)
    : SECTIONS.slice(0, ACTIVE_SECTIONS);
  return sections.reduce((sum, section) => sum + section.lessonCount, 0);
}
