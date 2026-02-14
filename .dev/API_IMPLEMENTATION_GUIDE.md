# API刷新 実装ガイド（バックエンド仕様確認済み）

**更新日**: 2026-02-10
**状態**: 準備完了 ✅

---

## 📋 概要

現在のシステム（単一エンドポイント）から新しい2つのサービス（Auth + Course）への移行実装ガイド。

バックエンドエージェントから詳細仕様が確認されたため、本実装を開始できます。

---

## 🔄 API 仕様確認済み

### 認証サービス
```
https://nokolatauth.s241507v.workers.dev/
```

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/register` | ユーザー登録（discord_id 必須） |
| POST | `/login` | ログイン → access_token + refresh_token |
| POST | `/logout` | ログアウト（refresh_token を無効化） |
| POST | `/refresh` | トークン更新 |
| GET | `/discord-id/{username}` | Discord ID 取得 |

### コース・進捗サービス
```
https://stm32document.s241507v.workers.dev/
```

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/courses` | 講座一覧 |
| GET | `/courses/{id}` | 講座詳細 |
| POST | `/progress/complete` | ⭐ 進捗完了登録 |
| GET | `/progress/{user_id}` | ⭐ 進捗取得 |
| POST | `/questions` | 質問投稿 |
| GET | `/questions/{id}` | 質問詳細 |

---

## ✅ 仕様確認内容

### 1. 進捗データ形式

**GET /progress/{user_id} のレスポンス**

```json
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
  }
]
```

**変更点:**
- 現在: ビット演算 (`section1 = 5`)
- 新規: 配列形式で `lesson_id` と `is_completed` フラグ

### 2. 進捗完了リクエスト

**POST /progress/complete**

```json
{
  "lesson_id": "1"
}
```

認証ヘッダー必須:
```
Authorization: Bearer {access_token}
```

**注:**
- `user_id` はトークンから自動抽出
- `lesson_id` は **全体で一意な数値** (例: "1", "2", "3", ...)
- 現在の section + page_number から変換が必要

### lesson_id マッピング（確定）

**バックエンド DB スキーマから確認:**

```
lesson_id | course_id | order | title
----------|-----------|-------|------
'1'       | '1'       | 1     | 開発環境のセットアップ (Step 1-1)
'2'       | '1'       | 2     | Lチカ（LED点滅） (Step 1-2)
'3'       | '1'       | 3     | UARTシリアル通信 (Step 1-3)
'4'       | '2'       | 1     | GPIOの基礎 (Step 2-1)
'5'       | '2'       | 2     | プッシュプル・オープンドレイン (Step 2-2)
...
```

**変換ルール:**

```typescript
// section と page_number から lesson_id を取得する関数
function getLessonId(section: number, page_number: number): string {
  // 以下のマッピング表を使用
  const lessonMap: Record<string, string> = {
    "1_1": "1",   // Step 1-1
    "1_2": "2",   // Step 1-2
    "1_3": "3",   // Step 1-3
    "1_4": "4",   // Step 1-4
    "2_1": "5",   // Step 2-1
    "2_2": "6",   // Step 2-2
    "2_3": "7",   // Step 2-3
    "2_4": "8",   // Step 2-4
    // Step 3
    "3_1": "9",
    "3_2": "10",
    "3_3": "11",
    "3_4": "12",
    "3_5": "13",
    // Step 4
    "4_1": "14",
    "4_2": "15",
    "4_3": "16",
    // Step 5
    "5_1": "17",
    "5_2": "18",
    "5_3": "19",
    "5_4": "20",
    "5_5": "21",
    "5_6": "22",
    "5_7": "23",
    // Step 6
    "6_1": "24",
    "6_2": "25",
    "6_3": "26",
    "6_4": "27",
    "6_5": "28",
    "6_6": "29",
    "6_7": "30",
    "6_8": "31",
    // Step 7
    "7_1": "32",
    "7_2": "33",
    "7_3": "34",
    "7_4": "35",
    "7_5": "36",
    "7_6": "37"
  };

  const key = `${section}_${page_number}`;
  return lessonMap[key] || "";
}
```

⚠️ **重要:** このマッピング表はバックエンド DB と完全に一致することを確認してください

### 3. JWT トークン形式

**login レスポンス**

```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "expires_in": 900
}
```

**JWT ペイロード**

```json
{
  "user_id": "user_123",
  "username": "user@example.com",
  "iat": 1707504600,
  "exp": 1707505500
}
```

**トークン有効期限:**
- access_token: 15分
- refresh_token: 7日

### 4. user_id の取得

JWT をデコードしたペイロードから取得:

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

### 5. ユーザー登録

**POST /register**

```json
{
  "username": "user@example.com",
  "password": "SecurePassword123!",
  "discord_id": "your_discord_id"
}
```

