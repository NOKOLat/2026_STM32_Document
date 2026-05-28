import { ACTIVE_COURSE_SECTIONS, COURSE_SECTIONS } from '../features/course/courseData';

export interface SectionConfig {
  id: number;
  name: string;
  lessonCount: number;
}

export const SECTIONS: readonly SectionConfig[] = COURSE_SECTIONS.map(section => ({
  id: section.id,
  name: section.label,
  lessonCount: section.lessons.length
}));

export const BEGINNER_COURSE_SECTIONS = 3;

export const ACTIVE_SECTIONS = ACTIVE_COURSE_SECTIONS.length;

export function getTotalLessonCount(upToSection?: number): number {
  const sections = upToSection
    ? SECTIONS.slice(0, upToSection)
    : SECTIONS.slice(0, ACTIVE_SECTIONS);
  return sections.reduce((sum, section) => sum + section.lessonCount, 0);
}
