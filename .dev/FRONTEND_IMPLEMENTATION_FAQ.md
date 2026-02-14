# フロント実装に関する Q&A ガイド

フロント実装チームからの7つの質問に対する詳細な回答です。

---

#### ans

進捗データの取得レスポンス
進捗取得エンドポイント GET /progress/{user_id} の実装から、以下のデータ形式が返ってきます：

📤 レスポンス形式（200 OK）

[
  {
    "lesson_id": "01-setup",
    "is_completed": 1,
    "completed_at": "2026-02-10T07:51:12.944Z"
  },
  {
    "lesson_id": "02-basics",
    "is_completed": 0,
    "completed_at": null
  },
  {
    "lesson_id": "03-interrupts",
    "is_completed": 1,
    "completed_at": "2026-02-10T08:15:30.123Z"
  }
]


## ✅ Q1: progress/complete エンドポイントのリクエスト形式

### リクエスト形式

```json
{
  "lesson_id": "01-setup"
}
```

### 実装コード（参照）

```javascript
// src/routes/progress.js より
const body = await request.json();
const { lesson_id } = body;
const userId = authPayload.user_id;

// バリデーション
if (!lesson_id) {
  return createErrorResponse('lesson_idは必須です', 400);
}
```

### 詳細

| フィールド | 型 | 必須 | 説明 | 例 |
|----------|-----|------|------|-----|
| `lesson_id` | string | ✅ | レッスンの一意識別子 | `"01-setup"` |

### TypeScript での実装例

```typescript
async function completeLesson(
  lessonId: string,
  accessToken: string
): Promise<{
  progress_id: string;
  is_completed: boolean;
  completed_at: string;
}> {
  const response = await fetch(
    'https://stm32document.s241507v.workers.dev/progress/complete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        lesson_id: lessonId
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to complete lesson');
  }

  return await response.json();
}

// 使用例
const result = await completeLesson('01-setup', accessToken);
console.log(`進捗ID: ${result.progress_id}`);
console.log(`完了時刻: ${result.completed_at}`);
```

### エラーレスポンス

| ステータス | エラーメッセージ | 原因 |
|----------|----------------|------|
| 400 | `lesson_idは必須です` | リクエストに `lesson_id` がない |
| 401 | `認証が必要です` | トークンがない、または無効 |
| 404 | `レッスンが見つかりません` | 指定した `lesson_id` が存在しない |
| 500 | `サーバーエラーが発生しました` | サーバー側のエラー |

---

## ✅ Q2: progress/{user_id} の user_id 形式

### user_id の取得方法

JWT アクセストークンのペイロードに含まれています。

```typescript
// ログイン時に access_token を取得
const loginResponse = await fetch('https://nokolatauth.s241507v.workers.dev/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'user@example.com',
    password: 'password123'
  })
});
const { access_token } = await loginResponse.json();

// access_token をデコード
const decodedToken = decodeJWT(access_token);
console.log(decodedToken.user_id);  // "user_123" のような形式
console.log(decodedToken.username); // "user@example.com"
```

### JWT デコード関数の実装

```typescript
function decodeJWT(token: string): {
  user_id: string | number;
  username: string;
  iat: number;
  exp: number;
} {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const payload = JSON.parse(
    atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
  );

  return payload;
}
```

### 実装コード（参照）

```javascript
// .ignore/src/routes/login.js より
const accessToken = await generateAccessToken(
  { user_id: user.id, username: user.username },
  env.JWT_SECRET
);
```

### user_id の特性

- **形式**: 通常は UUID または自動採番の数値
- **不変性**: ユーザー生成後は変更されない
- **一意性**: システム内で一意

### 進捗取得の実装例

