import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import PinConfig from './PinConfig.png';

export default function Step2_03_UartReceiveIT() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="3. " title="データの取りこぼしをなくそう" />

            <p>前回の受信では、タイミングが悪いとデータを取りこぼしてしまった</p>
            <p>操縦信号などを受け取れなくなると、事故の原因になるので割り込み受信を使って解決してみよう</p>


            <div className={style.title}>今回やること</div>

                <p>UART割り込み受信をやってみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>割り込みとは</li>
                        <li>ピンの設定をする</li>
                        <li>回路を作成する</li>
                        <li>UART割り込みに使う関数について</li>
                        <li>サンプルコードを書き込む</li>
                        <li>TeraTermで送信する</li>
                        <li>練習問題を解いてみる</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. 割り込みとは</div>

                <p>割り込みとは重要な処理が発生したときに、現在やっている処理を中断してその処理を実行する（割り込ませる）こと</p>

                <p>STM32では、今回使う受信を検知して割り込みを発生させるほかに、タイマーやピンの電圧などでも割り込みを発生させることができる</p>

            <div className={style.title}>2. UARTのピン設定</div>

                <p>割り込みを使う際には.iocファイルから割り込みの設定をする必要がある</p>

                <p>すでに割り当てられているUART2の設定を画像を参考に変更しよう</p>

                <p>ここにチェックを入れて、コード自動コード生成を利用するために保存（Ctrl + S）を押す</p>

                <figure>
                    <img src={PinConfig} alt="STM32: PA2, PA3 に接続された UART のピン配置" width="75%"/>
                </figure>

            <div className={style.title}>3. 回路の作成</div>

                <p>前回と同様にUSBケーブルでPCとSTM32を繋いでおこう</p>

            <div className={style.title}>4. 使用する関数</div>

                <p>UART割り込みようのハンドラー（割り込み発生時に実行される処理を書く場所）がHALライブラリで提供されている</p>


                <br />

                <h3>1. UART割り込み受信関数</h3>

                <CppCodeRender code={`HAL_UART_Transmit_IT(&huart, data, size);`}></CppCodeRender>

                <div className={style.note}>

                    <p>データが来た時に受け取るので、最大待機時間の引数がなくなっている</p>

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
                        </tbody>
                    </table>
                </div>

                <h3>2. UART割り込み時に実行される関数</h3>

                <p>8bitのデータを送信することができる。配列の形で渡すことで、複数のデータを一度に送信することができる</p>

                <CppCodeRender code={`void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart){
                    
    // 割り込み発生時に行う処理を書く

}`}></CppCodeRender>

                <div className={style.note}>

                    <p>&amp;huartxは、どのUARTによる割り込みがあったかを教えてくれる</p>
                    <p>そのため、関数呼び出し時の引数とはイメージが違う（サンプルコードを読むとわかりやすいはず）</p>
                    
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
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>5. サンプルコード</div>

            <p>終了の合図になる"\n"を表示できないため￥nで表記しています</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "usart.h"
#include "gpio.h"

// 受信したデータを保管する配列
uint8_t data[1];

void init(){ 

    uint8_t* str = "Hello World\\n";
    HAL_UART_Transmit(&huart2, str, 12, 100);//strの中身を送信

    // 最初の受信を待機
    HAL_UART_Receive_IT(&huart2, data, 1);
}

void loop(){

    HAL_Delay(1000);

    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
}

// uart割り込みが発生した時に呼び出される == データを受信したら呼び出される
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart){
    
    // uart2から割り込みが来たとき
    if(huart == &huart2){
        
        // 受信したデータをそのまま返送
        HAL_UART_Transmit(&huart2, data, 1, 100);
        
        // 受信を再開する
        HAL_UART_Receive_IT(&huart2, data, 1);
    }

}`}></CppCodeRender>
            
            <div className={style.title}>6. TeraTermでの送信</div>

                <p>前回と同じようにSTM32から送信した文字をPCで受け取ってみよう</p>

                <p>今回はHAL_Delay()とHAL_GPIO_TogglePin()が常に実行されているが、割り込み受信をしているので取りこぼしが起きない</p>


            <div className={style.title}>7. 練習問題</div>

                <p>一度に受け取る文字数を10や20にしても割り込みがしっかりと動作することを確認しよう</p>

            <div className={style.title}>8. おわりに</div>

                <p>取りこぼしなく、10文字や20文字のデータを受信できたら完了ボタンを押してね</p>


            <CompleteButton section={2} page_number={3} />

            <br />

            <FooterPageRoute prev="/Step2_02_UartReceive" next="/Step2_04_Printf" />

            <Footer />

        </div>
    );
}
