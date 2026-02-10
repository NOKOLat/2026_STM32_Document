# 🎓 STM32 Document Backend

STM32 マイコン講座のためのバックエンド API サーバーです。Cloudflare Workers 上で動作し、講座管理、進捗管理、質問投稿、Discord 通知機能を提供します。

## ✨ 主な機能

- 📚 **講座管理** - 講座とレッスンの管理
- ✅ **進捗管理** - ユーザーのレッスン完了状況を記録
- 💬 **質問機能** - ユーザーが講座について質問を投稿可能
- 🔔 **Discord 通知** - 進捗完了と質問投稿を Discord に自動通知
- 🔐 **JWT 認証** - 安全なユーザー認証

## 🏗️ プロジェクト構成

```
STM32_Document_Backend/
├── src/
│   ├── index.js              # メインルーター
│   ├── routes/
│   │   ├── courses.js        # 講座管理エンドポイント
│   │   ├── progress.js       # 進捗管理エンドポイント
│   │   └── questions.js      # 質問管理エンドポイント
│   └── utils/
│       ├── jwt.js            # JWT 認証ユーティリティ
│       ├── response.js       # レスポンスフォーマット
│       └── webhook.js        # Discord Webhook 送信
├── test/
│   ├── api-test-webhook-integration.js    # Webhook 統合テスト
│   └── WEBHOOK_TEST_GUIDE.md             # テストガイド
├── .ignore/                  # 認証サービス（別リポジトリ）
├── API_GUIDE.md              # API 使用ガイド（開発者向け）
├── TEST_GUIDE.md             # テスト実行ガイド
└── wrangler.toml             # Cloudflare Workers 設定
```

## 🚀 クイックスタート

### 前提条件

- Node.js 16 以上
- Wrangler CLI
- Cloudflare アカウント

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/your-org/STM32_Document_Backend.git
cd STM32_Document_Backend

# 依存関係をインストール
npm install

# Cloudflare に認証
wrangler login

# デプロイ
npm run deploy
```

### テスト実行

```bash
# Webhook 統合テスト
node test/api-test-webhook-integration.js

# テスト詳細は TEST_GUIDE.md を参照
```

## 📡 API エンドポイント

### 講座管理

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/courses` | 講座一覧取得 |
| GET | `/courses/{id}` | 講座詳細取得 |

### 進捗管理

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/progress/complete` | 進捗完了登録 |
| GET | `/progress/{user_id}` | 進捗一覧取得 |

### 質問管理

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/questions` | 質問投稿 |
| GET | `/questions/{id}` | 質問詳細取得 |

詳細は [API_GUIDE.md](API_GUIDE.md) を参照してください。

## 🔐 認証

すべてのエンドポイント（講座取得を除く）は JWT トークンが必須です。

```bash
# ユーザー登録
curl -X POST https://nokolatauth.s241507v.workers.dev/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password",
    "discord_id": "your_discord_id"
  }'

# ログイン
curl -X POST https://nokolatauth.s241507v.workers.dev/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'

# API リクエスト（トークン付き）
curl -X GET https://stm32document.s241507v.workers.dev/courses \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

詳細は [.ignore/readme.md](.ignore/readme.md) を参照してください。

## 🧪 テスト

### テストスイート

| テスト | 説明 | 実行時間 |
|-------|------|--------|
| api-test.js | 基本機能テスト | ~10秒 |
| api-test-scenario.js | シナリオテスト | ~10秒 |
| api-test-webhook-integration.js | Webhook 統合テスト | ~5秒 |

### テスト実行

```bash
# すべてのテストを実行
npm run test