```typescript
async function getUserProgress(
  accessToken: string
): Promise<ProgressItem[]> {
  // JWT からユーザーID を取得
  const payload = decodeJWT(accessToken);
  const userId = payload.user_id;

  // 進捗データを取得
  const response = await fetch(
    `https://stm32document.s241507v.workers.dev/progress/${userId}`,
    {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch progress');
  }

  return await response.json();
}
```

---

## ✅ Q3: ユーザー情報の保存（username vs user_id）

### 推奨：両方を保存

```typescript
// localStorage に両方を保存
localStorage.setItem('userId', payload.user_id);
localStorage.setItem('username', payload.username);
localStorage.setItem('accessToken', loginResponse.access_token);
localStorage.setItem('refreshToken', loginResponse.refresh_token);
```

### 使い分けガイド

| 用途 | 使用するもの | 理由 |
|------|-----------|------|
| API リクエスト（Progress 取得など） | `user_id` | API の URL パラメータに使用 |
| UI に表示する（ユーザー名表示） | `username` | ユーザーフレンドリー |
| ローカルキャッシュキー | `user_id` | 一意性が保証 |
| デバッグ・ログ出力 | 両方 | 識別性向上 |

### 実装例（React Hooks）

```typescript
import { useEffect, useState } from 'react';

interface AuthState {
  userId: string | null;
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    userId: null,
    username: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false
  });

  // ログイン処理
  const login = async (username: string, password: string) => {
    const response = await fetch('https://nokolatauth.s241507v.workers.dev/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const payload = decodeJWT(data.access_token);

    // state と localStorage に保存
    const newAuth = {
      userId: payload.user_id,
      username: payload.username,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      isLoggedIn: true
    };

    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));

    return newAuth;
  };

  // ログアウト処理
  const logout = () => {
    setAuth({
      userId: null,
      username: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false
    });
    localStorage.removeItem('auth');
  };

  // 初期化（ページロード時に localStorage から復元）
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      setAuth(JSON.parse(savedAuth));
    }
  }, []);

  return { auth, login, logout };
}
```

---

## ✅ Q4: Discord ID の扱い

### ユーザー登録時

**Discord ID は必須です。**

```typescript
async function registerUser(
  username: string,
  password: string,
  discordId: string
) {
  const response = await fetch(
    'https://nokolatauth.s241507v.workers.dev/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        discord_id: discordId
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    // 409: Discord ID が既に存在
    // 400: 必須フィールド不足
    throw new Error(error.error);
  }

  return await response.json();
}
```

### Discord ID の取得方法

#### 1. ユーザーが手動で入力

```html
<input
  type="text"
  placeholder="Discord ユーザー名（例: user#1234）"
  onChange={(e) => setDiscordId(e.target.value)}
/>
```

#### 2. Discord OAuth 2.0 を使用（推奨）

```typescript
// Discord OAuth フロー（詳細は Discord Developer Portal を参照）
async function getDiscordIdViaOAuth() {
  // 1. Discord 認可エンドポイントにリダイレクト
  window.location.href = `https://discord.com/api/oauth2/authorize?
    client_id=YOUR_CLIENT_ID
    &redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}
    &response_type=code
    &scope=identify`;
}

