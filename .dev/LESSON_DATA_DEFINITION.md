# レッスンデータ定義表

フロントエンドから定義した課程構成データ。バックエンド DB に初期データとして投入するためのドキュメント。

**生成日**: 2026-02-10
**総レッスン数**: 37
**コース数**: 7 (各ステップが1コース)

---

## 📊 データ構造

### courses テーブル

```sql
CREATE TABLE courses (
  course_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT
);
```

### lessons テーブル

```sql
CREATE TABLE lessons (
  lesson_id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

---

## 📝 INSERTスクリプト（SQL）

### コース定義

```sql
INSERT INTO courses (course_id, title, description) VALUES
    ('1', 'Step 1 開発環境を用意しよう', 'STM32マイコンの開発環境セットアップとLED制御の基礎'),
    ('2', 'Step 2 PCと通信してみよう', 'UART通信の基本と実装'),
    ('3', 'Step 3 自動投下装置を作ってみよう', '実践的な制御システムの設計と実装'),
    ('4', 'Step 4 センサーを使って距離を測ってみよう', 'センサー通信と距離測定'),
    ('5', 'Step 5 センサーを使って角度を測ってみよう', 'IMUセンサーと角度推定'),
    ('6', 'Step 6 センサーのライブラリを自作してみよう', 'ファームウェア設計とライブラリ実装'),
    ('7', 'Step 7 ソフトウェア設計', 'プログラム設計の理論と実践');
```

### レッスン定義（Step 1）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('1', '1', 1, '講座の進め方', ''),
    ('2', '1', 2, '必要なソフトをインストールしよう', ''),
    ('3', '1', 3, 'プロジェクトを作成しよう', ''),
    ('4', '1', 4, 'LEDをつけてみよう', '');
```

### レッスン定義（Step 2）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('5', '2', 1, 'PCにデータを送ってみよう', ''),
    ('6', '2', 2, 'PCからデータを受け取ってみよう', ''),
    ('7', '2', 3, 'データの取りこぼしをなくすには', ''),
    ('8', '2', 4, '便利なprintfを使いこなそう', '');
```

### レッスン定義（Step 3）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('9', '3', 1, '自動投下装置とは', ''),
    ('10', '3', 2, 'SBUSの読み取り', ''),
    ('11', '3', 3, 'サーボモーター', ''),
    ('12', '3', 4, '赤外線の検出', ''),
    ('13', '3', 5, '自動投下装置の設計', '');
```

### レッスン定義（Step 4）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('14', '4', 1, 'センサーとの通信方法', ''),
    ('15', '4', 2, '超音波センサーで距離を測ってみよう', ''),
    ('16', '4', 3, 'ToFセンサーで距離を測ってみよう', '');
```

### レッスン定義（Step 5）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('17', '5', 1, '加速度データを読んでみよう', ''),
    ('18', '5', 2, '加速度から角度を計算してみよう', ''),
    ('19', '5', 3, 'キャリブレーションをして精度をあげてみよう', ''),
    ('20', '5', 4, '角速度データの取得', ''),
    ('21', '5', 5, '角速度の積分から角度を計算', ''),
    ('22', '5', 6, '相補フィルター', ''),
    ('23', '5', 7, 'Madgwickフィルター', '');
```

### レッスン定義（Step 6）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('24', '6', 1, '構造体でデータをまとめてみよう', ''),
    ('25', '6', 2, 'クラスとは', ''),
    ('26', '6', 3, 'IMUのライブラリを書いてみよう', ''),
    ('27', '6', 4, 'ライブラリを改良してみよう', ''),
    ('28', '6', 5, 'センサー設定に対応しよう', ''),
    ('29', '6', 6, 'Enum Classを使ってみよう', ''),
    ('30', '6', 7, 'I2CとSPIを切り替えできるようにしよう', ''),
    ('31', '6', 8, 'BM1422AGMVのライブラリを作ろう', '');
```

### レッスン定義（Step 7）

```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('32', '7', 1, 'ソフトウェア設計の重要性', ''),
    ('33', '7', 2, '関数と処理の分割 - 基礎', ''),
    ('34', '7', 3, '関数と処理の分割 - 応用', ''),
    ('35', '7', 4, 'マジックナンバーの排除とEnum活用', ''),
    ('36', '7', 5, 'ステートマシン設計 - 基礎', ''),
    ('37', '7', 6, 'ステートマシン設計 - 応用', '');
