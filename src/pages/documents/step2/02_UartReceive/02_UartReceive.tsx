import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step2_02_UartReceive() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="2. " title="PCからデータを受け取ってみよう" />

            <p>前回はUARTの受信をやってみた</p>
            <p>今回はPCから送信したデータをSTM32で受け取ってみよう</p>

            <div className={style.title}>今回やること</div>

                <p>STM32の基板に付いているLEDを点灯させてみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>UARTにピンを割り当てる</li>
                        <li>回路を作成する</li>
                        <li>UARTを操作する関数を知る</li>
                        <li>サンプルコードを書き込む</li>
                        <li>TeraTermで送信する</li>
                        <li>練習問題を解いてみる</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. UARTにピンを割り当てる</div>

                <p>前回と同様に、PA2とPA3にUARTの機能が割り当てられていることを確認しよう</p>

            <div className={style.title}>2. 回路の作成</div>

                <p>前回と同様に、USBケーブルでPCと接続して通信を行います</p>
            
            <div className={style.title}>3. UARTを受信する関数</div>

                <p>UARTの受信についてもHALライブラリが提供されているので紹介します</p>


                <br />

                <h3>1. UARTでデータを受信する関数</h3>

                <p>送信の関数と似たような形で受信を行うことができる</p>

                <CppCodeRender code={`HAL_UART_Receive(&huartx, Data, Len, Time);`}></CppCodeRender>

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
                                <td>受信するデータのポインタ</td>
                            </tr>
                            <tr>
                                <th>Len</th>
                                <td>uint16_t</td>
                                <td>受信するデータ長</td>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <td>uint32_t</td>
                                <td>最大実行時間（超えたら処理を諦める）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>5. サンプルコード</div>

            <p>今回は受け取った1文字をそのまま返送するコードを</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "usart.h"
#include "string"


void init(){ 

    uint8_t* str = "Start\\n";
    HAL_UART_Transmit(&huart2, str, 6, 1000);//strの中身を送信

}
void loop(){
    
    uint8_t data = 0;
    HAL_UART_Receive(&huart2, &data, 1, 1000); //dataは変数なので、&をつけてポインタにする

    // データの中身が更新 == 受信に成功したとき
    if(data != 0){

        HAL_UART_Transmit(&huart2, &data, 1, 1000); //受け取ったデータをそのまま返送
    }

    HAL_delay(500); //少し待機する

}`}></CppCodeRender>
            
            <div className={style.title}>6. TeraTermでの送信</div>

                <p>TeraTermから文字を送信してみよう</p>

                <p>前回と同様にシリアルポートを開いたら、設定(S)から端末(T)を選択し、"ローカルエコー"にチェックを入れよう</p>
            
                <p>これで、TeraTermの画面に自分が入力した文字が表示され、STM32に送信することができる</p>

                <details className={style.note}>
                
                    <summary>文字が返ってくるときと、返ってこない来ないときがある？</summary>

                    <br />

                    <p>これは、STM32側の受信がHAL_UART_Receive()が実行されているときしか機能していないからである</p>

                    <p>例えばif文の判定中や、HAL_Delay()の待機時間中に来たデータは無視してしまう</p>

                    <br />

                    <strong>これを解決するために、次回割り込み受信という方法を紹介します！！</strong>

                </details>


            <div className={style.title}>7. 練習問題</div>

                <p>TeraTermから5文字をまとめて受信して、5文字まとめて送り返してみよう</p>

            <div className={style.title}>8. おわりに</div>

                <p>5文字送った直後に同じ文字が返ってきたら成功</p>


            <ComplateButton section={2} page_number={2} />

            <br />

            <FooterPageRoute prev="/Step2_01_UartSend" next="/Step2_03_UartReceiveIT" />

            <Footer />

        </div>
    );
}
