# ファイル構造

このドキュメントは `src` 配下の主要なフォルダ構成と、それぞれの役割をまとめたメモです。

## 実際の構造

```txt
src/
  app/
    main.tsx
    AppLayout.tsx
    AppRoutes.tsx
    ProtectedRoute.tsx

  features/
    auth/
      api.ts

    progress/
      api.ts
      events.ts
      selectors.ts
      storage.ts
      types.ts
      useProgress.ts

    course/
      courseData.ts
      courseProgress.ts
      courseTypes.ts
      documentRoutes.tsx

  pages/
    MainPage.tsx
    Login/
    MyPage/
    NotFound/
    BugReport/
    documents/
      step1/
      step2/
      step3/
      step4/
      step5/
      step6/
      step7/

  layouts/
    Header.tsx
    Footer.tsx
    Topbar.tsx
    TopbarWrapper.tsx
    Format.module.css
    Sidebar/

  components/
    ProgressBar.tsx
    ProgressCircle.tsx
    Overlay/
    documents/
    mainpage/

  assets/
  shared/
    constants.ts
  styles/
    index.css
  types/
```

## Folder Roles

### `app/`

アプリ全体の起動、ルーティング、認証ガード、共通レイアウトを置く場所です。

- `main.tsx`: React アプリのエントリーポイント
- `AppLayout.tsx`: Topbar / Sidebar / main 領域などアプリ全体の骨組み
- `AppRoutes.tsx`: アプリ全体の URL 定義
- `ProtectedRoute.tsx`: ログインが必要なページを守るための route wrapper

### `features/`

機能単位のロジックを置く場所です。UI よりも、データ取得、保存、計算、ドメインルールを中心にまとめます。

### `features/auth/`

認証に関する処理を置きます。

- `api.ts`: ログイン、登録、トークン更新、ログアウト API

### `features/progress/`

講座の進捗に関する処理を置きます。

- `api.ts`: 進捗取得・更新 API
- `events.ts`: 進捗更新イベントの発火・購読
- `selectors.ts`: 進捗データから完了数や完了状態を計算する純粋関数
- `storage.ts`: `localStorage` の `progressData` 読み書き
- `types.ts`: 進捗データの型
- `useProgress.ts`: React コンポーネントから進捗を購読する hook

### `features/course/`

教材構造に関する処理を置きます。

- `courseData.ts`: section、lesson、タイトル、path などの教材メタ情報
- `courseProgress.ts`: section/page と lesson id の変換
- `courseTypes.ts`: 教材メタ情報の型
- `documentRoutes.tsx`: 教材ページの route 生成

### `pages/`

URL に対応する画面を置く場所です。

- `MainPage.tsx`: 講座一覧ページ
- `Login/`: ログイン・登録画面
- `MyPage/`: マイページ
- `NotFound/`: 404 ページ
- `BugReport/`: バグ報告ページ
- `documents/`: 各教材ページ本文

### `layouts/`

ページ全体の枠組みや、複数ページで共通する大きな表示領域を置きます。

- `Header.tsx`
- `Footer.tsx`
- `Topbar.tsx`
- `TopbarWrapper.tsx`
- `Sidebar/`: Sidebar 本体、ナビゲーション、進捗表示、SidebarContext
- `Format.module.css`: 教材ページ共通の本文レイアウト用 CSS

### `components/`

ページや layout の中で使う UI 部品を置きます。

- `ProgressBar.tsx`: 横型の進捗バー
- `ProgressCircle.tsx`: 円形の進捗表示
- `Overlay/`: ポータルを使ったオーバーレイ表示
- `documents/`: 教材ページ内で使う部品
- `mainpage/`: メインページ内で使う部品

### `assets/`

アプリ共通で使う静的アセットを置きます。

教材ページ固有の画像は、基本的に各教材ページのフォルダ内に置きます。

### `shared/`

複数 feature から参照される横断的な定数や小さな共有ロジックを置きます。

- `constants.ts`: active section 数や section ごとの lesson 数など、教材データ由来の共有定数

### `styles/`

アプリ全体に効く CSS を置きます。

- `index.css`: グローバル CSS

### `types/`

外部ライブラリの型補完など、特定 feature に閉じない型定義を置きます。

進捗など feature に閉じる型は `features/progress/types.ts` のように feature 配下へ置きます。

## 作業項目と見るべき場所

- ログイン・登録 API を触る: `features/auth/`
- 進捗の取得・保存・計算を触る: `features/progress/`
- 講座を追加する: `features/course/courseData.ts` と `features/course/documentRoutes.tsx`
- 講座本文を編集する: `pages/documents/`
- URL を追加・変更する: `app/AppRoutes.tsx`
- Sidebar を触る: `layouts/Sidebar/`
- メインページの講座一覧表示を触る: `pages/MainPage.tsx` または `components/mainpage/`
- 講座ページ共通部品を触る: `components/documents/`