```

---

## 📋 完全なINSERTスクリプト（一括実行用）

```sql
-- コース定義
INSERT INTO courses (course_id, title, description) VALUES
    ('1', 'Step 1 開発環境を用意しよう', 'STM32マイコンの開発環境セットアップとLED制御の基礎'),
    ('2', 'Step 2 PCと通信してみよう', 'UART通信の基本と実装'),
    ('3', 'Step 3 自動投下装置を作ってみよう', '実践的な制御システムの設計と実装'),
    ('4', 'Step 4 センサーを使って距離を測ってみよう', 'センサー通信と距離測定'),
    ('5', 'Step 5 センサーを使って角度を測ってみよう', 'IMUセンサーと角度推定'),
    ('6', 'Step 6 センサーのライブラリを自作してみよう', 'ファームウェア設計とライブラリ実装'),
    ('7', 'Step 7 ソフトウェア設計', 'プログラム設計の理論と実践');

-- レッスン定義
INSERT INTO lessons (lesson_id, course_id, "order", title, content) VALUES
    ('1', '1', 1, '講座の進め方', ''),
    ('2', '1', 2, '必要なソフトをインストールしよう', ''),
    ('3', '1', 3, 'プロジェクトを作成しよう', ''),
    ('4', '1', 4, 'LEDをつけてみよう', ''),
    ('5', '2', 1, 'PCにデータを送ってみよう', ''),
    ('6', '2', 2, 'PCからデータを受け取ってみよう', ''),
    ('7', '2', 3, 'データの取りこぼしをなくすには', ''),
    ('8', '2', 4, '便利なprintfを使いこなそう', ''),
    ('9', '3', 1, '自動投下装置とは', ''),
    ('10', '3', 2, 'SBUSの読み取り', ''),
    ('11', '3', 3, 'サーボモーター', ''),
    ('12', '3', 4, '赤外線の検出', ''),
    ('13', '3', 5, '自動投下装置の設計', ''),
    ('14', '4', 1, 'センサーとの通信方法', ''),
    ('15', '4', 2, '超音波センサーで距離を測ってみよう', ''),
    ('16', '4', 3, 'ToFセンサーで距離を測ってみよう', ''),
    ('17', '5', 1, '加速度データを読んでみよう', ''),
    ('18', '5', 2, '加速度から角度を計算してみよう', ''),
    ('19', '5', 3, 'キャリブレーションをして精度をあげてみよう', ''),
    ('20', '5', 4, '角速度データの取得', ''),
    ('21', '5', 5, '角速度の積分から角度を計算', ''),
    ('22', '5', 6, '相補フィルター', ''),
    ('23', '5', 7, 'Madgwickフィルター', ''),
    ('24', '6', 1, '構造体でデータをまとめてみよう', ''),
    ('25', '6', 2, 'クラスとは', ''),
    ('26', '6', 3, 'IMUのライブラリを書いてみよう', ''),
    ('27', '6', 4, 'ライブラリを改良してみよう', ''),
    ('28', '6', 5, 'センサー設定に対応しよう', ''),
    ('29', '6', 6, 'Enum Classを使ってみよう', ''),
    ('30', '6', 7, 'I2CとSPIを切り替えできるようにしよう', ''),
    ('31', '6', 8, 'BM1422AGMVのライブラリを作ろう', ''),
    ('32', '7', 1, 'ソフトウェア設計の重要性', ''),
    ('33', '7', 2, '関数と処理の分割 - 基礎', ''),
    ('34', '7', 3, '関数と処理の分割 - 応用', ''),
    ('35', '7', 4, 'マジックナンバーの排除とEnum活用', ''),
    ('36', '7', 5, 'ステートマシン設計 - 基礎', ''),
    ('37', '7', 6, 'ステートマシン設計 - 応用', '');
