// 進捗API
// コース・進捗エンドポイント: https://stm32document.s241507v.workers.dev/

import { RefreshToken } from './authApi';
import { getLessonId } from '../course/courseProgress';
import { isLessonCompletedById } from '../progress/progressSelectors';
import { readProgressData, saveProgressData } from '../progress/progressStorage';

const COURSE_API_URL = 'https://stm32document.s241507v.workers.dev';

// 進捗更新用の処理
// section: 講座のセクション番号（例: 1, 2, 3）
// page_number: セクション内のページ番号（例: 1, 2, 3...）
export async function UpDateProgress(
  section: number,
  page_number: number
): Promise<boolean> {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    console.warn('No access token');
    return false;
  }

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

        const refreshed = await RefreshToken();

        if (refreshed) {

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

// 進捗データの取得
// 戻り値の型は、lesson_id（例: "1-2"）とis_completed（0または1）を含むオブジェクトの配列
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
          return GetProgress();
        }
      }
      console.warn('GetProgress failed:', response.status);
      return null;
    }

    const data = await response.json();
    saveProgressData(data);

    return data;
  } catch (error) {
    console.error('GetProgress failed:', error);
    return null;
  }
}

// 進捗データから特定のレッスンが完了しているかを判定する関数
export function isLessonCompleted(
  section: number,
  page_number: number
): boolean {
  const lesson_id = getLessonId(section, page_number);
  if (!lesson_id) return false;

  return isLessonCompletedById(readProgressData(), lesson_id);
}
