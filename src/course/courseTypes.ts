export interface CourseLesson {
  number: number;
  title: string;
  path: string;
}

export interface CourseSection {
  id: number;
  label: string;
  title: string;
  description: string[];
  lessons: CourseLesson[];
}
