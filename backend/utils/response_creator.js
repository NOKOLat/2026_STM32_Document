const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
};

// HTTPレスポンスを生成するユーティリティ関数
export function CreateResponse(result = "false", message = null, status = 200) {

    return new Response(

        JSON.stringify({ result, message }),
        { status, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
}

export function CreateLoginResponse(token) {  

    return new Response(

        JSON.stringify({ result: "true", message: "Login successful", token }),
        { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
}

export function CreateProgressResponse(data) {

    return new Response(
        JSON.stringify({ result: "true", data }),
        { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
}
