# Login API

認証 API の叩き方と、送る内容・受け取る内容のメモです。

実装ファイル:

```txt
src/features/auth/api.ts
```

ベース URL:

```txt
https://nokolatauth.s241507v.workers.dev
```

## 共通

リクエスト body は JSON で送ります。

```http
Content-Type: application/json
```

このアプリでは、ログイン成功後に JWT を `localStorage` に保存して使います。

## Login

ユーザー名とパスワードでログインします。

実装関数:

```ts
Login({ username, password })
```

エンドポイント:

```http
POST /login
```

リクエスト例:

```ts
await fetch('https://nokolatauth.s241507v.workers.dev/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'user_name',
    password: 'password'
  })
});
```

送る JSON:

```json
{
  "username": "user_name",
  "password": "password"
}
```

受け取る JSON:

```json
{
  "access_token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token"
}
```

ログイン成功時、`access_token` を decode して payload から `user_id` と `username` を取り出します。

JWT payload として想定している内容:

```ts
{
  user_id: string | number;
  username: string;
  iat: number;
  exp: number;
}
```

保存する localStorage:

```txt
accessToken  = access_token
refreshToken = refresh_token
userId       = payload.user_id
username     = payload.username
isLoggedIn   = "true"
```

失敗時:

- `response.ok` が false の場合は `false` を返す
- 通信エラーや JSON decode エラーでも `false` を返す

## Register

新しいユーザーを登録します。

実装関数:

```ts
RegisterAccount({ username, password, discord_id })
```

エンドポイント:

```http
POST /register
```

リクエスト例:

```ts
await fetch('https://nokolatauth.s241507v.workers.dev/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'user_name',
    password: 'password',
    discord_id: 'discord_id'
  })
});
```

送る JSON:

```json
{
  "username": "user_name",
  "password": "password",
  "discord_id": "discord_id"
}
```

成功時:

```txt
HTTP 201
```

実装では `201` のとき `true` を返します。

失敗時:

```txt
HTTP 409: User or Discord ID already exists
```

`409` のときは、ユーザー名または Discord ID が既に存在している扱いで `false` を返します。

それ以外の失敗では、レスポンス JSON を error として読み、ログに出して `false` を返します。

## Refresh Token

access token を更新します。

実装関数:

```ts
RefreshToken()
```

エンドポイント:

```http
POST /refresh
```

リクエスト例:

```ts
const refreshToken = localStorage.getItem('refreshToken');

await fetch('https://nokolatauth.s241507v.workers.dev/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh_token: refreshToken })
});
```

送る JSON:

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

受け取る JSON:

```json
{
  "access_token": "new_jwt_access_token"
}
```

成功時に更新する localStorage:

```txt
accessToken = access_token
```

失敗時:

- `refreshToken` が localStorage にない場合は `false`
- `401` の場合は refresh token も期限切れとして `localStorage.clear()` して `/` にリダイレクト
- その他の失敗では `false`

## Logout

ログアウトします。

実装関数:

```ts
Logout()
```

エンドポイント:

```http
POST /logout
```

リクエスト例:

```ts
const refreshToken = localStorage.getItem('refreshToken');

await fetch('https://nokolatauth.s241507v.workers.dev/logout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refresh_token: refreshToken })
});
```

送る JSON:

```json
{
  "refresh_token": "jwt_refresh_token"
}
```

実装上の動き:

1. `refreshToken` があれば `/logout` に送る
2. サーバー logout に失敗してもローカル側はログアウトする
3. `localStorage.clear()` を実行する
4. `/` にリダイレクトする

## localStorage Keys

認証 API で使う主な key です。

```txt
accessToken
refreshToken
userId
username
isLoggedIn
```

## 注意

- progress API は `accessToken` と `userId` を使います。
- access token が期限切れの場合、progress API 側から `RefreshToken()` を呼んで再試行します。
