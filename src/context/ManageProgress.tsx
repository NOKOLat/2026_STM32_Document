/* eslint-disable react-refresh/only-export-components */
// ManageProgress.tsx
// 進捗管理の実装
// コース・進捗エンドポイント: https://stm32document.s241507v.workers.dev/

import { RefreshToken } from './AuthContext';

const COURSE_API_URL = 'https://stm32document.s241507v.workers.dev';

// lesson_id への変換関数
function getLessonId(section: number, page_number: number): string {
  const lessonMap: Record<string, string> = {
    '1_1': '1',
    '1_2': '2',
    '1_3': '3',
    '1_4': '4',
    '2_1': '5',
    '2_2': '6',
    '2_3': '7',
    '2_4': '8',
    '3_1': '9',
    '3_2': '10',
    '3_3': '11',
    '3_4': '12',
    '3_5': '13',
    '4_1': '14',
    '4_2': '15',
    '4_3': '16',
    '5_1': '17',
    '5_2': '18',
    '5_3': '19',
    '5_4': '20',
    '5_5': '21',
    '5_6': '22',
    '5_7': '23',
    '6_1': '24',
    '6_2': '25',
    '6_3': '26',
    '6_4': '27',
    '6_5': '28',
    '6_6': '29',
    '6_7': '30',
    '6_8': '31',
    '7_1': '32',
    '7_2': '33',
    '7_3': '34',
    '7_4': '35',
    '7_5': '36',
    '7_6': '37'
  };

  return lessonMap[`${section}_${page_number}`] || '';
}

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

// lesson_id から section と page_number を逆変換する関数
function getSectionPageFromLessonId(lesson_id: string): { section: number; page: number } | null {
  const id = parseInt(lesson_id, 10);

  if (id >= 1 && id <= 4) return { section: 1, page: id };
  if (id >= 5 && id <= 8) return { section: 2, page: id - 4 };
  if (id >= 9 && id <= 13) return { section: 3, page: id - 8 };
  if (id >= 14 && id <= 16) return { section: 4, page: id - 13 };
  if (id >= 17 && id <= 23) return { section: 5, page: id - 16 };
  if (id >= 24 && id <= 31) return { section: 6, page: id - 23 };
  if (id >= 32 && id <= 37) return { section: 7, page: id - 31 };

  return null;
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

    // localStorage に進捗データを保存
    localStorage.setItem('progressData', JSON.stringify(data));

    // 古い形式（sectionN）にも変換して保存（既存 UI との互換性）
    const sectionProgress: Record<string, number> = {};
    for (let s = 1; s <= 7; s++) {
      sectionProgress[`section${s}`] = 0;
    }

    data.forEach((item: { lesson_id: string; is_completed: number }) => {
      const sp = getSectionPageFromLessonId(item.lesson_id);
      if (sp && item.is_completed === 1) {
        const key = `section${sp.section}`;
        sectionProgress[key] |= (1 << (sp.page - 1));
      }
    });

    // 古い形式を localStorage に保存
    Object.entries(sectionProgress).forEach(([key, value]) => {
      localStorage.setItem(key, String(value));
    });

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