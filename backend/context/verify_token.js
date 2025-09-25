// verifyToken を boolean を返すように変更
export async function isTokenValid(UserDB, token) {

    // データベースが見つからない場合は false を返す
    if (!UserDB) {
        console.error("Database connection error in verifyToken: UserDB not provided");
        return false;
    }

    // トークンがない場合は false
    if (!token) {
        return false;
    }

    // 期限切れのトークンの削除（失敗しても続行）
    try {
        await UserDB
            .prepare("DELETE FROM AuthToken WHERE timelimit <= ?")
            .bind(Date.now())
            .run();
    } catch (error) {
        console.error("Failed to clean up expired tokens:", error);
    }

    // トークン照合を行い、存在すれば true を返す
    try {

        const query = await UserDB
            .prepare("SELECT * FROM AuthToken WHERE token = ? AND timelimit > ?")
            .bind(token, Date.now())
            .first();

        return !!query;

    } catch (dbError) {

        console.error("Database error in verifyToken:", dbError);
        return false;
    }
}
