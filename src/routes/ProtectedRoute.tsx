import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {

    // localStorage の "isLoggedIn" フラグをチェチE��
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {

        alert("ログインが忁E��です、E);
        return <Navigate to="/" replace />; // ログインペ�Eジへ
    }

    return children;
}

export default ProtectedRoute;
