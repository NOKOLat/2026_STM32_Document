import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  // 検証中フラグと認証結果
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function verify() {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        // accessToken と isLoggedIn フラグが両方ある場合のみ認証済みとする
        if (!accessToken || !isLoggedIn) {
          if (mounted) {
            setIsAuthed(false);
            setLoading(false);
          }
          return;
        }

        // 認証済み
        if (mounted) {
          setIsAuthed(true);
        }
      } catch (err) {
        console.error('Token verification error:', err);

        if (mounted) {
          setIsAuthed(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    verify();

    return () => {
      mounted = false; // アンマウント後の state 更新を防ぐ
    };
  }, [location.pathname]);

  // 検証中はローディング UI を表示
  if (loading) return <div>Loading...</div>;

  // 未認証ならリダイレクト
  if (!isAuthed) {
    localStorage.removeItem('isLoggedIn');
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
