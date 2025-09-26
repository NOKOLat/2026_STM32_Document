import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import Pin_image from './Pin.png';
import TeraTerm_image from './TeraTerm.png';

export default function Step2_01_UartSend() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="1. " title="PCにデータを送ってみよう" />

            <p>前回までの講座で、プロジェクトの作成とコードの書きこみの流れを紹介しました</p>
            <p>Step2ではPCとSTM32の間でデータを送受信する方法を学んでいこう!</p>

            <p>センサーデータやボタンの判定、計算結果の出力など多くの場面で使うので、使いこなせるようになろう！</p>

            <div className={style.title}>今回やること</div>

                <p>STM32とPCの間でUART通信という通信をやってみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>UARTとは</li>
                        <li>UARTにピンを割り当てる</li>
                        <li>回路を作成する</li>
                        <li>UARTを操作する関数を知る</li>
                        <li>サンプルコードを書き込む</li>
                        <li>TeraTermで受信する</li>
                        <li>練習問題を解いてみる</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. UARTとは</div>

                <p>UART(Universal Asynchronous Receiver-Transmitter)は、シリアル通信の一種で、データを1ビットずつ送受信する方式です。</p>

                <p>1つのデータで8ビットを送ることができ、繰り返し送ることで大量のデータを送信することもできます</p>

                <p>Asynchronous（非同期）であるため、送信側と受信側のタイミングのずれなどで、データのずれや取りこぼしが起こることもあります</p>

            <div className={style.title}>2. UARTにピンを割り当てる</div>

                <p>今回はPA2とPA3にUARTの機能が割り当てられていることを確認しよう</p>

                <p>PC以外との通信では、設定をして通信速度を変えることもある（Step3でやります）</p>

                <figure>
                    <img src={Pin_image} alt="STM32: PA2, PA3 に接続された UART のピン配置" width="75%"/>
                </figure>

            
            <div className={style.title}>3. 回路の作成</div>

                <p>今回は、USBケーブルでPCと接続して通信を行います</p>
                <p>PA2・PA3を使用する場合は、USBでPCと接続することができます</p>

            
            <div className={style.title}>4. UARTを送信する関数</div>

                <p>UARTの送信についてもHALライブラリが提供されているので紹介します</p>

                <p>受信は次回紹介します！</p>

                <br />

                <h3>1. UARTでデータを送信する関数</h3>

                <p>8bitのデータを送信することができる。配列の形で渡すことで、複数のデータを一度に送信することができる</p>

                <CppCodeRender code={`HAL_UART_Transmit(&huartx, Data, Len, Time);`}></CppCodeRender>

                <div className={style.note}>
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
                                <th>&amp;huartx</th>
                                <td>UART_HandleTypeDef*</td>
                                <td>UARTのポインタ（xはUARTの番号）</td>
                            </tr>
                            <tr>
                                <th>Data</th>
                                <td>uint8_t*</td>
                                <td>送信するデータのポインタ</td>
                            </tr>
                            <tr>
                                <th>Len</th>
                                <td>uint16_t</td>
                                <td>送信するデータ長</td>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <td>uint32_t</td>
                                <td>最大実行時間（超えたら処理を諦める）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>4. サンプルコード</div>

            <p>終了の合図になる"\n"を表示できないため￥nで表記しています</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "usart.h"

void init(){ 

    uint8_t* str = "Hello World\\n";
    HAL_UART_Transmit(&huart2, str, 12, 100);//strの中身を送信
}
void loop(){


}`}></CppCodeRender>
            
            <div className={style.title}>5. TeraTermでの受信</div>

                <p>STM32から送信した文字をPCで受け取ってみよう</p>

                <p>TeraTermを開いて、画像のようにシリアルポートを選ぼう</p>
                <p>（ポートの番号は環境によって異なるので注意）</p>
                <figure>
                    <img src={TeraTerm_image} alt="TeraTermの設定画面" />
                </figure>
                
                <details className={style.note}>
                
                    <summary>文字化けや改行がおかしいときは</summary>

                    <br />
                    <ul>
                        <li><strong> 文字化けしてしまったとき</strong></li>
                        <p>設定(S)からシリアルポート(E)を選択し、スピードを115200にしよう</p>

                        <li><strong> 改行がおかしいときは</strong></li>
                        <p>設定(S)から端末(T)を選択し、受信の改行コードをLFにしよう</p>

                    </ul>
                </details>


            <div className={style.title}>6. 練習問題</div>

                <p>新しい配列"message"を作成し、好きな文字列を送信してみよう</p>

                <p>"\n"を含めた文字数を数えて送信してみよう</p>


            <div className={style.title}>7. おわりに</div>

                <p>自分が作成した文字列を受信できたら完了ボタンを押してね</p>

            <ComplateButton section={2} page_number={1} />

            <br />

            <FooterPageRoute prev="/Step1_04_LED" next="/Step2_02_UartReceive" />

            <Footer />

        </div>
    );
}
