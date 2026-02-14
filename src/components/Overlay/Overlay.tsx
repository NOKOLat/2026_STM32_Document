import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Overlay.module.css';

interface OverlayProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Overlay({ isOpen, children, onClose }: OverlayProps) {
  // Escキーでオーバーレイを閉じる（オプション機能）
  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.content}>
        {children}
      </div>
    </div>,
    document.body
  );
}