```

---

## 📊 JSON形式（API用）

### Courses

```json
{
  "courses": [
    {
      "course_id": "1",
      "title": "Step 1 開発環境を用意しよう",
      "description": "STM32マイコンの開発環境セットアップとLED制御の基礎"
    },
    {
      "course_id": "2",
      "title": "Step 2 PCと通信してみよう",
      "description": "UART通信の基本と実装"
    },
    {
      "course_id": "3",
      "title": "Step 3 自動投下装置を作ってみよう",
      "description": "実践的な制御システムの設計と実装"
    },
    {
      "course_id": "4",
      "title": "Step 4 センサーを使って距離を測ってみよう",
      "description": "センサー通信と距離測定"
    },
    {
      "course_id": "5",
      "title": "Step 5 センサーを使って角度を測ってみよう",
      "description": "IMUセンサーと角度推定"
    },
    {
      "course_id": "6",
      "title": "Step 6 センサーのライブラリを自作してみよう",
      "description": "ファームウェア設計とライブラリ実装"
    },
    {
      "course_id": "7",
      "title": "Step 7 ソフトウェア設計",
      "description": "プログラム設計の理論と実践"
    }
  ]
}
```

### Lessons

```json
{
  "lessons": [
    {"lesson_id": "1", "course_id": "1", "order": 1, "title": "講座の進め方"},
    {"lesson_id": "2", "course_id": "1", "order": 2, "title": "必要なソフトをインストールしよう"},
    {"lesson_id": "3", "course_id": "1", "order": 3, "title": "プロジェクトを作成しよう"},
    {"lesson_id": "4", "course_id": "1", "order": 4, "title": "LEDをつけてみよう"},
    {"lesson_id": "5", "course_id": "2", "order": 1, "title": "PCにデータを送ってみよう"},
    {"lesson_id": "6", "course_id": "2", "order": 2, "title": "PCからデータを受け取ってみよう"},
    {"lesson_id": "7", "course_id": "2", "order": 3, "title": "データの取りこぼしをなくすには"},
    {"lesson_id": "8", "course_id": "2", "order": 4, "title": "便利なprintfを使いこなそう"},
    {"lesson_id": "9", "course_id": "3", "order": 1, "title": "自動投下装置とは"},
    {"lesson_id": "10", "course_id": "3", "order": 2, "title": "SBUSの読み取り"},
    {"lesson_id": "11", "course_id": "3", "order": 3, "title": "サーボモーター"},
    {"lesson_id": "12", "course_id": "3", "order": 4, "title": "赤外線の検出"},
    {"lesson_id": "13", "course_id": "3", "order": 5, "title": "自動投下装置の設計"},
    {"lesson_id": "14", "course_id": "4", "order": 1, "title": "センサーとの通信方法"},
    {"lesson_id": "15", "course_id": "4", "order": 2, "title": "超音波センサーで距離を測ってみよう"},
    {"lesson_id": "16", "course_id": "4", "order": 3, "title": "ToFセンサーで距離を測ってみよう"},
    {"lesson_id": "17", "course_id": "5", "order": 1, "title": "加速度データを読んでみよう"},
    {"lesson_id": "18", "course_id": "5", "order": 2, "title": "加速度から角度を計算してみよう"},
    {"lesson_id": "19", "course_id": "5", "order": 3, "title": "キャリブレーションをして精度をあげてみよう"},
    {"lesson_id": "20", "course_id": "5", "order": 4, "title": "角速度データの取得"},
    {"lesson_id": "21", "course_id": "5", "order": 5, "title": "角速度の積分から角度を計算"},
    {"lesson_id": "22", "course_id": "5", "order": 6, "title": "相補フィルター"},
    {"lesson_id": "23", "course_id": "5", "order": 7, "title": "Madgwickフィルター"},
    {"lesson_id": "24", "course_id": "6", "order": 1, "title": "構造体でデータをまとめてみよう"},
    {"lesson_id": "25", "course_id": "6", "order": 2, "title": "クラスとは"},
    {"lesson_id": "26", "course_id": "6", "order": 3, "title": "IMUのライブラリを書いてみよう"},
    {"lesson_id": "27", "course_id": "6", "order": 4, "title": "ライブラリを改良してみよう"},
    {"lesson_id": "28", "course_id": "6", "order": 5, "title": "センサー設定に対応しよう"},
    {"lesson_id": "29", "course_id": "6", "order": 6, "title": "Enum Classを使ってみよう"},
    {"lesson_id": "30", "course_id": "6", "order": 7, "title": "I2CとSPIを切り替えできるようにしよう"},
    {"lesson_id": "31", "course_id": "6", "order": 8, "title": "BM1422AGMVのライブラリを作ろう"},
    {"lesson_id": "32", "course_id": "7", "order": 1, "title": "ソフトウェア設計の重要性"},
    {"lesson_id": "33", "course_id": "7", "order": 2, "title": "関数と処理の分割 - 基礎"},
    {"lesson_id": "34", "course_id": "7", "order": 3, "title": "関数と処理の分割 - 応用"},
    {"lesson_id": "35", "course_id": "7", "order": 4, "title": "マジックナンバーの排除とEnum活用"},
    {"lesson_id": "36", "course_id": "7", "order": 5, "title": "ステートマシン設計 - 基礎"},
    {"lesson_id": "37", "course_id": "7", "order": 6, "title": "ステートマシン設計 - 応用"}
  ]
}
```

---

## 🔗 lesson_id マッピング（確定版）

```typescript
// フロントエンドの section + page_number から lesson_id への変換
const getLessonId = (section: number, page_number: number): string => {
  const mapping: Record<string, string> = {
    "1_1": "1",   // Step 1-1: 講座の進め方
    "1_2": "2",   // Step 1-2: 必要なソフトをインストール
    "1_3": "3",   // Step 1-3: プロジェクトを作成
    "1_4": "4",   // Step 1-4: LEDをつけてみよう
    "2_1": "5",   // Step 2-1: PCにデータを送信
    "2_2": "6",   // Step 2-2: PCからデータを受信
    "2_3": "7",   // Step 2-3: データの取りこぼしをなくす
    "2_4": "8",   // Step 2-4: printfを使いこなそう
    "3_1": "9",   // Step 3-1: 自動投下装置とは
    "3_2": "10",  // Step 3-2: SBUSの読み取り
    "3_3": "11",  // Step 3-3: サーボモーター
    "3_4": "12",  // Step 3-4: 赤外線の検出
    "3_5": "13",  // Step 3-5: 自動投下装置の設計
    "4_1": "14",  // Step 4-1: センサーとの通信方法
    "4_2": "15",  // Step 4-2: 超音波センサー
    "4_3": "16",  // Step 4-3: ToFセンサー
    "5_1": "17",  // Step 5-1: 加速度データを読む
    "5_2": "18",  // Step 5-2: 加速度から角度を計算
    "5_3": "19",  // Step 5-3: キャリブレーション
    "5_4": "20",  // Step 5-4: 角速度データの取得
    "5_5": "21",  // Step 5-5: 角速度の積分から角度を計算
    "5_6": "22",  // Step 5-6: 相補フィルター
    "5_7": "23",  // Step 5-7: Madgwickフィルター
    "6_1": "24",  // Step 6-1: 構造体でデータをまとめる
    "6_2": "25",  // Step 6-2: クラスとは
    "6_3": "26",  // Step 6-3: IMUのライブラリを書く
    "6_4": "27",  // Step 6-4: ライブラリを改良
    "6_5": "28",  // Step 6-5: センサー設定に対応
    "6_6": "29",  // Step 6-6: Enum Classを使用
    "6_7": "30",  // Step 6-7: I2CとSPIを切り替え
    "6_8": "31",  // Step 6-8: BM1422AGMVライブラリを作成
    "7_1": "32",  // Step 7-1: ソフトウェア設計の重要性
    "7_2": "33",  // Step 7-2: 関数と処理の分割 - 基礎
    "7_3": "34",  // Step 7-3: 関数と処理の分割 - 応用
    "7_4": "35",  // Step 7-4: マジックナンバーの排除
    "7_5": "36",  // Step 7-5: ステートマシン設計 - 基礎
    "7_6": "37"   // Step 7-6: ステートマシン設計 - 応用
  };

  return mapping[`${section}_${page_number}`] || "";
};
```

---

## ✅ 検証チェックリスト

- [x] 全Step のページ数を確認（1-4, 2-4, 3-5, 4-3, 5-7, 6-8, 7-6）
- [x] lesson_id が 1〜37 で連番（重複なし）
- [x] course_id と lesson_id の関連性が正確
- [x] タイトルがフロントエンド MainPage.tsx と一致
- [x] JSON形式とSQL形式が一致

---

## 📞 バックエンドへの提出方法

1. **SQL スクリプト形式**: このドキュメントの「完全なINSERTスクリプト」をコピーして、Cloudflare D1 で実行
2. **JSON形式**: APIで POST リクエストを送信（API_GUIDE.md を参照）

**バックエンド処理:**
```
// D1 データベースに courses と lessons テーブルを作成後、
// 上記の INSERT スクリプトを実行
```

---

## 🔄 将来の追加時

新しいページを追加する場合：
1. このドキュメントに lesson_id, title を追加
2. lesson_id マッピング表に新しいエントリを追加
3. バックエンド DB に INSERT

例：
```sql
INSERT INTO lessons (lesson_id, course_id, "order", title, content)
VALUES ('38', '7', 7, '新しいレッスン', '');
```

