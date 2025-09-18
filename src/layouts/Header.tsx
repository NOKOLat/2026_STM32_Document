/* Header.tsx 
    講座名やタイトルを表示を受け取り、表示するためのコンポーネント
*/

import styles from './Header.module.css';

export default function Header({ type, number, title }: { type: string, number: string, title: string }) {
    return (
        <div className={styles.root}>

            <div className={styles.container}>

                <br />

                <p className={styles.description}>STM32講座 {type} {number}</p>

                <h2 className={styles.title}>{title}</h2>

                <br />

            </div>
        </div>
    );
}
