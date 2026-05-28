# 教材ページの作り方

このドキュメントは、新しい教材ページを追加したり、既存ページを編集する人向けのメモです。

## まず見る場所

教材ページを追加・編集するときは、主に次の場所を触ります。

```txt
src/pages/documents/stepX/YY_PageName/YY_PageName.tsx
src/features/course/courseData.ts
src/features/course/documentRoutes.tsx
```

画像を使う場合は、基本的にその教材ページと同じフォルダに置きます。

```txt
src/pages/documents/step5/01_GetAccel/
  01_GetAccel.tsx
  pin.png
  pin_name.png
  pin_number.png
```

## 教材ページの基本形

教材ページは、だいたい次の形で書かれています。

```tsx
import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import sampleImage from './sample.png';

export default function StepX_YY_PageName() {
  return (
    <div>
      <Topbar pageTitle="StepX: ページの大きなタイトル" />
      <Header page_count="1. " title="ページタイトル" />

      <p>本文を書きます。</p>

      <div className={style.title}>今回やること</div>
      <div className={style.note}>
        <ol>
          <li>内容 1</li>
          <li>内容 2</li>
          <li>進捗報告ボタンを押す</li>
        </ol>
      </div>

      <div className={style.title}>1. 見出し</div>
      <p>説明文を書きます。</p>

      <figure>
        <img src={sampleImage} alt="画像の説明" className={style.image} width="75%" />
        <figcaption>画像の補足説明</figcaption>
      </figure>

      <CppCodeRender code={`// C++ のコードを書く
void loop() {
  // ...
}`} />

      <CompleteButton section={1} page_number={1} />
      <FooterPageRoute prev="/前のページpath" next="/次のページpath" />
      <Footer />
    </div>
  );
}
```

## よく使う共通コンポーネント

### `Topbar`

ページ上部のバーです。

```tsx
<Topbar pageTitle="Step5: 加速度データの取得" />
```

`pageTitle` には、そのページがどの Step のどの内容か分かる名前を書きます。

### `Header`

教材ページ本文の先頭に出す見出しです。

```tsx
<Header page_count="1. " title="加速度データの取得" />
```

- `page_count`: セクション内のページ番号
- `title`: ページタイトル

### `Footer`

ページ下部の共通フッターです。

```tsx
<Footer />
```

### `FooterPageRoute`

前後ページとメインページへのリンクを出します。

```tsx
<FooterPageRoute
  prev="/Step5_01_GetAccel"
  next="/Step5_03_AngleFromAccel"
/>
```

- `prev`: 前のページの path
- `next`: 次のページの path

最初のページや最後のページでは、前後のつながりが自然になるように既存ページを参考にしてください。

### `CompleteButton`

教材ページの完了報告ボタンです。

```tsx
<CompleteButton section={5} page_number={1} />
```

- `section`: Step 番号
- `page_number`: Step 内のページ番号

この値は `courseData.ts` に書く lesson の `number` と合わせます。

### `CppCodeRender`

C++ のコードをシンタックスハイライト付きで表示します。

```tsx
<CppCodeRender code={`#include "wrapper.hpp"

void init() {
  HAL_Delay(1000);
}
`} />
```

長いコードはテンプレート文字列で書くと読みやすいです。

## レイアウト用 CSS

教材本文では、主に `Format.module.css` のクラスを使います。

```tsx
import style from '../../../../layouts/Format.module.css';
```

### 見出し

```tsx
<div className={style.title}>1. ピンの設定</div>
```

章ごとの見出しに使います。

### 補足・注意書き

```tsx
<div className={style.note}>
  <p>ここに補足や注意を書きます。</p>
</div>
```

手順、注意、補足、要点のまとまりに使います。

### 表

```tsx
<table className={style.table}>
  <thead>
    <tr>
      <th>項目</th>
      <th>内容</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GPIOA</td>
      <td>GPIO の種類</td>
    </tr>
  </tbody>
</table>
```

### 折りたたみ

```tsx
<details className={style.details}>
  <summary className={style.summary}>もっと詳しく</summary>
  <p>追加説明を書きます。</p>
</details>
```

発展的な内容や補足説明に使います。

### 画像

```tsx
import pinImage from './Pin.png';

<figure>
  <img src={pinImage} alt="PA5 に LED が割り当てられている画面" className={style.image} width="75%" />
  <figcaption>PA5 が LED 用に割り当てられている</figcaption>
</figure>
```

画像はページと同じフォルダに置き、`alt` には画像の意味が分かる説明を書きます。

## ページ追加時に必要な登録

新しい教材ページを作っただけでは、メインページやルートには出ません。次の 2 箇所に登録します。

### 1. `courseData.ts` に教材情報を追加

場所:

```txt
src/features/course/courseData.ts
```

例:

```ts
{
  number: 9,
  path: '/Step6_09_NewLesson',
  title: '新しい教材タイトル'
}
```

`path` は実際の route と一致させます。

### 2. `documentRoutes.tsx` にコンポーネントを追加

場所:

```txt
src/features/course/documentRoutes.tsx
```

import を追加します。

```tsx
import Step6_09_NewLesson from '../../pages/documents/step6/09_NewLesson/09_NewLesson';
```

`documentComponents` に path とコンポーネントを追加します。

```tsx
'/Step6_09_NewLesson': Step6_09_NewLesson,
```

## ページ追加のチェックリスト

1. `pages/documents/stepX/YY_PageName/YY_PageName.tsx` を作る
2. 画像があれば同じフォルダに置く
3. `Topbar` / `Header` / 本文 / `CompleteButton` / `FooterPageRoute` / `Footer` を入れる
4. `courseData.ts` に lesson を追加する
5. `documentRoutes.tsx` に import と component map を追加する
6. `CompleteButton` の `section` と `page_number` が `courseData.ts` と一致しているか確認する
7. `FooterPageRoute` の `prev` / `next` が正しいか確認する
8. `npm run build` で壊れていないか確認する

## 書き方の方針

- 1ページは「今回やること」から始めると読みやすいです。
- 大きな章は `style.title` を使います。
- 注意や補足は `style.note` にまとめます。
- コードは `CppCodeRender` を使います。
- 画像には必ず `alt` を書きます。
- ページ末尾には基本的に `CompleteButton` と `FooterPageRoute` と `Footer` を置きます。
