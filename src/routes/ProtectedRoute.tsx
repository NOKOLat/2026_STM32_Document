import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {

    // localStorage の "isLoggedIn" フラグをチェック
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {

        // ログインしていなければルートへリダイレクト
        // alert は任意でデバッグ用に残しています。
        // alert("ログインしてください");
        return <Navigate to="/" replace />; // ログインページへ
    }

    return children;
}

export default ProtectedRoute;
