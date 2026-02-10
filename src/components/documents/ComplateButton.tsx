// src/components/documents/ComplateButton.tsx
// 各ページの終了ボタンのコンポーネント
// 進捗更新API をここで実装

import styles from './ComplateButton.module.css';
import { UpDateProgress, GetProgress, isLessonCompleted } from '../../context/ManageProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageButton({
  section,
  page_number
}: {
  section: number;
  page_number: number;
}) {
  const [loading, setLoading] = useState(false);
  const [complated, setComplated] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    // オーバーレイを表示
    showOverlay('クリアおめでとう！！！ <br />メインページへ戻ります');

    try {
      setLoading(true);
      const success = await UpDateProgress(section, page_number);

      if (success) {
        await GetProgress();
        setComplated(true);
        // UI 更新イベントを発火（PageLinkButton と mypage を更新）
        window.dispatchEvent(new Event('progressUpdated'));
      }
    } catch (e) {
      console.error(e);
      alert('送信に失敗しました。');
    } finally {
      setLoading(false);
      hideOverlay();
      navigate('/mainpage');
    }
  }

  // クリア状態を判定
  useEffect(() => {
    try {
      const isCompleted = isLessonCompleted(section, page_number);
      setComplated(isCompleted);
    } catch (e) {
      console.error('Error checking lesson completion:', e);
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