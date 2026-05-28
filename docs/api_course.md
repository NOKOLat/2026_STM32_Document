# Course / Progress API

講座の進捗 API の叩き方と、送る内容・受け取る内容のメモです。

実装ファイル:

```txt
src/features/progress/api.ts
```

関連ファイル:

```txt
src/features/course/courseProgress.ts
src/features/progress/storage.ts
src/features/progress/types.ts
```

ベース URL:

```txt
https://stm32document.s241507v.workers.dev
```

## 共通

進捗 API はログイン後に使います。

認証には `accessToken` を Bearer token として送ります。

```http
Authorization: Bearer <accessToken>
```

`accessToken` はログイン API で取得し、localStorage に保存されています。

```txt
localStorage.accessToken
localStorage.userId
```

`401` が返ってきた場合、実装では `RefreshToken()` を呼び、成功したら同じ API を再試行します。

## lesson_id について

サーバーに送る進捗は `section` と `page_number` ではなく、`lesson_id` です。

アプリ側では次の関数で変換しています。

```ts
getLessonId(section, page_number)
```

実装場所:

```txt
src/features/course/courseProgress.ts
```

変換例:

```txt
Step 1 page 1 -> lesson_id "1"
Step 1 page 4 -> lesson_id "4"
Step 2 page 1 -> lesson_id "5"
Step 3 page 5 -> lesson_id "13"
```

`lesson_id` は、Step 1 から順番にページ数を足し上げた通し番号です。

## Complete Progress

指定した教材を完了済みにします。

実装関数:

```ts
UpDateProgress(section, page_number)
```

エンドポイント:

```http
POST /progress/complete
```

リクエスト例:

```ts
const accessToken = localStorage.getItem('accessToken');

await fetch('https://stm32document.s241507v.workers.dev/progress/complete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    lesson_id: '1'
  })
});
```

送る JSON:

```json
{
  "lesson_id": "1"
}
```

実装上は、呼び出し側からは次のように使います。

```ts
await UpDateProgress(1, 1);
```

この場合、内部で `getLessonId(1, 1)` が呼ばれ、`lesson_id: "1"` が送られます。

受け取る JSON:

```json
{
  "message": "progress updated"
}
```

実装ではレスポンス JSON の中身は UI には使っておらず、console に出して `true` を返します。

失敗時:

- `accessToken` がない場合は `false`
- `lesson_id` を作れない場合は `false`
- `401` の場合は `RefreshToken()` を試し、成功したら再試行
- その他の失敗では `false`

## Get Progress

ユーザーの進捗一覧を取得します。

実装関数:

```ts
GetProgress()
```

エンドポイント:

```http
GET /progress/:userId
```

リクエスト例:

```ts
const accessToken = localStorage.getItem('accessToken');
const userId = localStorage.getItem('userId');

await fetch(`https://stm32document.s241507v.workers.dev/progress/${userId}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

送る path parameter:

```txt
userId
```

受け取る JSON:

```json
[
  {
    "lesson_id": "1",
    "is_completed": 1,
    "completed_at": "2026-01-01T00:00:00.000Z"
  },
  {
    "lesson_id": "2",
    "is_completed": 0,
    "completed_at": null
  }
]
```

TypeScript 型:

```ts
interface ProgressItem {
  lesson_id: string;
  is_completed: number;
  completed_at: string | null;
}

type ProgressData = ProgressItem[];
```

成功時の動き:

1. 進捗配列を受け取る
2. `saveProgressData(data)` で localStorage に保存する
3. data を返す

保存先:

```txt
localStorage.progressData
```

保存される形式:

```json
[
  {
    "lesson_id": "1",
    "is_completed": 1,
    "completed_at": "2026-01-01T00:00:00.000Z"
  }
]
```

失敗時:

- `accessToken` または `userId` がない場合は `null`
- `401` の場合は `RefreshToken()` を試し、成功したら再試行
- その他の失敗では `null`

## Check Completion Locally

API を叩かず、localStorage に保存済みの進捗から完了状態を判定します。

実装関数:

```ts
isLessonCompleted(section, page_number)
```

使用例:

```ts
const completed = isLessonCompleted(5, 1);
```

内部の流れ:

1. `getLessonId(section, page_number)` で `lesson_id` を作る
2. `localStorage.progressData` を読む
3. 対応する `lesson_id` の `is_completed` が `1` なら `true`

## Progress Updated Event

進捗更新後、UI を再読み込みさせるためにイベントを発火しています。

実装ファイル:

```txt
src/features/progress/events.ts
```

イベント名:

```txt
progressUpdated
```

発火:

```ts
notifyProgressUpdated();
```

購読:

```ts
subscribeProgressUpdated(() => {
  // progressData を再読み込み
});
```

通常は直接使わず、React コンポーネント側では `useProgress()` を使います。

```ts
const progressData = useProgress();
```

## 主な呼び出しタイミング

### ログイン成功後

`LoginPage` でログインに成功したあと、進捗を取得します。

```ts
await GetProgress();
```

### 教材完了ボタン押下後

`CompleteButton` で完了報告を送信します。

```ts
const success = await UpDateProgress(section, page_number);

if (success) {
  await GetProgress();
  notifyProgressUpdated();
}
```

## 注意

- `UpDateProgress` は関数名に大文字が混ざっていますが、現在の実装名はこのままです。
- `is_completed` は boolean ではなく `0` または `1` です。
- `completed_at` は未完了の場合 `null` になります。
- `lesson_id` は string として扱います。