// 2. コールバック URL でコード を取得
// 3. バックエンドでトークン交換
// 4. Discord API から ユーザー ID を取得
```

### 後からの更新

現在の実装では、ユーザー登録後の Discord ID 変更機能は **サポートされていません**。

#### 今後の拡張案

```javascript
// PATCH /users/{user_id} - ユーザー情報を更新（未実装）
// リクエスト: { discord_id: "new_discord_id" }
```

### UI での注意点

```typescript
// 登録フォームの実装
function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    discord_id: '',  // 必須フィールド
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // バリデーション
    if (!formData.discord_id) {
      alert('Discord ID は必須です');
      return;
    }

    try {
      const result = await registerUser(
        formData.username,
        formData.password,
        formData.discord_id
      );
      console.log('登録成功', result);
    } catch (error) {
      if (error.message.includes('already exists')) {
        alert('このDiscord IDは既に使用されています');
      } else {
        alert('登録に失敗しました: ' + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... その他のフィールド ... */}
      <input
        type="text"
        placeholder="Discord ID (必須)"
        value={formData.discord_id}
        onChange={(e) =>
          setFormData({ ...formData, discord_id: e.target.value })
        }
        required
      />
    </form>
  );
}
```

---

## ✅ Q5: トークン更新タイミング

### トークンの有効期限

| トークン | 有効期限 | 目的 |
|---------|--------|------|
| **access_token** | **15 分** | API 呼び出し用（短い） |
| **refresh_token** | **7 日** | 新しい access_token を取得 |

### 実装コード（参照）

```javascript
// .ignore/src/utils/jwt.js より
const ACCESS_TOKEN_EXPIRY_SEC = 900; // 15分
```

```javascript
// .ignore/src/routes/login.js より
const REFRESH_TOKEN_EXPIRY_SEC = 7 * 24 * 60 * 60; // 7日
```

### トークン更新の 3 つのパターン

#### パターン1：定期的に更新（推奨）

```typescript
function setupTokenRefreshInterval(refreshToken: string) {
  // 14分ごとに自動更新（15分の少し前）
  setInterval(async () => {
    try {
      const response = await fetch(
        'https://nokolatauth.s241507v.workers.dev/refresh',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken })
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        console.log('✓ トークン自動更新成功');
      }
    } catch (error) {
      console.error('トークン更新失敗:', error);
    }
  }, 14 * 60 * 1000); // 14分
}

