import styles from './NotFound.module.css'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    function onClickNavigate() {

        navigate('/login');
    }
    
    return (
        <div className={styles.container}>
        <h1>こんなページはないよ</h1>
        <p>どうやってここに来たのかな</p>
        <p>頼むからバグを見つけないでください!!!!!!</p>

        <button onClick={onClickNavigate}>ログインページへ戻る</button>
        </div>
    )
}
