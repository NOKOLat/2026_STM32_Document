import { useEffect, useState } from 'react';
import { getLessonId } from '../../utils/progressUtils';
import type { ProgressItem } from '../../types/progress';
import style from '../mainpage/MainPageSection.module.css';

export default function MainPageSection({title, section_number, page_count, children}: {title: string, section_number?: number, page_count?: number, children?: React.ReactNode}) {
	const [isComplete, setIsComplete] = useState(false);

	useEffect(function effect() {
		// section_number と page_count が両方与えられているときのみ進捗判定を行う
		if (typeof section_number !== 'number' || typeof page_count !== 'number') {
			setIsComplete(false);
			return;
		}

		const sectionNum = section_number;
		const pageCount = page_count;

		function checkCompletion() {
			try {
				const raw = localStorage.getItem('progressData');
				if (!raw) {
					setIsComplete(false);
					return;
				}

				const progressData: ProgressItem[] = JSON.parse(raw);

				// このセクションの全レッスンIDを生成
				const requiredLessonIds: string[] = [];
				for (let page = 1; page <= pageCount; page++) {
					const lesson_id = getLessonId(sectionNum, page);
					if (lesson_id) {
						requiredLessonIds.push(lesson_id);
					}
				}

				// 全レッスンが完了しているかチェック
				const allCompleted = requiredLessonIds.every(lesson_id => {
					const lesson = progressData.find(item => item.lesson_id === lesson_id);
					return lesson?.is_completed === 1;
				});

				setIsComplete(allCompleted);
			} catch (e) {
				console.error('Error checking section completion:', e);
				setIsComplete(false);
			}
		}

		// 初回チェック
		checkCompletion();

		// progressUpdated イベントをリッスン
		const handler = () => checkCompletion();
		window.addEventListener('progressUpdated', handler);

		return () => {
			window.removeEventListener('progressUpdated', handler);
		};

	}, [section_number, page_count]);


	// CSSクラスを組み立てる
	// 完了しているかどうかで変える
	const classes = `${style.sectionblock} ${isComplete ? style.sectionActive : ''}`.trim();

	return (
		<section className={classes}>
			<h2>{title}</h2>
			{children}
		</section>
	)
}
