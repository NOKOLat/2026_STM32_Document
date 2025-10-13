import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_04_AngleFromGyro() {
    return (
        <div>
            <Topbar pageTitle='Step5: センサーを使って角度を測ってみよう' />
            <Header page_count="4. " title="角速度センサーの値を取得してみよう" />

            <p>前回までの講座で、加速度からの角度計算だけでは不十分なことがわかった</p>

            <p>そこで、今回は角速度センサーの値を取得して角速度の積分から角度を得る方法を学んでみよう</p>

            <div className={style.title}>今回やること</div>

                <p>同じセンサーを使って角速度のデータを取得してみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>5-1と同じセットアップをする</li>
                        <li>使用するレジスタについて</li>
                        <li>実際にコードを書いてみよう（データ取得）</li>
                        <li>実際にコードを書いてみよう（単位換算とキャリブレーション）</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. UARTとは</div>

            <div className={style.title}>2. UARTにピンを割り当てる</div>
            
            <div className={style.title}>3. 回路の作成</div>
            
            <div className={style.title}>4. UARTを送信する関数</div>


                <h3>1. UARTでデータを送信する関数</h3>

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

                <CppCodeRender code={`#include "wrapper.hpp"`}></CppCodeRender>
            
            <div className={style.title}>5. TeraTermでの受信</div>

            <div className={style.title}>6. 練習問題</div>

            <div className={style.title}>7. おわりに</div>

            <ComplateButton section={5} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step5_03_AngleFromAccel" next="/Step5_05_AngleFromGyro" />
            <Footer />
        </div>
    );
}
