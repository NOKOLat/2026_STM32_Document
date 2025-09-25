/* Header.tsx 
    講座名やタイトルを表示を受け取り、表示するためのコンポーネント
*/

import styles from './Header.module.css';

export default function Header({ page_count, title }: { page_count: string, title: string }) {

    return (
        <div className={styles.root}>

            <div className={styles.container}>

                <br />

                <h2 className={styles.title}> {page_count}{title}</h2>

                <br />
                
            </div>
        </div>
    );
}
