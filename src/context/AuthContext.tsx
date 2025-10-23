
// AuthContext.tsx
// 認証機能の実装
import { Navigate } from 'react-router-dom';

export async function Login({ username, password }: { username: string; password: string }){

    // バックエンドへの問い合わせ
    try {
        const response = await fetch("https://2026stm32document.aoi256jp.workers.dev/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json", // JSONを送るとき
            },
            body: JSON.stringify({
                action: "login",
                username: username,
                password: password,
            }),
        });

        // レスポンスが返ってきた時の処理
        if (response.ok) {

            // レスポンスからデータを取得
            const data = await response.json();

            // resultが"true"なら成功
            if(data.result === "true") {

                // 返送されてきたトークンを保存
                localStorage.setItem("token", data.token);

                // ログインフラグを立てる
                localStorage.setItem("isLoggedIn", "true");
            
                return true;
            }

            // resultが"false"なら失敗
            else {

                localStorage.removeItem("token");
                console.error("Login failed:", data.message);
                return false;
            }
        }
    } 

    // ネットワークエラーなどで通信に失敗した場合
    catch (error) {
        
        console.error("Login failed:", error);
    }

    return false;
}

export async function RegisterAccount({ username, password }: { username: string; password: string }){


    // バックエンドへの問い合わせ
    try {
        const response = await fetch("https://2026stm32document.aoi256jp.workers.dev/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            // jsonファイルの中身
            body: JSON.stringify({
                action: "register",
                username: username,
                password: password,
            }),
        });

        // レスポンスが返ってきた時の処理
        if (response.ok) {

            // レスポンスからデータを取得
            const data = await response.json();

            // resultが"true"なら成功
            if(data.result === "true") {

                localStorage.setItem("token", data.token);

                return true;
            }

            // resultが"false"なら失敗
            else {

                localStorage.removeItem("isLoggedIn");
                console.error("Registration failed:", data.message);
                return false;
            }
        }
    }

    // ネットワークエラーなどで通信に失敗した場合
    catch (error) {

        console.error("Registration failed:", error);
    }

    return false;
}

// トークンの有効期限を強制的に終了させる
export function Logout() {

    // ログアウト処理
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.reload();
    return true;
}

// トークンの有効性チェック(true:有効, false:無効)
export async function isTokenValid() {


    // バックエンドへの問い合わせ
    try {
        const response = await fetch("https://2026stm32document.aoi256jp.workers.dev/", {

            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            // jsonファイルの中身
            body: JSON.stringify({
                action: "verify_token",
                token: localStorage.getItem("token"),
            }),
        });

        // レスポンスが返ってきた時の処理
        if (!response.ok) {
            // サーバが 500 等のエラーを返した場合
            console.error("verify_token request failed with status:", response.status);
            return false;
        }

        // レスポンスからデータを取得
        const data = await response.json();

        // resultが"true"なら成功
        if (data.result === "true") {

            return true;
        }

        // resultが"false"なら失敗
        alert("セッションの有効期限が切れました。再度ログインしてください。");
        return false;
    }

    // ネットワークエラーなどで通信に失敗した場合
    catch (error) {
        console.error("Token verification failed:", error);
        return false;
    }

    return false;
}