// ログイン後に設定
const loginResponse = await login(username, password);
setupTokenRefreshInterval(loginResponse.refresh_token);
```

#### パターン2：API エラー時に更新

```typescript
async function apiRequestWithAutoRefresh(
  endpoint: string,
  options: RequestInit,
  refreshToken: string
): Promise<Response> {
  let response = await fetch(endpoint, options);

  // 401 エラーの場合
  if (response.status === 401) {
    console.log('トークン期限切れ。更新を試みます...');

    // トークンを更新
    const refreshResponse = await fetch(
      'https://nokolatauth.s241507v.workers.dev/refresh',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    if (refreshResponse.ok) {
      const { access_token } = await refreshResponse.json();
      localStorage.setItem('accessToken', access_token);

      // 新しいトークンで再試行
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${access_token}`
        }
      };

      response = await fetch(endpoint, newOptions);
    }
  }

  return response;
}

// 使用例
const response = await apiRequestWithAutoRefresh(
  'https://stm32document.s241507v.workers.dev/courses',
  {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  },
  refreshToken
);
```

#### パターン3：ページをフォーカスした時に更新

```typescript
function setupTokenRefreshOnFocus(refreshToken: string) {
  window.addEventListener('focus', async () => {
    console.log('ページがアクティブになったため、トークンを確認します');

    try {
      const response = await fetch(
        'https://nokolatauth.s241507v.workers.dev/refresh',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken })
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
      }
    } catch (error) {
      console.error('トークン更新失敗:', error);
    }
  });
}

// ログイン後に設定
setupTokenRefreshOnFocus(refreshToken);
```

### 更新失敗時の対策

```typescript
async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      'https://nokolatauth.s241507v.workers.dev/refresh',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // refresh_token も期限切れ → ログイン画面へ
        console.log('セッション期限切れ。ログイン画面へ遷移します');
        redirectToLogin();
        return null;
      }
      throw new Error('Token refresh failed');
    }

    const { access_token } = await response.json();
    return access_token;
  } catch (error) {
    console.error('トークン更新エラー:', error);
    return null;
  }
}
```

---

## ✅ Q6: ログアウト時の処理

### ログアウト処理は 2 段階

#### 段階1：サーバー側で refresh_token を無効化（推奨）

```typescript
async function logout(refreshToken: string) {
  try {
    // サーバーで refresh_token を無効化
    const response = await fetch(
      'https://nokolatauth.s241507v.workers.dev/logout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    if (!response.ok) {
      console.error('Logout failed on server');
      // ただし、ローカルストレージはクリアする
    }
  } catch (error) {
    console.error('Logout error:', error);
    // エラーが発生しても、ローカルストレージはクリアする
  } finally {
    // 段階2：ローカルストレージをクリア
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('auth');

    // ログイン画面へ遷移
    redirectToLoginPage();
  }
}
```

### 実装コード（参照）

```javascript
// .ignore/src/routes/logout.js より
// POST /logout - refresh_token を無効化
// サーバー側で token_hash をデータベースから削除
```

### complete ログアウト実装（React）

```typescript
export function useAuth() {
  const logout = async () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');

    if (auth.refreshToken) {
      try {
        await fetch('https://nokolatauth.s241507v.workers.dev/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: auth.refreshToken })
        });
      } catch (error) {
        console.error('Server logout failed, but clearing local storage:', error);
      }
    }

    // ローカルデータをクリア
    localStorage.clear();
    sessionStorage.clear();

    // UI の状態をリセット
    window.location.href = '/login';
  };

  return { logout };
}
```

### ログアウトボタンの実装

```typescript
function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      style={{ color: 'red', cursor: 'pointer' }}
    >
      ログアウト
    </button>
  );
}
```

---

## ✅ Q7: 認証フロー全体（統合実装例）

### 完全な認証管理クラス

```typescript
interface AuthConfig {
  baseUrl: string;
  tokenRefreshInterval: number; // ミリ秒
}

class AuthManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private userId: string | null = null;
  private username: string | null = null;
  private refreshIntervalId: NodeJS.Timeout | null = null;

  constructor(private config: AuthConfig) {
    this.restoreFromLocalStorage();
  }

  // ================================
  // 1. ユーザー登録
  // ================================
  async register(
    username: string,
    password: string,
    discordId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            discord_id: discordId
          })
        }
      );

      if (response.status === 201) {
        return { success: true, message: '登録成功' };
      } else if (response.status === 409) {
        return { success: false, message: 'ユーザー名またはDiscord IDが既に存在' };
      } else {
        const error = await response.json();
        return { success: false, message: error.error };
      }
    } catch (error) {
      return { success: false, message: `登録失敗: ${error.message}` };
    }
  }

  // ================================
  // 2. ログイン
  // ================================
  async login(
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        }
      );

      if (!response.ok) {
        return { success: false, message: 'ユーザー名またはパスワードが正しくありません' };
      }

      const data = await response.json();
      this.setTokens(
        data.access_token,
        data.refresh_token,
        data.expires_in
      );

      // トークン自動更新を開始
      this.startAutoRefresh();

      return { success: true, message: 'ログイン成功' };
    } catch (error) {
      return { success: false, message: `ログイン失敗: ${error.message}` };
    }
  }

  // ================================
  // 3. トークン自動更新
  // ================================
  private startAutoRefresh() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }

    // 14分ごとに更新（15分の1分前）
    this.refreshIntervalId = setInterval(
      () => this.refreshAccessToken(),
      this.config.tokenRefreshInterval
    );
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(
        `${this.config.baseUrl}/refresh`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: this.refreshToken })
        }
      );

      if (!response.ok) {
        // refresh_token も期限切れ
        this.clear();
        window.dispatchEvent(new CustomEvent('auth:sessionExpired'));
        return false;
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.saveToLocalStorage();

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  // ================================
  // 4. ログアウト
  // ================================
  async logout(): Promise<void> {
    if (this.refreshToken) {
      try {
        await fetch(
          `${this.config.baseUrl}/logout`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: this.refreshToken })
          }
        );
      } catch (error) {
        console.error('Server logout error:', error);
      }
    }

    this.clear();
    window.dispatchEvent(new CustomEvent('auth:loggedOut'));
  }

  // ================================
  // 5. API リクエスト（自動トークン更新付き）
  // ================================
  async fetchWithAuth(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    let response = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    // 401 の場合は一度だけトークン更新を試みる
    if (response.status === 401) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        // 新しいトークンで再試行
        response = await fetch(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${this.accessToken}`
          }
        });
      }
    }

    return response;
  }

  // ================================
  // 6. ヘルパーメソッド
  // ================================
  private setTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ) {
    const payload = this.decodeJWT(accessToken);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = payload.user_id;
    this.username = payload.username;

    this.saveToLocalStorage();
  }

  private decodeJWT(token: string): { user_id: string | number; username: string } {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token');

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    return payload;
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        userId: this.userId,
        username: this.username
      })
    );
  }

  private restoreFromLocalStorage() {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const auth = JSON.parse(saved);
      this.accessToken = auth.accessToken;
      this.refreshToken = auth.refreshToken;
      this.userId = auth.userId;
      this.username = auth.username;

      // 復元後も自動更新を開始
      if (this.accessToken && this.refreshToken) {
        this.startAutoRefresh();
      }
    }
  }

  private clear() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }

    this.accessToken = null;
    this.refreshToken = null;
    this.userId = null;
    this.username = null;

    localStorage.removeItem('auth');
  }

  // ================================
  // 7. ゲッター
  // ================================
  getAccessToken(): string | null {
    return this.accessToken;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUsername(): string | null {
    return this.username;
  }

  isLoggedIn(): boolean {
    return this.accessToken !== null;
  }
}

