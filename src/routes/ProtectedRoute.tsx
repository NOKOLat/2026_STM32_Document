import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {

    // localStorage の "isLoggedIn" フラグをチェック
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {

        alert("ログインが必要です。");
        return <Navigate to="/" replace />; // ログインページへ
    }

    return children;
}

export default ProtectedRoute;
