# Refactoring Plan

src 配下をファイルレベルで整理するための作業メモ。
機能追加はせず、既存の挙動を保ったまま段階的に責務を分ける。

Git commit は作業者が行うため、各ステップ完了時点で差分を確認できる状態にする。

## Step 1: 進捗読み込みの共通化

目的:
- `progressData` の localStorage 読み込み処理を共通化する。
- `progressUpdated` イベントの発火・購読を一箇所に寄せる。

候補ファイル:
- `src/progress/progressStorage.ts`
- `src/progress/progressEvents.ts`
- `src/progress/useProgress.ts`

置き換え対象:
- `src/layouts/Sidebar.tsx`
- `src/pages/mypage.tsx`
- `src/components/mainpage/PageLinkButton.tsx`
- `src/components/mainpage/MainPageSection.tsx`
- `src/components/documents/CompleteButton.tsx`

完了条件:
- localStorage の `progressData` 読み込みが各コンポーネントに重複していない。
- `progressUpdated` のイベント名文字列が散らばっていない。
- UI の表示と完了判定が既存通り動く。

## Step 2: 進捗計算ロジックの整理

目的:
- 進捗計算を UI から切り離す。
- storage 依存の処理と純粋な計算処理を分ける。

候補ファイル:
- `src/progress/progressSelectors.ts`
- `src/course/courseProgress.ts`

移動・整理対象:
- `src/utils/progressUtils.ts`
- `src/context/ManageProgress.tsx` の `isLessonCompleted`

方針:
- `getLessonId` / `getSectionPageFromLessonId` は教材構造に依存するため `course` 側へ寄せる候補。
- `countCompletedLessons` / `calculateCompletedLessons` / `isLessonCompletedById` は `progressSelectors` に寄せる候補。

完了条件:
- 進捗の計算関数がコンポーネントから直接実装されていない。
- import 元の責務が読みやすい名前になっている。

## Step 3: 教材メタ情報の一元化

目的:
- MainPage、Sidebar、ルート、lessonCount の二重管理を減らす。
- 教材ページ追加時に編集する場所を減らす。

候補ファイル:
- `src/course/courseTypes.ts`
- `src/course/courseData.ts`

含めたい情報:
- section id
- section title
- section description
- lessons
- lesson number
- lesson title
- lesson path

置き換え対象:
- `src/pages/MainPage.tsx`
- `src/layouts/Sidebar.tsx`
- `src/utils/constants.ts`

完了条件:
- MainPage のページリンクが `courseData` から生成される。
- Sidebar の section 一覧が `courseData` から生成される。
- lessonCount を手で複数箇所に書かなくてよい。

## Step 4: API 関数を context から分離

目的:
- `context` 配下には本当に React Context のファイルだけを置く。
- 認証 API と進捗 API を明確に分ける。

候補ファイル:
- `src/api/authApi.ts`
- `src/api/progressApi.ts`
- `src/auth/authStorage.ts`
- `src/auth/authTypes.ts`

移動対象:
- `src/context/AuthContext.tsx`
- `src/context/ManageProgress.tsx`

方針:
- 既存 import を一気に壊さないため、必要なら旧ファイルから新ファイルを re-export する。
- その後、利用側の import を段階的に新しいパスへ移す。

完了条件:
- API 呼び出し関数が `context` 配下に残っていない。
- `SidebarContext.tsx` のような実際の Context だけが `context` に残る。

## Step 5: ルートと Sidebar のファイル分割

目的:
- 大きくなった表示コンポーネントとルート定義を読みやすくする。
- 教材ページ追加時の変更箇所を明確にする。

候補ファイル:
- `src/routes/AppRoutes.tsx`
- `src/routes/documentRoutes.tsx`
- `src/layouts/Sidebar/Sidebar.tsx`
- `src/layouts/Sidebar/SidebarProgress.tsx`
- `src/layouts/Sidebar/SidebarNav.tsx`
- `src/layouts/Sidebar/Sidebar.module.css`

整理対象:
- `src/routes/Route.tsx`
- `src/routes/documents/Section*.tsx`
- `src/layouts/Sidebar.tsx`
- `src/layouts/Sidebar.module.css`

方針:
- ルートは教材コンポーネント import の都合があるため、まずは route 配列化から始める。
- Sidebar は Step 1-3 の後に分割する。進捗ロジックを先に外すと UI 分割が安全になる。

完了条件:
- `Sidebar.tsx` が開閉状態と全体レイアウト中心になる。
- Sidebar の進捗表示とナビゲーションが別ファイルになる。
- ルート定義の重複が減り、教材ページ追加時の編集箇所が明確になる。

## Verification

各ステップで確認すること:
- `npm run build`
- `npm run lint`
- ログイン前後の表示
- 講座完了ボタン押下後の MainPage / MyPage / Sidebar の進捗更新
- 教材ページへの遷移
- 404 ページへの遷移

