import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import board_image from './Board.png';
import setup_image from './Setup.png';
import setting_image from './Setting.png';
import Flie_image from './Flie.png';

// InlineImage: small helper to allow per-image parameters directly in JSX
// Usage example: <InlineImage src={setting_image} alt="..." width={420} color="#fafafa" radius={4} />
const InlineImage = ({ src, alt, width, height, color, radius, style, ...rest }: any) => {
    const wrapperStyle: any = {
        display: 'inline-block',
        backgroundColor: color || 'transparent',
        padding: color ? '6px' : 0,
        borderRadius: radius ? `${radius}px` : undefined,
    };
    const imgStyle: any = {
        width: width ?? '100%',
        height: height ?? 'auto',
        display: 'block',
        objectFit: 'contain',
        ...style,
    };
    return (
        <figure style={{ margin: '0 0 1rem 0' }}>
            <div style={wrapperStyle}>
                <img src={src} alt={alt} style={imgStyle} {...rest} />
            </div>
        </figure>
    );
};

export default function Step1_MakeProject() {

    return (

        <div>

            <Topbar pageTitle='Step1: 開発環境を用意しよう' />
            <Header page_count="3. " title="プロジェクトを作成しよう" />

            <p>今回は、実際のプロジェクトの作り方について説明します</p>

            <p>これから数十回やることになる人もいるので、しっかり覚えておこう</p>

            <p>正直何をやってるかわからないと思うけど、最初はおまじないだと思って流しておこう</p>

            <div className={style.title}>今回やること</div>

                <p>実際にプロジェクトを作ってみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>STM32CubeIDEで新しいプロジェクトを作成する</li>
                        <li>コードの自動生成を有効にする</li>
                        <li>必要なファイルを追加する</li>
                        <li>ビルドボタンを押して、エラーがでないことを確認する</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. STM32CubeIDEで新しいプロジェクトを作成する</div>

                <p>まずは、STM32CubeIDEを起動しよう</p>
                <p>起動したら、"File" → "New" → "STM32 Project"を選択しよう</p>

                <p>次に、使用するマイコンを選択する画面が出てくる</p>
                <p>今回はSTM32F446REを選択しよう</p>

                <figure>
                    <img src={board_image} alt="STM32: Nucleo-F446RE ボードの写真"  width="75%" />
                </figure>

                <p>次に、プロジェクト名などを決めるページが出てくる</p>

                <p>次回はLEDをつけるので、プロジェクト名を"LED_Blink"にしておこう</p>

                <p>また、TargetedLanguageをC++にしておこう</p>

                <figure>
                    <img src={setup_image} alt="STM32CubeIDE: 新しいプロジェクトの設定画面" />
                </figure>

                <p>ここまで設定したらFinishボタンを押して、プロジェクトを生成しよう</p>

            <div className={style.title}>2. コードの自動生成を有効にする</div>

                <p>プロジェクトが生成されたら、必要なファイルを追加しよう</p>
                <p>まずは、自動生成機能を有効にして最低限のファイルを生成してもらう</p>

                <p>作成したプロジェクトの中にある"LED_Blink.ioc"を開こう</p>

                <p>次に画像を参考に"Code Generator"タブを開いて、"Generate peripheral initialization as..."にチェックを入れよう</p>

                <InlineImage src={setting_image} alt="STM32CubeIDE: コードの自動生成機能を有効にする設定画面" width="75%" />

            <div className={style.title}>3. 必要なファイルを追加する</div>

                <p>次に、必要なファイルを追加しよう</p>
                <p>今回は、wrapper.hpp / wrapper.cppというファイルを追加して、main.cに登録する</p>  


                <p>inc / srcというフォルダをクリックして、"New" → "File"を選択して、"wrapper.hpp"と"wrapper.cpp"というファイルを作成しよう</p>


                <InlineImage src={Flie_image} alt="STM32CubeIDE: プロジェクトにファイルを追加する様子" width="75%" />

                <p>それぞれのファイルに以下のコードをコピペや編集をしよう</p>

                <details className={style.details}>

                    <summary>wrapper.hppのコード</summary>

                    <p>C/C++という2つの言語の仲介役をしてくれるコード</p>
                    <CppCodeRender code={`#ifndef INC_WRAPPER_HPP_
#define INC_WRAPPER_HPP_

#ifdef __cplusplus
extern "C" {
#endif

void init(void);
void loop(void);

#ifdef __cplusplus
};
#endif

#endif /* INC_WRAPPER_HPP_ */`} />

                </details>
                
                <details className={style.details}>
                    
                    <summary>wrapper.cppのコード</summary>

                    <p>実際にコードを書く部分</p>
                    <CppCodeRender code={`#include "wrapper.hpp"

void init(){

//起動時に1度だけ実行される

}
void loop(){

//一度の実行が終了後、無限に繰り返される

}`} />
                </details>

                <details className={style.details}>

                    <summary>main.cのコード</summary>

                    <p>すでに存在しているmain.cに以下のコードを追加しよう</p>
                    <p>足りない部分だけ追加してね</p>

                    <h3>main.cpp（25行目付近）</h3>
                    <CppCodeRender code={`/* USER CODE BEGIN Includes */
#include "wrapper.hpp"
/* USER CODE END Includes */`} />

                    <h3>main.cpp（97行目付近）</h3>
                    <CppCodeRender code={`/* USER CODE BEGIN 2 */
init();
/* USER CODE END 2 */

/* Infinite loop */
/* USER CODE BEGIN WHILE */
while (1)
{
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
    loop();
}
/* USER CODE END 3 */`} />
                </details>

            <div className={style.title}>4. ビルドボタンを押して、エラーがでないことを確認する</div>

                <p>最後に、ビルドボタンを押してエラーが出ないことを確認しよう</p>
                <p>画面左上のハンマーのアイコンを押すと、ビルドが始まる</p>

                <br />

                <p>下のコンソールに青い文字で"Build Finished."と書いてあれば成功</p>
                <p>もしエラーが出たら、コードをもう一度確認してみよう</p>

            <div className={style.title}>5. 進捗報告</div>

                <p>今回はあまりよくわからない操作をたくさんしたが、おまじないなので気にしないでおこう</p>

                <p>次回から意味のわかるコードや操作ばかりになるので安心してね</p>

                <ComplateButton section={1} page_number={3} />

            <br />

            <FooterPageRoute prev="/Step1_02_install" next="/Step1_04_led" />

            <Footer />

        </div>
    );
}
