// src/Documents/assets/ComplateButton.tsx
// 各ページの終了ボタンのコンポーネント
// GASなどへの通信もここで実装する
// ログインしていない場合は、ボタンを押せないようにする

import styles from './ComplateButton.module.css';
import { UpDateProgress, GetProgress } from '../../context/ManageProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function PageButton({section, page_number }: {section: number, page_number: number }) {

    const [loading, setLoading] = useState(false);
    const [complated, setComplated] = useState(false);

    async function handleClick() {

        // オーバーレイを表示（メッセージを引数で渡す）
        showOverlay('クリアおめでとう！！！ <br />メインページへ戻ります');

        // 進捗を更新（section は数値に変換して渡す）
        const sec = Number(section);
        try {

            setLoading(true);
            await UpDateProgress(sec, page_number);
        } 
        catch (e) {

            console.error(e);
            alert('送信に失敗しました。');
        } 
        finally {
            
            // ローディング終了とオーバーレイ非表示
            setLoading(false);

            // 進捗を取得
            await GetProgress();


            navigate('/mainpage');
            hideOverlay();

        }
    }

    // react-router の navigate フックを使う
    const navigate = useNavigate();

    // すでにボタンが押されているかを判定
    // ローカルストレージを参照して、指定ビットが1であるか確認する
    useEffect(function effect() {

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

            const bit = (num >> (page_number - 1)) & 1;
            setComplated(bit === 1);
        }
        catch (e) {

            setComplated(false);
        }
    }, [section, page_number]);
    

    // オーバーレイ表示関数（メッセージを引数で受け取る）
    function showOverlay(message: string) {

        const overlay = document.createElement('div');
        overlay.id = 'complate-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.4)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.innerHTML = `<div style="background:#fff;padding:20px;border-radius:8px;color:#000;">${message}</div>`;
        document.body.appendChild(overlay);
        return overlay;
    }

    // オーバーレイ非表示関数
    function hideOverlay() {

        const el = document.getElementById('complate-overlay');
        if (el) document.body.removeChild(el);
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
    // ログインしているかつ、すでにボタンが押されている場合
    else if(complated) {

        return (

            <div>

                <br />
                <p> クリアおめでとう！！！！</p>

            </div>
        );     
    }
    // ログインしているかつ、まだボタンが押されていない場合
    else{
        
        return (
            <div>
                <br />
                <button className={styles.button} onClick={handleClick} disabled={loading}>
                    {loading ? '送信中...' : '終了報告を送信'}
                </button>

            </div>
        )

    }
}