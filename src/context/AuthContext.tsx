
// AuthContext.tsx
// 認証機能の実装

// 正式実装では、バックエンドへの通信とToken管理を行う

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

                // Todo:トークンの保存に変更したい
                localStorage.setItem("isLoggedIn", "true");
            
                return true;
            }

            // resultが"false"なら失敗
            else {

                localStorage.removeItem("isLoggedIn");
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

                // Todo:トークンの保存に変更したい
                localStorage.setItem("isLoggedIn", "true");

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

    return true;
}

// トークンの有効性チェック
export function isTokenValid() {

    // バックエンドへの問い合わせ

    return true;
}
