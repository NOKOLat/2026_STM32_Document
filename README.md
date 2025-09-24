- pages 各ページの定義
- context 進捗管理・認証システムなど
- layouts 各ページで使用するコンポーネント
- routes ページ遷移の定義



## ドキュメントの書き方

### 1. ファイルの場所

`src/pages`の適切なセクションのtsxファイルを開いてください

### 2. ドキュメントの書き方

- tsxファイルの指定の位置にhtmlを書いてください
- JSXなので、しっかりとタグを閉じないとエラーになりがちです

```tsx
export default function Step1_Introduction() {

    return (

        <div>

            <Header section="Step1 開発環境を用意しよう" title="講座の進め方" />

            {/*ここから下に書いてね*/}

            <p>テキストをかけるよ<p/>



            {/*ここから上に書いてね*/}

            <ComplateButton section={1} page_number={1} />

            <br />

            <FooterPageRoute prev="/mainpage" next="/Step1_02_install" />

            <Footer />

        </div>
    );
}
```

### 3. 便利なコンポーネント

- タイトルやノート、コードブロックなどをサポートしています

```tsx
<div className={style.title}>今回やること</div>

    <p>今回は、STM32の基板に付いているLEDを点灯させてみよう</p>

    <p>今回の内容は以下の通り</p>

    <div className={style.note}>
        <ol>
            <li>LEDにピンを割り当てる</li>
            <li>回路を作成する</li>
            <li>LEDを操作する関数を知る</li>
            <li>サンプルコードを動かす</li>
            <li>練習問題を解いてみる</li>
            <li>進捗報告ボタンを押す</li>
        </ol>
    </div>
</div>
```

```tsx
<CppCodeRender code={`HAL_GPIO_WritePin(GPIOx,GPIO_PIN_y, GPIO_PIN_SET)`} />
```