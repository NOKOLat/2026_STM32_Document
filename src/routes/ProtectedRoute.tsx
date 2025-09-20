import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { isTokenValid } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {

    // 検証中フラグと認証結果
    const [loading, setLoading] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);
    const location = useLocation();

    function effect() {

        let mounted = true;

        async function verify() {

            try {
                const token = localStorage.getItem("token");

                // token がなければ未認証
                if (!token) {

                    if (mounted) {

                        setIsAuthed(false);
                        setLoading(false);
                    }
                    return;
                }

                // isTokenValid は AuthContext 側で localStorage を参照する実装になっているため
                // 引数を渡さず呼び出す（Promise を返すので await する）
                const valid = await isTokenValid();

                if (mounted) {

                    setIsAuthed(Boolean(valid));
                }

            } 
            catch (err) {

                console.error("Token verification error:", err);
                
                if (mounted) {

                    setIsAuthed(false);
                }
            } 
            finally {

                if (mounted) {

                    setLoading(false);
                }
            }
        }

        verify();

        function cleanup() {

            mounted = false; // アンマウント後の state 更新を防ぐ
        }

        return cleanup;
    }

    useEffect(effect, [location.pathname]);

    // 検証中はローディング UI を表示（ここはプロジェクトのデザインに合わせて変更）
    if (loading) return <div>Loading...</div>;

    // 未認証ならリダイレクト
    if (!isAuthed) return <Navigate to="/" replace />;

    return <>{children}</>;
}

export default ProtectedRoute;
