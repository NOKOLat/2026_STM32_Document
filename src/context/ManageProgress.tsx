// ManageProgress.tsx
// 進捗の取得・更新を行うユーティリティ

// 注意: API_URL は AuthContext と同じエンドポイントを使用します
const API_URL = "https://2026stm32document.aoi256jp.workers.dev/";

export async function UpDateProgress(section: number, page_number: number) {

    // token, username は localStorage から取得する
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
        console.warn("UpDateProgress: token or username not found in localStorage");
        return null;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "update_progress", username, token, section, page_number }),
        });

        if (!response.ok) {
            console.warn("UpDateProgress: server responded with", response.status);
            // サーバー更新に失敗した場合はローカルに保存しておく
            const local = { section, page_number };
            localStorage.setItem("progress_local", JSON.stringify(local));
            return null;
        }

        const data = await response.json();

        // サーバーが新しい token を返す場合は更新する
        if (data && data.token) {
            localStorage.setItem("token", data.token);
        }

        // サーバーが更新済みの進捗データを返すなら localStorage に格納して返す
        if (data && (data.result === "true" || data.result === true) && data.data) {
            // レスポンス data の各キーを同名の localStorage キーに保存
            try {
                Object.entries(data.data).forEach(([k, v]) => {
                    // 値は数値が想定されるので文字列に変換して保存
                    localStorage.setItem(k, String(v));
                });
            } catch (e) {
                console.error("Failed to save individual progress keys:", e);
            }
            
            // 互換性のため、まとめた progress も保存しておく
            localStorage.setItem("progress", JSON.stringify(data.data));
            return data.data;
        }

        const local = { section, page_number };
        return local;
    } 
    catch (error) {
        
        console.error("UpDateProgress failed:", error);
        return null;
    }
}

// 進捗の取得
export async function GetProgress() {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
        console.warn("GetProgress: token or username not found in localStorage");
        return null;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get_progress", username, token }),
        });

        if (!response.ok) {
            console.warn("GetProgress: server responded with", response.status);
            return null;
        }

        const data = await response.json();

        if (data && (data.result === "true" || data.result === true)) {
            // サーバーが新しい token を返す場合は更新
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // 取得データは data.data に入っている想定
            if (data.data) {
                // 個別キーを localStorage に保存
                try {

                    Object.entries(data.data).forEach(([k, v]) => {
                        localStorage.setItem(k, String(v));
                    });
                } 
                catch (e) {

                    console.error("Failed to save individual progress keys:", e);
                }
                // username と token は念のため保存
                localStorage.setItem("username", username);

                // 互換性のためまとめた progress も保存
                localStorage.setItem("progress", JSON.stringify(data.data));
                return data.data;
            }
        }

        console.warn("GetProgress: unexpected response", data);
        return null;
    } 
    catch (error) {
        console.error("GetProgress failed:", error);
        return null;
    }

}