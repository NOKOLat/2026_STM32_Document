/* Footer.tsx
    フッター部分のコンポーネント
*/

import styles from './Footer.module.css';

export default function Footer() {

    // 今年の年を取得
    const year = new Date().getFullYear();

    // 著作権表示のテキストを作成
    const copyrightText = `© ${year} NokoLAT All rights reserved.`;


    return (

        <div className={styles.root}>

            <div className={styles.container}>

                <br />

                <p className={styles.description}>{copyrightText}</p>

                <br />

            </div>
        </div>
    );
}
