import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Topbar.module.css';
import { Logout } from '../context/AuthContext';
import githubMark from '../assets/github-mark-white.png';

export default function Topbar({ pageTitle = "" }: { pageTitle: string }) {

    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const name = localStorage.getItem('username');
            setUsername(name);
        } catch (e) {
            setUsername(null);
        }
    }, []);

    const handleLogout = () => {
        Logout();
        navigate('/');
    };

    const handleMyPageClick = () => {
        navigate('/mypage');
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>

                {/* 左側のセクション */}
                <div className={styles.left}>

                    <Link to="/mainpage" className={styles.brandButton}>
                        STM32Document
                    </Link>

                </div>

                {/* 中央のセクション */}
                <div className={styles.center}>

                    <span className={styles.title}>{pageTitle}</span>

                </div>

                {/* 右側のセクション */}
                <div className={styles.right}>


                    <a className={styles.iconLink} href="https://github.com/NOKOLat/2026_STM32_Document" aria-label="GitHub">
                        <img src={githubMark} alt="GitHub" className={styles.iconImg} />
                    </a>

                    <button className={styles.bugButton} onClick={() => { navigate('/report-bug'); }}>
                        バグ報告
                    </button>

                    <button className={styles.userButton} onClick={handleMyPageClick}>
                        {username ?? 'ゲスト'} さん
                    </button>

                    <button className={styles.logout} onClick={handleLogout}>ログアウト</button>

                </div>

            </div>
        </div>
    );
}
