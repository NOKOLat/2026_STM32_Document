import { SECTIONS } from '../../shared/constants';

// レッスンIDからセクションとページ番号を取得する関数
export function getSectionPageFromLessonId(
  lessonId: string
): { section: number; page: number } | null {
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

// セクションとページ番号からレッスンIDを生成する関数
export function getLessonId(section: number, pageNumber: number): string {
  if (section < 1 || section > SECTIONS.length) {
    console.error(`Invalid section: ${section}`);
    return '';
  }

  const sectionConfig = SECTIONS[section - 1];
  if (pageNumber < 1 || pageNumber > sectionConfig.lessonCount) {
    console.error(`Invalid page number: ${pageNumber} for section ${section}`);
    return '';
  }

  let lessonId = 0;
  for (let i = 0; i < section - 1; i++) {
    lessonId += SECTIONS[i].lessonCount;
  }
  lessonId += pageNumber;

  return String(lessonId);
}
