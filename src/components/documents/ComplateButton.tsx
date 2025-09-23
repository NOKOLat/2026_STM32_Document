// src/Documents/assets/ComplateButton.tsx
// 各ページの終了ボタンのコンポーネント
// GASなどへの通信もここで実装する
// ログインしていない場合は、ボタンを押せないようにする

import styles from './ComplateButton.module.css';
import { UpDateProgress } from '../../context/ManageProgress';


export default function PageButton({section, page_number }: {section: number, page_number: number }) {


    async function handleClick() {

        let message = `結果を送信します。\n終了まで5秒程度お待ちください。`;
        alert(message);

        // 進捗を更新（section は数値に変換して渡す）
        const sec = Number(section);
        try {

            await UpDateProgress(sec, page_number);
        } 
        catch (_) {

            // 通信失敗しても既存挙動を崩さない（最小実装）
        }

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