# 単一のテストを実行
node test/api-test-webhook-integration.js
```

詳細は [TEST_GUIDE.md](TEST_GUIDE.md) を参照してください。

## 🔔 Discord 統計

### 進捗完了通知

ユーザーがレッスンを完了すると、以下のメッセージが Discord に送信されます：

```
✅ username さんが「レッスン名」を完了しました!
```

### 質問投稿通知

ユーザーが質問を投稿すると、以下のメッセージが Discord に送信されます：

```
❓ username さんからの質問:
【質問タイトル】
質問内容...
```

## 📚 ドキュメント

- [API_GUIDE.md](API_GUIDE.md) - API 使用ガイド（クライアント向け）
- [TEST_GUIDE.md](TEST_GUIDE.md) - テスト実行ガイド
- [test/WEBHOOK_TEST_GUIDE.md](test/WEBHOOK_TEST_GUIDE.md) - Webhook テストの詳細
- [.ignore/readme.md](.ignore/readme.md) - 認証サービスの使用方法

## 🛠️ 開発

### ローカル開発

```bash
# ローカルで Workers を実行
npm run dev

# 別ターミナルで認証サービスを実行（.ignore ディレクトリ内）
cd .ignore && npm run dev
```

### コードスタイル

このプロジェクトは以下に従います：

- ES6+ 構文
- 非同期処理は async/await を使用
- エラーハンドリングは try-catch で実装

## 📋 環境変数

### Cloudflare Secret

以下の環境変数を Cloudflare シークレットに設定してください：

```
JWT_SECRET              # JWT 署名用の秘密鍵
DISCORD_WEBHOOK_URL     # Discord Webhook URL
```

### バインディング

以下のバインディングを設定してください：

```toml
[[env.production.d1_databases]]
binding = "COURSE_DB"
database_name = "stm32_course"
database_id = "YOUR_DATABASE_ID"

[[env.production.d1_databases]]
binding = "AUTH_DB"
database_name = "auth_service"
database_id = "YOUR_AUTH_DB_ID"
```

## ✅ チェックリスト（本番運用準備）

- [ ] `npm run deploy` でデプロイ完了
- [ ] `node test/api-test.js` で全テスト合格
- [ ] `node test/api-test-scenario.js` で全ステップ合格
- [ ] `node test/api-test-webhook-integration.js` で Webhook テスト合格
- [ ] Discord チャンネルでメッセージ確認
- [ ] API_GUIDE.md をクライアント向けに公開

## 🐛 トラブルシューティング

### 401 Unauthorized エラー

- JWT_SECRET が正しく設定されているか確認
- トークンが有効期限内か確認

### 404 Not Found エラー

- エンドポイントのパスが正しいか確認
- データベースにテストデータが挿入されているか確認

### Discord メッセージが届かない

- DISCORD_WEBHOOK_URL が正しく設定されているか確認
- Webhook URL が有効か確認（Discord サーバーの設定で確認）

詳細は各ドキュメントのトラブルシューティングセクションを参照してください。

## 📞 サポート

問題が発生した場合は、以下の情報と共に報告してください：

- エラーメッセージ
- HTTP ステータスコード
- リクエスト内容
- 期待される動作

## 📝 更新履歴

### v1.0.0 (2026-02-10)

**リリース内容**:
- 講座管理機能の実装
- 進捗管理機能の実装
- 質問管理機能の実装
- Discord Webhook 統合
- テストケースの作成
- API ドキュメンテーション完成

**実装されたエンドポイント**:
- GET /courses
- GET /courses/{id}
- POST /progress/complete
- GET /progress/{user_id}
- POST /questions
- GET /questions/{id}

## 🎯 今後の計画

- [ ] レスポンス速度の最適化
- [ ] キャッシング機能の追加
- [ ] 検索機能の実装
- [ ] レート制限の実装
- [ ] ページング機能の追加

## 📄 ライセンス

このプロジェクトは内部用途を想定しています。
利用規約については、プロジェクト管理者に確認してください。

## 👥 開発チーム

- バックエンド開発: STM32 Project Team
- インフラ: Cloudflare Workers

---

**最終更新**: 2026-02-10
**API Version**: v1.0.0
**本番環境**: https://stm32document.s241507v.workers.dev
