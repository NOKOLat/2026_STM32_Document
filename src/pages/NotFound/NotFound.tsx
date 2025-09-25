import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
    
    return (
        <div className={styles.container}>
        <h1>こんなページはないよ</h1>
        <p>どうやってここに来たのかな</p>
        <p>頼むからバグを見つけないでください!!!!!!</p>

        <p><Link to="/">ログインページへ戻る</Link></p>
        </div>
    )
}
