import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

// 画像データ
import pinImage from './Pin.png';

export default function Basic01() {

    return (

        <div>
            <Header type="基礎編" number="01" title="LEDをつけてみよう" />

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

            <div className={style.title}>1. ピンの設定</div>

                <p>STM32では、1つのピンに通信やLEDなどの機能を割り当てることができる</p>
                <p>そのため、どの用途でどのピンを使うかを設定しなくてはならない</p>
                <p><strong>(プロジェクト名).ioc</strong>をクリックすると画像のような画面が出てくるのでここで設定しよう</p>

                <div className={style.note}>
                
                    <p>PA5にGPIO_Output（電圧を変えることができる機能）が割り当てられていることを確認しておこう</p>
                </div>

                <figure>
                    <img src={pinImage} alt="STM32: PA5 に接続された LED のピン配置" />
                    <figcaption>PA5 が LED 用に割り当てられている</figcaption>
                </figure>

            <div className={style.title}>2. 回路の作成</div>

                <p>今回は、STM32の基板に付いているLEDをつける</p>
                <p>基板上のLEDはPA5に接続されている</p>


            <div className={style.title}>3. プログラム</div>

                <h3>1. LEDをつけるための関数</h3>
                <p>今回はLEDに与える電圧を設定することで、LEDをつけている</p>
                <p>そこで、電圧を変更する関数について説明する</p>

                <CppCodeRender code={`HAL_GPIO_WritePin(GPIOx,GPIO_PIN_y, GPIO_PIN_SET)`} />
                <div className={style.note}>
                    <h3>この関数の引数</h3>

                    <p>GPIOxやGPIO_PIN_yは整数型だけど、システム側で文字に対応するようになってるので</p>
                    <p>GPIOAなどと書くことができる</p>

                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>引数名</th>
                                <th>変数型</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>GPIOx</th>
                                <td>uint32_t</td>
                                <td>GPIOの種類(xはGPIOの種類)</td>
                            </tr>
                            <tr>
                                <th>GPIO_PIN_y</th>
                                <td>uint32_t</td>
                                <td>ピンの種類（yはピン番号）</td>
                            </tr>
                            <tr>
                                <th>GPIO_PIN_SET</th>
                                <td>GPIO_PinState</td>
                                <td>SET: 3.3v RESET: 0.0v</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <details className={style.details}>
                    <summary className={style.summary}>ピンの状態を反転する関数</summary>
                    <br />
                    <ul>
                        <p>LEDが付いている時消す、消えている時につけるという動作を実行したいときは、この関数を使ってみよう</p>

                        <p>反転する関数なので、電圧を決める引数がないこと以外は、上の関数と同じ</p>

                        <CppCodeRender code={`HAL_GPIO_TogglePin(GPIOx,GPIO_PIN_y)`} />
                    </ul>
                </details>

                <br />

                <h3>3. 待機する関数</h3>
                <p>タイミングを調整するために、一定時間待機する関数を使う</p>

                <CppCodeRender code={`HAL_Delay(Time)`} />
                <div className={style.note}>
                    <h3>この関数の引数</h3>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>引数名</th>
                                <th>変数型</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Time</th>
                                <th>uint32_t</th>
                                <th>待機時間（単位はミリ秒）</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>4. サンプルコード</div>

                <p>実際にLEDを点灯させるコードを載せた</p>
                <p>実際に実行してみたり、Delayの時間を変えたりしてみよう</p>


                <CppCodeRender code={`//ファイルの場所: Core/src/wrapper.cpp

#include "wrapper.hpp"
#include "gpio.h"

//起動時に一度だけ実行される
void init(){

    //LEDをつける
    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_SET);

    //1000ms(1s)待機
    HAL_Delay(1000);
}

//繰り返し実行される
void loop(){

    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_RESET);
    
    HAL_Delay(500);

    HAL_GPIO_WritePin(GPIOA,GPIO_PIN_5, GPIO_PIN_SET);

    HAL_Delay(500);
}`} />

            <div className={style.title}>5. 練習問題</div>

                <p>LEDを0.1秒と1秒間隔で点滅させるプログラムを作成してみよう</p>

                <p>HAL_Delay()をうまく使って時間を調整しよう</p>


            <div className={style.title}>6. おわりに</div>

                <p>練習問題のコードが動いたら完了ボタンを押してね</p>


                <ComplateButton page_number={1} section={2} />

                <br />

            <FooterPageRoute prev="/mainpage" next="/basic_02" />

            <Footer />

        </div>
    );
}
