// src/components/documents/CompleteButton.tsx
// 各ページの終了ボタンのコンポーネント
// 進捗更新API をここで実装

import styles from './CompleteButton.module.css';
import { UpDateProgress, GetProgress, isLessonCompleted } from '../../context/ManageProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overlay from '../Overlay';

export default function PageButton({
  section,
  page_number
}: {
  section: number;
  page_number: number;
}) {
  const [loading, setLoading] = useState(false);
  const [complated, setComplated] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    // オーバーレイを表示
    setShowSuccessOverlay(true);

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
      // 1秒後にオーバーレイを閉じてナビゲート
      setTimeout(() => {
        setShowSuccessOverlay(false);
        navigate('/mainpage');
      }, 1000);
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

                {/* オーバーレイ（React Portal） */}
                <Overlay isOpen={showSuccessOverlay}>
                  <p>クリアおめでとう！！！</p>
                  <p>メインページへ戻ります</p>
                </Overlay>
            </div>
        )

    }
}