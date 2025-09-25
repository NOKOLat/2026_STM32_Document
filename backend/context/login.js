const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// ログイン処理(成功:true 失敗:false)
export async function handleLogin(UserDB, username, password) {

    // データベースが見つからない場合
    if (!UserDB) {

        console.error("UserDB not provided to handleLogin");
        return false;
    }

    // ユーザー名またはパスワードがない場合
    if(!username || !password) {

        console.error("Username or password not provided to handleLogin");
        return false;
    }

    // データベースからIDとパスワードを照合
    try {

        // 一致するものを検索（検索に成功 == 照合に成功）
        const query = await UserDB
        .prepare("SELECT * FROM UserData WHERE username = ? AND password = ?")
        .bind(username, password)
        .first();

        // 照合に失敗した場合
        if (!query) {

            console.error("Invalid username or password");
            return false;
        }
    } 
    // データベースエラーが発生した場合
    catch (dbError) {

        console.error("Database error in handleLogin:", dbError);
        return false;
    }

    // 照合に成功（エラーなし）
    return true;
}