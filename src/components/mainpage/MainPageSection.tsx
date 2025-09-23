import style from '../../pages/MainPage.module.css';

export default function MainPageSection({
	title,
	children
}: {
	title: string,
	children?: React.ReactNode
}) {
	return (
		<section className={style.sectionblock}>
			<h2>{title}</h2>
			{children}
		</section>
	)
}