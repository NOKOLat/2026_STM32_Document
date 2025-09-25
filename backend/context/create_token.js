// 新しいトークンの作成（return: token / string）
export async function createToken(UserDB) {

    // ランダムなトークンを生成
    const randomPart = Math.random().toString(36).substring(2, 10); // ランダムな8文字
    const timePart = Date.now().toString(36); // 現在の時間を36進数に変換
    const token = randomPart + timePart;

    // トークンの有効期限をタイムスタンプで保存
    const timelimit = Date.now() + 3600 * 24000; // 24時間後のタイムスタンプ

    // トークンをデータベースに保存
    if( await saveTokenToDatabase(UserDB, token, timelimit) !== true) {

        // 保存に失敗した場合falseを返す
        return false;
    }

    // 成功した場合はトークンを返す
    return token;
}

// トークンをデータベースに保存(return: 成功 true / 失敗 false)
async function saveTokenToDatabase(UserDB, token, timelimit) {

    // データベースがない場合は false を返す
    if (!UserDB) {

        console.error("UserDB not provided to createToken");
        return false;
    }

    try {

        // AuthToken テーブルに token と timelimit カラムで保存
        await UserDB
            .prepare("INSERT INTO AuthToken (token, timelimit) VALUES (?, ?)")
            .bind(token, timelimit)
            .run();
    } 
    catch (err) {

        // 保存に失敗した場合は false を返す
        console.error("Failed to save token to database:", err);
        return false;
    }

    return true;
}
