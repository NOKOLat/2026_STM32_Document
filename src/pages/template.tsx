            // <div className={style.title}>今回やること</div>

            //     <p>STM32とPCの間でUART通信という通信をやってみよう</p>

            //     <p>今回の内容は以下の通り</p>

            //     <div className={style.note}>
            //         <ol>
            //             <li>UARTとは</li>
            //             <li>UARTにピンを割り当てる</li>
            //             <li>回路を作成する</li>
            //             <li>UARTを操作する関数を知る</li>
            //             <li>サンプルコードを書き込む</li>
            //             <li>TeraTermで受信する</li>
            //             <li>練習問題を解いてみる</li>
            //             <li>進捗報告ボタンを押す</li>
            //         </ol>
            //     </div>

            // <div className={style.title}>1. UARTとは</div>

            // <div className={style.title}>2. UARTにピンを割り当てる</div>
            
            // <div className={style.title}>3. 回路の作成</div>
            
            // <div className={style.title}>4. UARTを送信する関数</div>


            //     <h3>1. UARTでデータを送信する関数</h3>

            //     <CppCodeRender code={`HAL_UART_Transmit(&huartx, Data, Len, Time);`}></CppCodeRender>

            //     <div className={style.note}>
            //         <table className={style.table}>
            //             <thead>
            //                 <tr>
            //                     <th>引数名</th>
            //                     <th>変数型</th>
            //                     <th>内容</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 <tr>
            //                     <th>&amp;huartx</th>
            //                     <td>UART_HandleTypeDef*</td>
            //                     <td>UARTのポインタ（xはUARTの番号）</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Data</th>
            //                     <td>uint8_t*</td>
            //                     <td>送信するデータのポインタ</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Len</th>
            //                     <td>uint16_t</td>
            //                     <td>送信するデータ長</td>
            //                 </tr>
            //                 <tr>
            //                     <th>Time</th>
            //                     <td>uint32_t</td>
            //                     <td>最大実行時間（超えたら処理を諦める）</td>
            //                 </tr>
            //             </tbody>
            //         </table>
            //     </div>

            // <div className={style.title}>4. サンプルコード</div>

            //     <CppCodeRender code={`#include "wrapper.hpp"`}></CppCodeRender>
            
            // <div className={style.title}>5. TeraTermでの受信</div>

            // <div className={style.title}>6. 練習問題</div>

            // <div className={style.title}>7. おわりに</div>