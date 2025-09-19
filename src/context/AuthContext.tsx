
// AuthContext.tsx
// 認証機能の実装

// 正式実装では、バックエンドへの通信とToken管理を行う

export async function Login({ username, password }: { username: string; password: string }){

    // 仮の認証ロジック
    // if (username === 'user' && password === 'password') {

    //     // 認証成功時の処理
    //     localStorage.setItem("isLoggedIn", "true");
    //     return true;
    // }


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

                localStorage.setItem("isLoggedIn", "true");
            
                return true;
            }
            else {

                localStorage.removeItem("isLoggedIn");
                console.error("Login failed:", data.message);
                return false;
            }
        }
    } 
    catch (error) {
        
        console.error("Login failed:", error);
    }

    return false;
}

export function Logout() {

    // ログアウト処理
    localStorage.removeItem("isLoggedIn");

    return true;
}

export function isTokenValid() {

    // トークンの有効性チェック
    // バックエンドへの問い合わせ

    return true;
}
