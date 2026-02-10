# NokoLAT Authentication Service

Cloudflare Workersを使用したNokoLAT認証サービスのリポジトリです。

ユーザー識別のための最低限の機能を保有しています。

## APIエンドポイント

| メソッド | エンドポイント               | 説明                         |
|----------|-----------------------------|------------------------------|
| Register | `/register`                  | ユーザー登録エンドポイントです。 |
| Login    | `/login`                     | ログインエンドポイントです。 |
| Logout   | `/logout`                   | ログアウトエンドポイントです。 |
| GET      | `/discord-id/{username}`     | ユーザー名からDiscord IDを取得します。 |

## 認証システムについて

- このサービスは、サークルの新歓といったセキュリティー要件の非常に低い環境での使用を目的としています。

- ユーザーの判定、他ユーザーでの誤ったログインを防止することを目的にしています
    - セキュリティーが必要な場合はセッション管理を行うことを推奨します。

### 具体的な認証システム

1. NokoLAT Authentication Serviceは、ユーザーのメールアドレスとパスワードを受け取ります。
2. D1データベースに保存されているハッシュ化されたパスワードと照合します。
3. 認証が成功した場合、JWTトークンを生成し、ユーザーに返します。
4. JWTトークンは、公開鍵を利用して検証可能です。
5. 24時間後にトークンは無効になります。

## 使用例（TypeScript）

### 1. ユーザー登録

```typescript
const response = await fetch('https://your-api-endpoint.com/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'example_user',
        password: 'SecurePassword123!',
        discord_id: 'your_discord_username'
    })
});
const result = await response.json();
// status 201: 登録成功
// status 409: ユーザーまたはDiscord IDが既に存在
// status 400: 必須フィールドが不足
```

### 2. ログイン

```typescript
const response = await fetch('https://your-api-endpoint.com/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'example_user',
        password: 'SecurePassword123!'
    })
});
const { access_token, refresh_token, expires_in } = await response.json();
// access_token: APIへのアクセスに使用
// refresh_token: トークンの更新に使用
// expires_in: トークン有効期限（秒）
```

### 3. トークン更新

```typescript
const response = await fetch('https://your-api-endpoint.com/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        refresh_token: 'your_refresh_token_here'
    })
});
const { access_token, expires_in } = await response.json();
// 新しい access_token を取得
```

### 4. ログアウト

```typescript
const response = await fetch('https://your-api-endpoint.com/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        refresh_token: 'your_refresh_token_here'
    })
});
// status 200: ログアウト成功（トークンが無効化される）
```

### 5. Discord ID取得

```typescript
const response = await fetch('https://your-api-endpoint.com/discord-id/example_user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
});
const { username, discord_id } = await response.json();
// status 200: 取得成功
// status 404: ユーザーが見つからない
```

## 使用時の注意点

- IDやPasswordは、ほかのサイトで使用しているものを使用しないでください。
- 本サービスの利用によって生じた損害について、作者は一切の責任を負いません。