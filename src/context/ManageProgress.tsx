/* eslint-disable react-refresh/only-export-components */
// ManageProgress.tsx
// 進捗管理の実装
// コース・進捗エンドポイント: https://stm32document.s241507v.workers.dev/

import { RefreshToken } from './AuthContext';
import { getLessonId } from '../utils/progressUtils';

const COURSE_API_URL = 'https://stm32document.s241507v.workers.dev';

// 進捗を更新
export async function UpDateProgress(
  section: number,
  page_number: number
): Promise<boolean> {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.warn('No access token');
    return false;
  }

  // lesson_id を取得
  const lesson_id = getLessonId(section, page_number);

  if (!lesson_id) {
    console.error(
      `Invalid lesson: section=${section}, page=${page_number}`
    );
    return false;
  }

  try {
    const response = await fetch(`${COURSE_API_URL}/progress/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ lesson_id })
    });

    if (!response.ok) {
      if (response.status === 401) {
        // トークン期限切れ → 更新を試みる
        const refreshed = await RefreshToken();
        if (refreshed) {
          // 再試行
          return UpDateProgress(section, page_number);
        }
      }
      console.warn('Progress update failed:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('Progress updated:', data);
    return true;
  } catch (error) {
    console.error('UpDateProgress failed:', error);
    return false;
  }
}
// 進捗を取得
export async function GetProgress(): Promise<
  Array<{
    lesson_id: string;
    is_completed: number;
    completed_at: string | null;
  }> | null
> {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');

  if (!accessToken || !userId) {
    console.warn('No access token or userId');
    return null;
  }

  try {
    const response = await fetch(`${COURSE_API_URL}/progress/${userId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await RefreshToken();
        if (refreshed) {
          return GetProgress(); // 再試行
        }
      }
      console.warn('GetProgress failed:', response.status);
      return null;
    }

    const data = await response.json();

    // localStorage に進捗データを保存（新形式のみ）
    localStorage.setItem('progressData', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('GetProgress failed:', error);
    return null;
  }
}

// ユーティリティ: section + page_number からクリア状態を判定
export function isLessonCompleted(
  section: number,
  page_number: number
): boolean {
  const lesson_id = getLessonId(section, page_number);
  if (!lesson_id) return false;

  const progressData = localStorage.getItem('progressData');
  if (!progressData) return false;

  try {
    const data = JSON.parse(progressData);
    const lesson = data.find(
      (item: { lesson_id: string; is_completed: number }) =>
        item.lesson_id === lesson_id
    );
    return lesson?.is_completed === 1;
  } catch {
    return false;
  }
}