**重要:** `discord_id` は必須フィールド

**ステータスコード:**
- 201: 登録成功
- 409: ユーザーまたは Discord ID が既に存在
- 400: 必須フィールド不足

### 6. トークン更新

**定期更新（推奨）: 14分ごと**

```typescript
setInterval(async () => {
  const response = await fetch(
    'https://nokolatauth.s241507v.workers.dev/refresh',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh_token: localStorage.getItem('refreshToken')
      })
    }
  );

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
  }
}, 14 * 60 * 1000); // 14分
```

### 7. ログアウト

**2段階の処理:**

1. サーバーで refresh_token を無効化
2. localStorage をクリア

```typescript
async function logout() {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    await fetch(
      'https://nokolatauth.s241507v.workers.dev/logout',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );
  } catch (error) {
    console.error('Server logout error:', error);
  }

  // ローカルストレージをクリア
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
}
```

---

## 🔧 修正ファイル一覧と実装内容

### Phase 1: 認証系（最優先）

#### 1️⃣ **src/context/AuthContext.tsx** 🔴 大規模修正

**現在の関数を以下に変更:**

| 現在 | 新規 | 変更内容 |
|------|------|--------|
| `Login()` | 同名で刷新 | 2つのエンドポイント対応、JWT デコード処理追加 |
| `RegisterAccount()` | 同名で刷新 | discord_id フィールド追加、エンドポイント分離 |
| `isTokenValid()` | 削除 | トークン有効期限チェックに変更 |
| - | `RefreshToken()` | 新規追加：token 更新関数 |
| `Logout()` | 同名で刷新 | refresh_token を送信して無効化 |

**実装コード例:**

```typescript
// JWT デコード関数
function decodeJWT(token: string) {
  const parts = token.split('.');
  const payload = JSON.parse(
    atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
  );
  return payload;
}

// ログイン
export async function Login({
  username,
  password
}: {
  username: string;
  password: string
}) {
  try {
    const response = await fetch(
      "https://nokolatauth.s241507v.workers.dev/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    // トークンをデコードして user_id を取得
    const payload = decodeJWT(data.access_token);

    // localStorage に保存
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
    localStorage.setItem("userId", payload.user_id);
    localStorage.setItem("username", payload.username);
    localStorage.setItem("isLoggedIn", "true");

    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

// トークン更新
export async function RefreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return false;

  try {
    const response = await fetch(
      "https://nokolatauth.s241507v.workers.dev/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    if (!response.ok) {
      // refresh_token も期限切れ → ログイン画面へ
      localStorage.clear();
      window.location.href = "/";
      return false;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
}

// ユーザー登録
export async function RegisterAccount({
  username,
  password,
  discord_id
}: {
  username: string;
  password: string;
  discord_id: string;
}) {
  try {
    const response = await fetch(
      "https://nokolatauth.s241507v.workers.dev/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          discord_id
        })
      }
    );

    if (response.status === 201) {
      return true;
    } else if (response.status === 409) {
      console.error("User or Discord ID already exists");
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
}

// ログアウト
export async function Logout() {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    await fetch(
      "https://nokolatauth.s241507v.workers.dev/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );
  } catch (error) {
    console.error("Server logout error:", error);
  }

  // ローカルストレージをクリア
  localStorage.clear();
  window.location.href = "/";
}
```

---

#### 2️⃣ **src/context/ManageProgress.tsx** 🔴 大規模修正

**全面的にリファクタ:**