// 使用例
const authManager = new AuthManager({
  baseUrl: 'https://nokolatauth.s241507v.workers.dev',
  tokenRefreshInterval: 14 * 60 * 1000 // 14分
});

// ログイン
const result = await authManager.login('user@example.com', 'password');

// API リクエスト（自動トークン更新付き）
const response = await authManager.fetchWithAuth(
  'https://stm32document.s241507v.workers.dev/courses',
  { method: 'GET' }
);

// ログアウト
await authManager.logout();
```

---

## 📊 ユースケース別ガイド

### シナリオ1：ページロード時の状態復元

```typescript
// App.tsx
useEffect(() => {
  const authManager = new AuthManager({...});

  if (authManager.isLoggedIn()) {
    // ログイン状態を復元
    renderDashboard();
  } else {
    // ログイン画面を表示
    redirectToLogin();
  }
}, []);
```

### シナリオ2：バックグラウンドでトークン期限切れ

```typescript
// ページを最小化して 16 分経過 → フォーカスすると自動トークン更新
window.addEventListener('focus', () => {
  authManager.refreshAccessToken();
});
```

### シナリオ3：オンライン・オフライン切り替え

```typescript
window.addEventListener('online', async () => {
  // オンラインに戻った → トークン更新を試みる
  const ok = await authManager.refreshAccessToken();
  if (!ok) {
    redirectToLogin();
  }
});
```

---

## 🚨 エラーハンドリングチェックリスト

- [ ] 401 エラー時に 1 回だけトークン更新を試みる
- [ ] refresh_token も期限切れの場合はログイン画面へ遷移
- [ ] refresh_token は localStorage ではなく、httpOnly Cookie で保存する（更新予定）
- [ ] ネットワークエラー時のリトライロジック
- [ ] トークン更新中の API リクエストはキューイング

---

## 📝 チェックリスト（フロント実装）

- [ ] Q1: lesson_id でリクエストしている
- [ ] Q2: JWT から user_id を取得して API 呼び出ししている
- [ ] Q3: userId と username の両方を保存・使い分けしている
- [ ] Q4: ユーザー登録時に discord_id を送信している
- [ ] Q5: トークン更新を 14-15 分ごとに実行している
- [ ] Q6: ログアウト時にサーバーと localStorage をクリアしている
- [ ] Q7: 認証管理クラスで一元管理している

---

**最終更新**: 2026-02-10
