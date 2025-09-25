const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}; 

// アカウント登録処理(成功:true 失敗:false)
export async function handleAccountRegister(UserDB, username, password) {

    // データベースが見つからない場合
    if (!UserDB) {

        console.error("UserDB not provided to handleAccountRegister");
        return false;
    }

    // ユーザー名またはパスワードがない場合
    if(!username || !password) {
        
        console.error("Username or password not provided to handleAccountRegister");
        return false;
    }

    // すでに登録されていないかを判定
    try {

        // 一致するものを検索
        const query = await UserDB
        .prepare("SELECT * FROM UserData WHERE username = ?")
        .bind(username)
        .first();

        // 一致するものがあった場合
        if (query) {
            
            console.error("Username already exists");
            return false;
        } 
    } 
    // データベースエラーが発生した場合
    catch (dbError) {

        console.error("Database error:", dbError);
        return false;
    }

    // 登録処理
    try {

        await UserDB
        .prepare("INSERT INTO UserData (username, password) VALUES (?, ?)")
        .bind(username, password)
        .run();

    } 
    // データベースエラーが発生した場合
    catch (error) {

        console.error("Database error during registration:", error);
        return false;
    }

    // 登録成功
    return true;
}