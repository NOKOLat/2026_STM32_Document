# API刷新作業 - 移行調査報告書

## 📋 概要

現在のシステム（単一エンドポイント）から、新しい2つのサービス（Auth + Course）への移行計画書です。

---

## 🔄 現在のシステム vs 新仕様の比較

### 現在のシステム

**API エンドポイント**
```
https://2026stm32document.aoi256jp.workers.dev/
```

**認証方式**
- 単一エンドポイントに POST で action フィールドを含めて叩く
- token を localStorage に保存
- username も localStorage に保存

**使用例**
```typescript
// ログイン
body: JSON.stringify({
  action: "login",
  username: username,
  password: password,
})

// トークン検証
body: JSON.stringify({
  action: "verify_token",
  token: localStorage.getItem("token"),
})

// 進捗更新
body: JSON.stringify({
  action: "update_progress",
  username, token, section, page_number
})
```

**進捗管理方法**
- `section1`, `section2`, ... `section6` という localStorage キーに整数値を保存
- ビット演算で各ページのクリア状態を管理（例：section1 = 5 = `0b0101` = ページ1,3がクリア）
- ComplateButton で `(num >> (page_number - 1)) & 1` でクリア状態判定

**トークン更新方式**
- 常に verify_token で確認
- トークン更新ロジックなし

---

### 新仕様

**API エンドポイント**（2つに分離）

1. **認証サービス** (別リポジトリ)
   ```
   https://nokolatauth.s241507v.workers.dev/
   ```
   - POST `/register` - ユーザー登録
   - POST `/login` - ログイン
   - POST `/logout` - ログアウト
   - POST `/refresh` - トークン更新
   - GET `/discord-id/{username}` - Discord ID取得

2. **コース・進捗サービス** (別リポジトリ)
   ```
   https://stm32document.s241507v.workers.dev/
   ```
   - GET `/courses` - 講座一覧取得
   - GET `/courses/{id}` - 講座詳細取得
   - POST `/progress/complete` - 進捗完了登録 ⭐
   - GET `/progress/{user_id}` - 進捗一覧取得
   - POST `/questions` - 質問投稿
   - GET `/questions/{id}` - 質問詳細取得

**JWT トークン形式**
```typescript
// レスポンス形式
{
  access_token: "eyJhbGc...",     // API アクセス用
  refresh_token: "eyJhbGc...",    // トークン更新用
  expires_in: 86400                // 有効期限（秒）= 24時間
}
```

**認証ヘッダー**
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {access_token}'
}
```

**ステータスコード**
- 201: 成功（作成）
- 200: 成功
- 400: リクエストエラー
- 404: 見つからない
- 409: 競合（ユーザー既存など）

---

## 🔧 修正が必要なファイル一覧

### 1. **src/context/AuthContext.tsx** ⚠️ 大規模修正

**修正内容**
- `Login()` - 新しいエンドポイント対応、access_token + refresh_token の処理
- `RegisterAccount()` - discord_id フィールド追加が必要な可能性
- `Logout()` - refresh_token を送信して無効化
- `isTokenValid()`削除 → 必要に応じて token 有効期限チェックに変更
- **新規追加**: `RefreshToken()` - refresh_token で access_token を更新

**主な変更点**
```typescript
// 現在
const response = await fetch("https://2026stm32document.aoi256jp.workers.dev/", {
  method: "POST",
  body: JSON.stringify({
    action: "login",
    username, password
  })
});
const data = await response.json();
localStorage.setItem("token", data.token);

// 新規
const response = await fetch("https://nokolatauth.s241507v.workers.dev/login", {
  method: "POST",
  body: JSON.stringify({
    username, password
  })
});
const data = await response.json();
localStorage.setItem("access_token", data.access_token);
localStorage.setItem("refresh_token", data.refresh_token);
localStorage.setItem("token_expires_in", data.expires_in);
```

---

### 2. **src/context/ManageProgress.tsx** ⚠️ 大規模修正

**修正内容**
- `UpDateProgress()` 完全リファクタ
  - 新エンドポイント: `POST /progress/complete`
  - Bearer token で認証
  - リクエスト形式変更（ペイロード構造）
  - レスポンス形式変更（ビット演算から別の形式に）

- `GetProgress()` 完全リファクタ
  - 新エンドポイント: `GET /progress/{user_id}`
  - Bearer token で認証
  - 進捗データ形式が変わる可能性

**主な変更点**
```typescript
// 現在
body: JSON.stringify({
  action: "update_progress",
  username, token, section, page_number
})

