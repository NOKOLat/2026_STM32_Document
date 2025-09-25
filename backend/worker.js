import { handleLogin } from "./context/login.js";
import { handleAccountRegister } from "./context/register_account.js";  
import { isTokenValid } from "./context/verify_token.js";
import { GetProgress } from "./context/get_progress.js";
import { updateProgress } from "./context/update_progress.js";
import { createToken } from "./context/create_token.js";
import { CreateResponse, CreateProgressResponse, CreateLoginResponse } from "./utils/response_creator.js";
import { PostDiscord } from "./utils/post_discord.js";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
};

// HTTPリクエストを受信したときに実行される関数
export default {

    async fetch(request, env) {
        
        // CORS プリフライトリクエスト対応
        if (request.method === "OPTIONS") {

            return new Response(null, { status: 204, headers: CORS_HEADERS });
        }

        // POST メソッド以外は拒否
        if (request.method !== "POST") {

            return CreateResponse("false", "Method Not Allowed", 405);
        }
        
        // POST メソッドに対しての処理

        // jsonファイルからデータを取得
        // データがない場合は、各処理内でエラーを返す
        const body = await request.json();
        const { action, username, password, token, section, page_number } = body;

        // エラー取得のために try-catch で囲む
        try{

            // actionによって処理を分岐
            switch (action) {

                // ログイン処理
                case "login":

                    // ログイン失敗時の処理
                    if(await handleLogin(env.UserDB, username, password) !== true) {

                        return CreateResponse("false", "Invalid username or password", 401);
                    }

                    // トークンを発行
                    const loginToken = await createToken(env.UserDB);

                    if (loginToken === false) {

                        return CreateResponse("false", "Failed to create token", 500);
                    }
                    
                    // ログイン成功時の処理
                    return CreateLoginResponse(loginToken);
                
                // アカウント登録処理
                case "register":

                    // アカウント登録失敗時の処理
                    if(await handleAccountRegister(env.UserDB, username, password) !== true) {

                        return CreateResponse("false", "Registration failed", 400);
                    }

                    const registerToken = await createToken(env.UserDB);

                    if (registerToken === false) {

                        return CreateResponse("false", "Failed to create token", 500);
                    }

                    // アカウント登録成功時の処理
                    return CreateLoginResponse(registerToken);
                
                // トークンの認証処理
                case "verify_token":

                    // 認証失敗
                    if(await isTokenValid(env.UserDB, token) !== true){
                        
                        return CreateResponse("false", "Invalid or expired token", 401);
                    }
                    
                    // 認証成功
                    return CreateResponse("true");
                
                // 進捗取得処理
                case "get_progress":

                    // トークンの認証をする
                    if(await isTokenValid(env.UserDB, token) === false){
                        
                        // 認証失敗
                        return CreateResponse("false", "Invalid or expired token", 401);
                    }

                    // 進捗の取得
                    const progressData = await GetProgress(env.UserDB, username);

                    // 取得失敗
                    if(progressData === false){

                        return CreateResponse("false", "Failed to retrieve progress data", 500);
                    }

                    // 取得成功 + 進捗の送信
                    return CreateProgressResponse(progressData);

                // 進捗更新処理
                case "update_progress":

                    // トークンの認証をする
                    if(await isTokenValid(env.UserDB, token) === false){
                        
                        // 認証失敗
                        return CreateResponse("false", "Invalid or expired token", 401);
                    }

                    // 進捗の更新
                    const updateResult = await updateProgress(env.UserDB, username, section, page_number);

                    // 更新失敗
                    if(updateResult === false){

                        return CreateResponse("false", "Failed to update progress", 500);
                    }

                    // 更新成功 + ディスコードへの送信
                    const webhookUrl = "https://discord.com/api/webhooks/1420434607102365838/gxSBmqurw3WdsGIV7f_vKppnzXy-7G6iYg5AVL1Qj45j6CMzV2aEXcZZmAKCz6rSf0jO";

                    if(await PostDiscord(webhookUrl, username, section, page_number) === false){

                        return CreateResponse("false", "Failed to send Discord notification", 500);
                    }

                    // 更新と送信の成功
                    return CreateResponse("true");

                default:

                    // 未知のアクション
                    return CreateResponse("false", "Bad Request: Unknown action", 400);
            }
        } 
        catch (error) {

            return CreateResponse("false", "Internal Server Error: " + error.message, 500);
        }
    }
};