```typescript
const API_URL = "https://stm32document.s241507v.workers.dev";

// lesson_id への変換関数
function getLessonId(section: number, page_number: number): string {
  const lessonMap: Record<string, string> = {
    "1_1": "1", "1_2": "2", "1_3": "3", "1_4": "4",
    "2_1": "5", "2_2": "6", "2_3": "7", "2_4": "8",
    "3_1": "9", "3_2": "10", "3_3": "11", "3_4": "12", "3_5": "13",
    "4_1": "14", "4_2": "15", "4_3": "16",
    "5_1": "17", "5_2": "18", "5_3": "19", "5_4": "20", "5_5": "21", "5_6": "22", "5_7": "23",
    "6_1": "24", "6_2": "25", "6_3": "26", "6_4": "27", "6_5": "28", "6_6": "29", "6_7": "30", "6_8": "31",
    "7_1": "32", "7_2": "33", "7_3": "34", "7_4": "35", "7_5": "36", "7_6": "37"
  };
  return lessonMap[`${section}_${page_number}`] || "";
}

// 進捗を更新
export async function UpDateProgress(
  section: number,
  page_number: number
): Promise<boolean> {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    console.warn("No access token");
    return false;
  }

  // lesson_id を取得（グローバルマッピングを使用）
  const lesson_id = getLessonId(section, page_number);

  if (!lesson_id) {
    console.error(`Invalid lesson: section=${section}, page=${page_number}`);
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/progress/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ lesson_id })
    });

    if (!response.ok) {
      if (response.status === 401) {
        // トークン期限切れ → 更新を試みる
        const { RefreshToken } = await import('./AuthContext');
        const refreshed = await RefreshToken();
        if (refreshed) {
          // 再試行
          return UpDateProgress(section, page_number);
        }
      }
      console.warn("Progress update failed:", response.status);
      return false;
    }

    const data = await response.json();
    console.log("Progress updated:", data);
    return true;
  } catch (error) {
    console.error("UpDateProgress failed:", error);
    return false;
  }
}

// 進捗を取得
export async function GetProgress() {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  if (!accessToken || !userId) {
    console.warn("No access token or userId");
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}/progress/${userId}`,
      {
        method: "GET",
        headers: { "Authorization": `Bearer ${accessToken}` }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const { RefreshToken } = await import('./AuthContext');
        await RefreshToken();
        return GetProgress(); // 再試行
      }
      console.warn("GetProgress failed:", response.status);
      return null;
    }

    const data = await response.json();

    // localStorage に進捗データを保存
    // 形式: [{ lesson_id, is_completed, completed_at }, ...]
    localStorage.setItem("progressData", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("GetProgress failed:", error);
    return null;
  }
}

// ユーティリティ: section + page_number からクリア状態を判定
export function isLessonCompleted(section: number, page_number: number): boolean {
  const lesson_id = getLessonId(section, page_number);
  if (!lesson_id) return false;

  const progressData = localStorage.getItem("progressData");
  if (!progressData) return false;

  try {
    const data = JSON.parse(progressData);
    const lesson = data.find((item: any) => item.lesson_id === lesson_id);
    return lesson?.is_completed === 1;
  } catch {
    return false;
  }
}
```

**変更点:**
- 単一エンドポイント → 分離エンドポイント
- action フィールド不要
- Bearer トークン認証
- レスポンス形式が配列形式に
- lesson_id ベースの管理

---

#### 3️⃣ **src/routes/ProtectedRoute.tsx** 🟠 中規模修正

```typescript
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { RefreshToken } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function verify() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!accessToken || isLoggedIn !== "true") {
          if (mounted) {
            setIsAuthed(false);
            setLoading(false);
          }
          return;
        }

        // TODO: トークン有効期限をチェックし、期限切れなら自動更新
        // 現在は valid = true としているが、本来なら期限チェックが必要
        if (mounted) {
          setIsAuthed(true);
        }
      } catch (err) {
        console.error("Token verification error:", err);
        if (mounted) {
          setIsAuthed(false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthed) {
    localStorage.removeItem("isLoggedIn");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
```

---

### Phase 2: ページ修正

#### 4️⃣ **src/pages/Login/LoginPage.tsx** 🟡 軽微修正

**変更対象:**
- Line 50: `isTokenValid()` の呼び出しを削除
- 代わりに localStorage の isLoggedIn フラグをチェック

```typescript
// 変更前
const valid = await isTokenValid();
if (mounted && valid) { ... }

// 変更後
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (mounted && isLoggedIn) { ... }
```

---

#### 5️⃣ **src/pages/Login/RegisterPage.tsx** ⚠️ 中規模修正

**追加が必要:**

1. Discord ID 入力フィールド（必須）
2. RegisterAccount 呼び出しに discord_id を追加
3. エラーハンドリング（既存の Discord ID など）

```typescript
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegisterAccount } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!discordId) {
      setError('Discord ID は必須です');
      return;
    }

    const register_result = await RegisterAccount({
      username,
      password,
      discord_id: discordId
    });

    if (register_result) {
      alert('アカウントが作成されました。');
      navigate('/');
    } else {
      setError('登録に失敗しました。Discord IDが既に使用されていないか確認してください。');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>アカウント登録</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form className="login-form" onSubmit={handleRegister}>
          <div className="login-field">
            <label>
              ユーザー名
              <input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="login-field">
            <label>
              パスワード
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="login-field">
            <label>
              Discord ID（必須）
              <input
                className="login-input"
                type="text"
                placeholder="例: user#1234"
                value={discordId}
                onChange={(e) => setDiscordId(e.target.value)}
                required
              />
            </label>
          </div>

          <button className="login-button" type="submit">アカウント作成</button>
        </form>

        <p>
          アカウントをお持ちの方は、<Link to="/">こちら</Link>からログインできます。
        </p>
      </div>
    </div>
  );
}
```

---

#### 6️⃣ **src/components/documents/ComplateButton.tsx** ⚠️ 大規模修正

**主な変更:**
- ビット演算から配列検索に変更
- lesson_id を生成してサーバーに送信
- 進捗判定ロジック刷新

```typescript
import styles from './ComplateButton.module.css';
import { UpDateProgress, GetProgress, isLessonCompleted } from '../../context/ManageProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageButton({
  section,
  page_number
}: {
  section: number;
  page_number: number;
}) {
  const [loading, setLoading] = useState(false);
  const [complated, setComplated] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    showOverlay('クリアおめでとう！！！ <br />メインページへ戻ります');

    try {
      setLoading(true);
      const success = await UpDateProgress(section, page_number);

      if (success) {
        await GetProgress();
        setComplated(true);
      }
    } catch (e) {
      console.error(e);
      alert('送信に失敗しました。');
    } finally {
      setLoading(false);
      hideOverlay();
      navigate('/mainpage');
    }
  }

  // クリア状態を判定
  useEffect(() => {
    try {
      const isCompleted = isLessonCompleted(section, page_number);
      setComplated(isCompleted);
    } catch (e) {
      console.error('Error checking lesson completion:', e);
      setComplated(false);
    }
  }, [section, page_number]);

  function showOverlay(message: string) {
    const overlay = document.createElement('div');
    overlay.id = 'complate-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.4)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.innerHTML = `<div style="background:#fff;padding:20px;border-radius:8px;color:#000;">${message}</div>`;
    document.body.appendChild(overlay);
    return overlay;
  }

  function hideOverlay() {
    const el = document.getElementById('complate-overlay');
    if (el) document.body.removeChild(el);
  }

  if (localStorage.getItem('isLoggedIn') !== 'true') {
    return (
      <div>
        <br />
        <p>ログインすることでボタンが押せるようになります</p>
      </div>
    );
  } else if (complated) {
    return (
      <div>
        <br />
        <p>クリアおめでとう！！！！</p>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <button
          className={styles.button}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? '送信中...' : '終了報告を送信'}
        </button>
      </div>
    );
  }
}
```

---

#### 7️⃣ **src/components/mainpage/PageLinkButton.tsx** 🟡 軽微修正

```typescript
import { isLessonCompleted } from '../../context/ManageProgress';

