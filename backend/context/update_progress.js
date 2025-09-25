const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// 進捗更新処理(成功:data 失敗:false)
export async function updateProgress(UserDB, username, section, page_number) {

    // データベースが見つからない場合
    if (!UserDB) {

        console.error("UserDB not provided to updateProgress");
        return false;
    }

    // 必要なパラメータがない場合
    if (!username || !section || !page_number) {
        
        console.error("Missing parameters in updateProgress");
        return false;
    }

    // section と page_number が範囲内に収まっているか確認
    const sec = Number(section);
    const pg = Number(page_number);

    if (!Number.isInteger(sec) || sec < 1 || sec > 10) {
        
        console.error("Invalid section in updateProgress");
        return false;
    }

    if (!Number.isInteger(pg) || pg < 1 || pg > 31) {

        console.error("Invalid page_number in updateProgress");
        return false;
    }

    const col = `section${sec}`;
    const bitIndex = pg - 1; // 1 始まりを 0 始まりに変換
    const mask = 1 << bitIndex;

    let data = null;

    try {

        // 現在値を取得
        const row = await UserDB
            .prepare(`SELECT ${col} AS v FROM UserData WHERE username = ? LIMIT 1`)
            .bind(username)
            .first();

        if (!row) {
            
            console.error("No user data found for username:", username);
            return false;
        }

        const current = row.v ? parseInt(row.v, 10) : 0;
        const updated = current | mask;

        // 変更があれば更新
        if (updated !== current) {
            await UserDB
                .prepare(`UPDATE UserData SET ${col} = ? WHERE username = ?`)
                .bind(updated, username)
                .run();
        }

        // 更新後の値を保存
        data = { [col]: updated };
    
    } 
    catch (e) {
        
        console.error("Database error in updateProgress:", e);
        return false;
    }

    // 更新成功
    return data;
}
