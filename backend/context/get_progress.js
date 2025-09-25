const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// 進捗取得処理(成功:data 失敗:false)
export async function GetProgress(UserDB, username) {

    // データベースが見つからない場合
    if (!UserDB) {

        console.error("UserDB not provided to GetProgress");
        return false;
    }

    // ユーザ名がない場合
    if(!username) {

        console.error("Username not provided to GetProgress");
        return false;
    }

    try {

        // ユーザー名に一致する進捗データを取得
        const query = await UserDB
            .prepare("SELECT section1, section2, section3, section4, section5, section6, section7, section8, section9, section10 FROM UserData WHERE username = ? LIMIT 1")
            .bind(username)
            .first();

        // データが見つからない場合(登録されていないユーザー名)
        if (!query) {

            console.error("No progress data found for username:", username);
            return false;
        }

        // 値を整数で整形する
        var data = {
            section1: query.section1 ? parseInt(query.section1, 10) : 0,
            section2: query.section2 ? parseInt(query.section2, 10) : 0,
            section3: query.section3 ? parseInt(query.section3, 10) : 0,
            section4: query.section4 ? parseInt(query.section4, 10) : 0,
            section5: query.section5 ? parseInt(query.section5, 10) : 0,
            section6: query.section6 ? parseInt(query.section6, 10) : 0,
            section7: query.section7 ? parseInt(query.section7, 10) : 0,
            section8: query.section8 ? parseInt(query.section8, 10) : 0,
            section9: query.section9 ? parseInt(query.section9, 10) : 0,
            section10: query.section10 ? parseInt(query.section10, 10) : 0,
        };

    } 
    catch (dbError) {
        console.error("Database error in GetProgress:", dbError);
        return false;
    }

    // 取得成功
    return data;
}