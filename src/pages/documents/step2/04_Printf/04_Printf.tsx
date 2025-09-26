import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import setting_image from './Setting.png';

export default function Step2_04_Printf() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="4. " title="便利なprintfを使いこなそう" />

            <p>ここまで、文字の送信を行ってきたがもちろん数字を送りたいことのほうが多い</p>

            <p>しかし、数字を文字に変換するのが意外にめんどくさいのでc言語のprintf()という関数を使えるようにしよう</p>

            <p>後で詳しく紹介するが、変数と文字をこのように直感的に簡単に出力することができる</p>

            <h3>printf関数の書き方（例）</h3>
            <CppCodeRender code={`printf("position[m]: %f, speed[m/s]: %f, accel[m/s^2]: %f", postion, speed, accel)`}></CppCodeRender>

            <h3>TeraTermでの出力（例）</h3>
            <CppCodeRender code={`position[m]: 122.1", speed[m/s]: 9.17, accel[m/s^2]: 1.4`}></CppCodeRender>

            <div className={style.title}>今回やること</div>

                <p>UART割り込み受信をやってみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>printf()とは</li>
                        <li>ピンの設定をする</li>
                        <li>回路を作成する</li>
                        <li>printfのための準備</li>
                        <li>サンプルコードを書き込む</li>
                        <li>TeraTermで送信する</li>
                        <li>練習問題を解いてみる</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. printf()とは</div>

                <p>C言語の標準入出力の1つとして定義されている関数</p>

                <p>好きな変数型で、好きな数の変数を自分が決めたフォーマットで自由に送ることができて便利である</p>

                <p>通常は、PCで実行するときにPC上のコンソールに出力するが、出力先をHAL_UART_Transmit()に変更することで、UART経由で送信することができる</p>

            <div className={style.title}>2. UARTのピン設定</div>

                <p>今回は割り込みを使用しないので、初期設定を使う</p>

            <div className={style.title}>3. 回路の作成</div>

                <p>前回と同様にUSBケーブルでPCとSTM32を繋いでおこう</p>

            <div className={style.title}>4. printfのための準備</div>

                <p>printfはc言語の標準入出力ライブラリ(stdio.h)に含まれる関数である</p>

                <p>これをインクルードして、出力先をHAL_UART_Transmit()に変更しよう</p>

                <h3>1. stdio.hのインクルード</h3>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "stdio.h" //追加する`}></CppCodeRender>
            

                <h3>2. 出力先の変更</h3>

                <p>出力先を変更するために、io_putchar()というものを上書きする</p>

                <p>これをmain.cの以下の部分に追加しておこう</p>

                <CppCodeRender code={`/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
int __io_putchar(int ch){
	HAL_UART_Transmit(&huart2, (uint8_t *)&ch,1,100);
	return ch;
}
/* USER CODE END 0 */`}></CppCodeRender>

                <h3>3. float型の制限解除</h3>

                <p>float型の変数をprintfで出力するためには、特別な設定が必要である</p>

                <p>上のタブの"Project"から"Property"を選択して画像を参考にチェックを入れよう</p>

                <figure>
                    <img src={setting_image} alt="STM32: printfでfloat型を使うための設定" width="75%"/>
                </figure>

            <div className={style.title}>5. printf()の書き方</div>

            <p>printf()は最初の引数でフォーマットを指定して、2つ目以降の引数で順番に変数を入力する形をとっている</p>

            <p>%がついているところが変数が入る場所であり、%dは整数、%fは浮動小数点数を表す</p>
            
            <p>このように書くと整数型のvalueのみを出力できる</p>
            <CppCodeRender code={`printf("%d\\n", value)`}></CppCodeRender>

            <p>また変数ではない文字も含めることができる</p>
            <CppCodeRender code={`printf("Value: %d\\n", value)`}></CppCodeRender>

            <p>複数の変数を扱いたい場合はこのように手前から順番に変数を指定する</p>
            <CppCodeRender code={`printf("Value1: %d, value2: %f, value3: %d\\n", value1, value2, value3)`}></CppCodeRender>

            <p>また、%の後にフォーマットを指定することもできる</p>
            <p>この例の"%3.2f"は小数点以下2桁、全体で3桁表示することを意味する</p>
            <CppCodeRender code={`printf("Value: %3.2f\\n", value)`}></CppCodeRender>

            <p>このように様々なフォーマットがある、表にまとめた</p>

            <h3>変数型のフォーマット</h3>

            <div className={style.note}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>書式</th>
                            <th>意味</th>
                            <th>例</th>
                            <th>出力例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>%d</th>
                            <td>整数型</td>
                            <td>printf("%d", 42);</td>
                            <td>42</td>
                        </tr>
                        <tr>
                            <th>%f</th>
                            <td>浮動小数点型</td>
                            <td>printf("%f", 3.14159);</td>
                            <td>3.141590</td>
                        </tr>
                        <tr>
                            <th>%c</th>
                            <td>文字型</td>
                            <td>printf("%c", 'A');</td>
                            <td>A</td>
                        </tr>
                        <tr>
                            <th>%s</th>
                            <td>文字列型</td>
                            <td>printf("%s", "Hello");</td>
                            <td>Hello</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>フォーマット指定子</h3>

            <p>これらを使うことでより詳細にしていすることもできる</p>

            <p>もちろん何も使わなくても1つだけ使ってもよい</p>

            <div className={style.note}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>書式</th>
                            <th>意味</th>
                            <th>例</th>
                            <th>出力例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>%m.n</th>
                            <td>小数点以下n桁、全体でm桁表示</td>
                            <td>printf("%3.2f", 3.14159);</td>
                            <td>3.14</td>
                        </tr>
                        <tr>
                            <th>%+m.n</th>
                            <td>小数点以下n桁、符号付き、全体でm桁表示</td>
                            <td>printf("%+5.2f", 3.14159);</td>
                            <td>+3.14</td>
                        </tr>
                        <tr>
                            <th>%-m.n</th>
                            <td>小数点以下n桁、左寄せ、全体でm桁表示</td>
                            <td>printf("%-5.2f", 3.14159);</td>
                            <td>3.14 </td>
                        </tr>
                        <tr>
                            <th>%0m.n</th>
                            <td>小数点以下n桁、0埋め、全体でm桁表示</td>
                            <td>printf("%05.2f", 3.14159);</td>
                            <td>03.14</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.title}>6. サンプルコード</div>


                <CppCodeRender code={`#include "wrapper.hpp"
#include "stdio.h"

float pi = 3.14159;
int count = 0;

void init(){ 

    printf("Program started!\\n");

    printf("pi: %f\\n", pi); // 通常の表示（条件なし）
    printf("pi: %3.2f\\n", pi); // 小数点以下2桁、全体で3桁表示
    printf("pi: %+5.4f\\n", pi); // 小数点以下4桁、符号付き、全体で5桁表示

}

void loop(){

    printf("count: %5d\\n", count); // countを5桁で表示（右寄せ）
    
    count++;
    HAL_Delay(1000);
}
`}></CppCodeRender>
            
            <div className={style.title}>7. 練習問題</div>

            <p>以下の配列を使って、好きなフォーマットで値を出力してみよう</p>

            <CppCodeRender code={`float angle[3] = {16.2, 31.1, 120.6};`}></CppCodeRender>


            <div className={style.title}>8. おわりに</div>

                <p>無事に値が出力されたら完了ボタンを押してね</p>


            <ComplateButton section={2} page_number={4} />

            <br />

            <FooterPageRoute prev="/Step2_03_UartReceiveIT" next="/Step3_01_SignalAndAutodrop" />

            <Footer />

        </div>
    );
}
