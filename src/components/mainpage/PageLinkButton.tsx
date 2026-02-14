import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getLessonId } from '../../utils/progressUtils';
import type { ProgressItem } from '../../types/progress';
import style from './PageLinkButton.module.css';

export default function PageLinkButton({section, number, link, title}: {section: number, number: number, link: string, title: string}) {
    const [checked, setChecked] = useState(false);

    function readCheckedFromStorage() {
        try {
            const raw = localStorage.getItem('progressData');
            if (!raw) {
                setChecked(false);
                return;
            }

            const progressData: ProgressItem[] = JSON.parse(raw);
            const lesson_id = getLessonId(section, number);

            if (!lesson_id) {
                setChecked(false);
                return;
            }

            const lesson = progressData.find(item => item.lesson_id === lesson_id);
            setChecked(lesson?.is_completed === 1);
        } catch (e) {
            console.error('Error reading progress:', e);
            setChecked(false);
        }
    }

    useEffect(function effect() {
        readCheckedFromStorage();

        // カスタムイベントで進捗が更新されたときに再読み込みする
        const handler = (_e: Event) => {
            readCheckedFromStorage();
        };

        window.addEventListener('progressUpdated', handler as EventListener);

        return () => {
            window.removeEventListener('progressUpdated', handler as EventListener);
        };

    }, [section, number]);

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
