import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import style from './PageLinkButton.module.css';

export default function PageLinkButton({section, number, link, title}: {section: number, number: number, link: string, title: string}) {
    const [checked, setChecked] = useState(false);

    // Assumption: localStorage key is `section${section}` and value is a number (bitmask).
    // The bit index `number` is treated as 0-based (LSB = bit 0). If value is missing or invalid, treat as 0.
    function readCheckedFromStorage() {
        try {
            const key = `section${section}`;
            const raw = localStorage.getItem(key);
            let val = 0;
            if (raw != null) {
                val = parseInt(raw, 10);
            }

            let num = 0;
            if (Number.isFinite(val)) {
                num = val;
            }

            const bit = (num >> (number - 1)) & 1;
            setChecked(bit === 1);
        } catch (e) {
            setChecked(false);
        }
    }

    useEffect(function effect() {

        readCheckedFromStorage();

        // カスタムイベントで進捗が更新されたときに再読み込みする
        const handler = (_e: Event) => {
            // イベントが来たら最新の localStorage を読み込む
            readCheckedFromStorage();
        };

        window.addEventListener('progressUpdated', handler as EventListener);

        return () => {
            window.removeEventListener('progressUpdated', handler as EventListener);
        };

    }, [section, number]);

    return (
        <div className={style.container}>
            <Link to={link} className={style.item} aria-label={`section ${section} bit ${number} link`}>
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