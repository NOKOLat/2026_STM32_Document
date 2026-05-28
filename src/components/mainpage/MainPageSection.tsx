import { useMemo, type ReactNode } from 'react';
import { useProgress } from '../../features/progress/useProgress';
import { getLessonId } from '../../features/course/courseProgress';
import { isLessonCompletedById } from '../../features/progress/selectors';
import style from '../mainpage/MainPageSection.module.css';

export default function MainPageSection({title, section_number, page_count, children}: {title: string, section_number?: number, page_count?: number, children?: ReactNode}) {
	const progressData = useProgress();

	const isComplete = useMemo(() => {
		if (typeof section_number !== 'number' || typeof page_count !== 'number') {
			return false;
		}

		const requiredLessonIds: string[] = [];
		for (let page = 1; page <= page_count; page++) {
			const lesson_id = getLessonId(section_number, page);
			if (lesson_id) {
				requiredLessonIds.push(lesson_id);
			}
		}

		return requiredLessonIds.every(lesson_id =>
			isLessonCompletedById(progressData, lesson_id)
		);
	}, [progressData, section_number, page_count]);

	const classes = `${style.sectionblock} ${isComplete ? style.sectionActive : ''}`.trim();

	return (
		<section className={classes}>
			<h2>{title}</h2>
			{children}
		</section>
	)
}
