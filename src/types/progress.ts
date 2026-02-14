/**
 * 進捗データの型定義
 * サーバーAPIのレスポンスとlocalStorageの両方で使用
 */

export interface ProgressItem {
  lesson_id: string;
  is_completed: number; // 0 or 1
  completed_at: string | null;
}

export type ProgressData = ProgressItem[];
