import { useEffect, useState } from 'react';
import style from '../mainpage/MainPageSection.module.css';

export default function MainPageSection({title, section_number, page_count, children}: {title: string, section_number?: number, page_count?: number, children?: React.ReactNode}) {
	const [isComplete, setIsComplete] = useState(false);

	useEffect(function effect() {

		// section_number と page_count が両方与えられているときのみ進捗判定を行う
		if (typeof section_number !== 'number' || typeof page_count !== 'number') {

			setIsComplete(false);
			return;
		}

		var complete_value = 0;
		if (page_count > 0) {

			complete_value = Math.pow(2, page_count) - 1;
		} 
		else {

			complete_value = 0;
		}

		function updateFromStorageValue(raw: string | null) {

			var val = 0;
			if (raw) {

				val = parseInt(raw, 10);
			} 
			else {

				val = 0;
			}
			setIsComplete(val === complete_value);
		}

		// 初回チェック
		updateFromStorageValue(localStorage.getItem('section' + section_number));

	}, [section_number, page_count]);


	// CSSクラスを組み立てる
	// 完了しているかどうかで変える
	var classes = style.sectionblock;
	if (isComplete) {

		classes = classes + ' ' + style.sectionActive;
	} 
	else {

		classes = classes + '';
	}

	classes = classes.trim();

	return (
		<section className={classes}>
			<h2>{title}</h2>
			{children}
		</section>
	)
}