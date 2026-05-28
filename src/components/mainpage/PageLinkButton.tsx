import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useProgress } from '../../features/progress/useProgress';
import { getLessonId } from '../../features/course/courseProgress';
import { isLessonCompletedById } from '../../features/progress/selectors';
import style from './PageLinkButton.module.css';

export default function PageLinkButton({section, number, link, title}: {section: number, number: number, link: string, title: string}) {
    const progressData = useProgress();

    const checked = useMemo(() => {
        const lesson_id = getLessonId(section, number);
        if (!lesson_id) return false;

        return isLessonCompletedById(progressData, lesson_id);
    }, [progressData, section, number]);

    return (
        <div className={style.container}>
            <Link to={link} className={style.item} aria-label={`section ${section} lesson ${number} link`}>
                {/* checkbox is visually displayed but non-interactive; whole item is clickable */}
                <input
                    type="checkbox"
                    className={style.checkbox}
                    checked={checked}
                    readOnly
                    aria-hidden={true}
                />

                <span className={style.title}>{title}</span>
            </Link>
        </div>
    )
}
