const PROGRESS_UPDATED_EVENT = 'progressUpdated';

// 進捗更新イベントを通知する関数と、イベントリスナーを登録する関数
export function notifyProgressUpdated(): void {
  window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
}

// 進捗更新イベントのリスナーを登録する関数
export function subscribeProgressUpdated(listener: () => void): () => void {
  window.addEventListener(PROGRESS_UPDATED_EVENT, listener);

  return () => {
    window.removeEventListener(PROGRESS_UPDATED_EVENT, listener);
  };
}
