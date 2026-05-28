# 開発環境の作り方

このプロジェクトは Docker + Dev Container を使って開発します。

## 前提

以下をインストールしておきます。

- Docker
- VS Code
- VS Code 拡張機能: Dev Containers

## Dev Container の作り方

VS Code の Dev Containers で、公式マークの付いている Node.js + TypeScript のテンプレートを使います。

テンプレートの選び方:

```txt
Dev Containers: Add Dev Container Configuration Files...
→ Node.js & TypeScript
→ 公式マークの付いているテンプレートを選択
```

細かい Node.js のバージョンは、基本的にはテンプレートの標準設定で問題ありません。

## 初回セットアップ

Dev Container の中で依存関係をインストールします。

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

Vite の開発サーバーが起動します。

表示された URL をブラウザで開いて確認します。

## ビルド確認

変更後、必要に応じてビルド確認をします。

```bash
npm run build
```

## Lint 確認

```bash
npm run lint
```

現在、既存の lint エラーが残っている場合があります。新しく変更した箇所で不要なエラーを増やさないように注意してください。

## 開発フロー

このプロジェクトでは、`main` ブランチに CI/CD が組まれています。

基本的な流れ:

1. ローカル環境で変更する
2. `npm run dev` で画面を確認する
3. 必要に応じて `npm run build` を実行する
4. Pull Request を作る
5. レビュー後、`main` ブランチへマージする
6. マージ後、CI/CD によって反映される

## 注意

- 直接 `main` に作業を入れるのではなく、作業用ブランチで変更します。
- 画面で確認してからマージします。
- 教材ページを追加した場合は、`courseData.ts` と `documentRoutes.tsx` の登録漏れがないか確認してください。
