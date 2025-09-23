// src/Documents/assets/ComplateButton.tsx
// 各ページの終了ボタンのコンポーネント
// GASなどへの通信もここで実装する
// ログインしていない場合は、ボタンを押せないようにする

import styles from './ComplateButton.module.css';

export default function PageButton({section, page_number }: {section: string, page_number: number }) {


    function handleClick() {

        let message = `Page${page_number}の結果を送信します。\n終了まで5秒程度お待ちください。`;
        alert(message);
    }

    // ログインしていない場合
    if(localStorage.getItem('isLoggedIn') !== 'true') {

        return (

            <div>

                <br />
                <p> ログインすることでボタンが押せるようになります</p>

            </div>
        );
    }
    // ログインしている場合
    else{
        
        return (
            <div>
                <br />
                <button className={styles.button} onClick={handleClick}>
                    終了報告を送信
                </button>

            </div>
        )

    }
}