// 新規
fetch("https://stm32document.s241507v.workers.dev/progress/complete", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${access_token}`
  },
  body: JSON.stringify({
    lesson_id: `step${section}_${page_number}`,  // または別の形式
    // または section, page_number など
  })
})
```

---

### 3. **src/routes/ProtectedRoute.tsx** ⚠️ 中規模修正

**修正内容**
- `isTokenValid()` の削除（AuthContext で削除されるため）
- access_token の有効期限チェックに変更
- refresh_token を使ったトークン更新ロジック追加
- token 検証時に Authorization ヘッダーを使用

**主な変更点**
```typescript
// 現在
const valid = await isTokenValid();

// 新規
const accessToken = localStorage.getItem("access_token");
const expiresIn = parseInt(localStorage.getItem("token_expires_in") || "0");
const isExpired = expiresIn && Date.now() > expiresIn;

if (isExpired) {
  // refresh_token で新しい access_token を取得
  await RefreshToken();
}
```

---

### 4. **src/pages/Login/LoginPage.tsx** ✅ 軽微修正

**修正内容**
- `isTokenValid()` 呼び出し削除 or 代替処理に変更
- 他は比較的変更少ない（成功時の流れは同じ）

**修正対象行**
- Line 50: `isTokenValid()` の呼び出し

---

### 5. **src/pages/Login/RegisterPage.tsx** ⚠️ 中規模修正

**修正内容**
- Discord ID 入力フィールド追加が必要な可能性
- `RegisterAccount()` の呼び出しに discord_id を追加

**検討事項**
- Discord ID は必須か任意か？ (auth.md では必須のように見える)
- UI に discord_id 入力フィールドを追加するか

---

### 6. **src/components/documents/ComplateButton.tsx** ⚠️ 大規模修正

**修正内容**
- `UpDateProgress()` のリクエスト形式が変わる
- API レスポンス形式の処理が変わる可能性
- クリア状態の判定方法が変わる可能性

**修正対象行**
- Line 27: `await UpDateProgress(sec, page_number);`
- Line 54-81: localStorage キーの参照方法（section{N} のビット演算）

**進捗データ形式について**
- 現在：`section1` = `5` (ビット演算)
- 新規：不明確 ⚠️ バックエンド仕様確認必要

---

### 7. **src/pages/MainPage.tsx** ⚠️ 中規模修正

**修捷内容**
- 進捗データの読み込み方法変更
- PageLinkButton のクリア状態判定ロジック変更

---

### 8. **src/components/mainpage/PageLinkButton.tsx** ⚠️ 中規模修正

**修正内容**
- localStorage から進捗情報を取得する方法変更
- ビット演算に依存している部分を修正

---

## ⚠️ 未確認・要確認事項

### 1. **進捗データ形式** - **最優先で確認**
```
現在: localStorage.section1 = 5 (ビット演算)
新規: どのような形式で返ってくるのか？
      - 配列？ [1, 1, 0, 1, ...]
      - オブジェクト？ { "step1_1": true, "step1_2": true, ... }
      - ビット演算のままか？
```
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

### 2. **progress/complete エンドポイントのリクエスト形式** - **優先**
```
以下のどの形式か確認が必要：
- { section: 1, page_number: 1 }
- { lesson_id: "step1_1" }
- { course_id, lesson_id, user_id }
- その他
```

### 3. **progress/{user_id} の user_id** - **優先**
```
- username を使うのか？
- UUID のような ID を使うのか？
- 別途 user_id を取得する必要があるのか？
```

### 4. **ユーザー情報の保存**
```
現在: username を localStorage に保存
新規: user_id の取得・保存が必要になるのか？
```

### 5. **Discord ID の扱い**
```
- ユーザー登録時に必須なのか任意なのか？
- 後から追加・更新できるのか？
- UI に追加する必要があるのか？
```

### 6. **トークン更新タイミング**
```
- 24時間ごとに自動更新するのか？
- ユーザーが手動で更新するのか？
- エラーが出たときに自動更新するのか？
```

### 7. **ログアウト時の処理**
```
- refresh_token を送信して無効化する必要があるのか？
- localStorage をクリアするだけでいいのか？
```

---

## 📊 修正難易度とスケジュール

| ファイル | 難易度 | 優先度 | 依存 |
|---------|--------|--------|------|
| AuthContext.tsx | 🔴 高 | 最高 | - |
| ManageProgress.tsx | 🔴 高 | 最高 | AuthContext |
| ProtectedRoute.tsx | 🟠 中 | 高 | AuthContext |
| ComplateButton.tsx | 🟠 中 | 高 | ManageProgress, 進捗形式確認 |
| RegisterPage.tsx | 🟡 低 | 中 | AuthContext, Discord ID 仕様 |
| LoginPage.tsx | 🟡 低 | 中 | AuthContext |
| MainPage.tsx | 🟡 低 | 中 | ManageProgress |
| PageLinkButton.tsx | 🟡 低 | 中 | ManageProgress |

---

## ✅ 実装の流れ（推奨順序）

1. **auth.md, course.md の詳細仕様確認**
   - 進捗データ形式を確認
   - progress/complete のリクエスト形式を確認
   - その他不明確な項目を整理

2. **AuthContext.tsx の実装**
   - Login, RegisterAccount, RefreshToken, Logout を新仕様対応
   - isTokenValid 削除 or 修正

3. **ManageProgress.tsx の実装**
   - UpDateProgress, GetProgress を新仕様対応
   - 進捗データ形式に合わせた処理

4. **ProtectedRoute.tsx の修正**
   - token 有効期限チェックとリフレッシュロジック

5. **UI コンポーネント修正**
   - ComplateButton.tsx
   - RegisterPage.tsx (Discord ID 対応)
   - LoginPage.tsx (isTokenValid 削除)
   - PageLinkButton.tsx (進捗判定修正)

6. **テスト**
   - 各エンドポイント動作確認
   - token リフレッシュロジック確認
   - 進捗記録・取得動作確認

---

## 🎯 次のステップ

1. ユーザーから以下を確認してもらう：
   - 進捗データの形式（ビット演算？配列？オブジェクト？）
   - progress/complete のリクエスト形式
   - progress/{user_id} の user_id の指定方法
   - Discord ID フィールドの扱い（必須か任意か）
   - token 更新の自動化タイミング

2. course.md 内に API_GUIDE.md がリンクされているので、そちらも確認

3. 確認後、本実装開始