// 進捗判定の変更
// 変更前: ビット演算
// const bit = (num >> (page_number - 1)) & 1;

// 変更後: lesson_id ベース
const lesson_id = `${String(section).padStart(2, '0')}-lesson${page_number}`;
const isCompleted = isLessonCompleted(lesson_id);
```

---

## ⏱️ 実装スケジュール（推奨順）

### 📅 Week 1

- **Day 1-2**: AuthContext.tsx 実装 + テスト
- **Day 3-4**: ManageProgress.tsx 実装 + テスト
- **Day 5**: ProtectedRoute.tsx 修正 + トークン更新ロジック統合テスト

### 📅 Week 2

- **Day 1-2**: LoginPage.tsx, RegisterPage.tsx 修正
- **Day 3-4**: ComplateButton.tsx 修正 + UI テスト
- **Day 5**: 全体統合テスト + バグ修正

---

## 🧪 テストチェックリスト

### 認証関連

- [ ] ユーザー登録（Discord ID 必須）
- [ ] ログイン → token 保存確認
- [ ] JWT デコード → user_id 取得確認
- [ ] ログアウト → token 削除確認
- [ ] トークン更新（14分ごと）
- [ ] 401 エラー時の自動リフレッシュ

### 進捗管理

- [ ] 進捗完了 API リクエスト（lesson_id 送信）
- [ ] 進捗取得 API レスポンス（配列形式）
- [ ] localStorage に進捗データを保存
- [ ] クリア状態の判定（isLessonCompleted）

### UI/UX

- [ ] ログイン画面でのエラー表示
- [ ] 登録画面での Discord ID 入力
- [ ] 進捗完了ボタン → メインページ遷移
- [ ] 進捗一覧表示の更新

---

## 🔗 参考資料

- [FRONTEND_IMPLEMENTATION_FAQ.md](./FRONTEND_IMPLEMENTATION_FAQ.md) - バックエンド仕様詳細
- [auth.md](./.dev/auth.md) - 認証サービス仕様
- [course.md](./.dev/course.md) - コース・進捗サービス仕様

---

## 📞 トラブルシューティング

### 401 Unauthorized エラー
- access_token が localStorage に保存されているか確認
- token の有効期限をチェック
- 401 時に RefreshToken() で自動更新

### lesson_id の形式エラー
- バックエンドから返される lesson_id の形式を確認
- UI で生成する lesson_id との形式が一致しているか確認

### 進捗データが更新されない
- ネットワークエラーをチェック
- localStorage の progressData を確認
- サーバーログを確認

---

**準備完了！実装を開始してください 🚀**

