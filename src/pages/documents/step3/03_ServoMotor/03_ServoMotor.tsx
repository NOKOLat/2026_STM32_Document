import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import ch1_image from './CH1.png';
import circuit_image from './Circuit.png';
import pin_image from './Pin.png';


export default function Step3_03_ServoMotor() {
    return (
        <div>
            <Topbar pageTitle="Step3: 自動投下装置を作ってみよう" />
            <Header page_count="3. " title="サーボモーター" />

            <p>次は、可動部分になるサーボモーターを動かせるようになってみよう</p>

            <p>ここでは、PWM信号というOnとOffの時間比を使ってサーボモーターを制御する方法を学ぶよ</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>サーボモーターとは</li>
                        <li>ピン設定</li>
                        <li>回路の作成</li>
                        <li>使用する関数</li>
                        <li>サンプルコード</li>
                        <li>練習問題</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. サーボモーターとは</div>

                <p>サーボモーターとは、ラジコンやロボットでよく使われる角度を制御できるモーターのこと</p>

                <p>PWM信号を使って、モーターの角度を細かく制御することができる</p>

                <p>数グラムと軽量ながら、1000g程度の力を発揮できるものもあり、投下装置の可動部分としても利用される</p>

                <p><strong>ただし、壊れるときは一瞬なので過信には注意が必要</strong></p>

            <div className={style.title}>2. ピン設定</div>

                <p>サーボモーターを制御するためのPWM信号は、時間管理が重要なのでタイマーを使用して生成する</p>

                <p>PA8にTM1 CH1を割り当てて、2つの写真と同じように設定をしよう</p>

                <figure>
                    <img src={ch1_image} alt="STM32: PA8 に接続された サーボモーター の CH1 設定" width="75%"/>
                </figure>

                <figure>
                    <img src={pin_image} alt="STM32: PA8 に接続された サーボモーター のピン配置" width="75%"/>
                </figure>

                <details className={style.details}>
                    <summary className={style.summary}>83や2499という値について</summary>
                    <br />
                    <ul>

                        <p>PWMは時間で厳密に管理されるが、STM32は時間を内部のクロックを直接数えることで知ることになっている</p>

                        <p>タイマーにくるクロックは84MHzなので、1クロックあたりの時間は1/84,000,000 sとなる</p>

                        <p>この設定は、(83 + 1)クロックに1回カウントアップするようにして、(2499 + 1)カウントと1つの周期するイメージである</p>

                        <p>私たちは後述する関数で、2500段階でOnとOffの比率を自由に決めることができるようになる</p>

                    </ul>
                </details>


            <div className={style.title}>3. 回路の作成</div>

                <p>サーボモーターとSTM32をジャンパー線を使ってつなぐ</p>

                <p><strong>配線を間違えるとサーボモーターが壊れてしまうことがあるので気を付けてください</strong></p>
                <p><strong>真ん中の5Vだけは絶対に間違えないようにしよう!</strong></p>

                <div className={style.note}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>用途</th>
                                <th>STM32</th>
                                <th>サーボモーター</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>信号線</td>
                                <td>D7(PA8に対応)</td>
                                <td>黄色</td>
                            </tr>
                            <tr>
                                <td>5V線</td>
                                <td>5V</td>
                                <td>赤色</td>
                            </tr>
                            <tr>
                                <td>GND線</td>
                                <td>GND</td>
                                <td>黒色</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <figure>
                    <img src={circuit_image} alt="STM32: PA8 に接続された サーボモーター の回路図" width="75%"/>
                </figure>

            <div className={style.title}>4. 使用する関数</div>

                <p>今回はPWM出力のスタート・ストップ・On時間の調整を行う関数を紹介する</p>

                <p>すべてHALライブラリが整備されていて使いやすいので、簡単に見ていこう</p>

                <br />

                <h3>1. PWM出力のスタート</h3>

                <CppCodeRender code={`HAL_TIM_PWM_Start(&htimx, TIM_CHANNEL_y)`}></CppCodeRender>

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
                                <th>&htimx</th>
                                <th>TIM_HandleTypeDef*</th>
                                <th>TIMのポインタ（xはTIMの番号）</th>
                            </tr>
                            <tr>
                                <th>TIM_CHANNEL_y</th>
                                <th>uint32_t</th>
                                <th>yはChannelの番号 </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <h3>2. PWMの出力</h3>

                <CppCodeRender code={`__HAL_TIM_SET_COMPARE(&htimx , TIM_CHANNEL_y, Value)`}></CppCodeRender>

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
                                <th>&htimx</th>
                                <th>TIM_HandleTypeDef*</th>
                                <th>TIMのポインタ（xはTIMの番号）</th>
                            </tr>
                            <tr>
                                <th>TIM_CHANNEL_y</th>
                                <th>uint32_t</th>
                                <th>yはChannelの番号 </th>
                            </tr>
                            <tr>
                                <th>Value</th>
                                <th>uint16_t</th>
                                <th>PWMのデューティ比を変更</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <h3>3. PWMのストップ</h3>

                <p>長時間つけっぱなしにしてしまうと、サーボモーターが摩耗してしまうので、使い終わったら必ずストップさせよう</p>

                <CppCodeRender code={`HAL_TIM_PWM_Stop(&htimx, TIM_CHANNEL_y)`}></CppCodeRender>

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
                                <th>&htimx</th>
                                <th>TIM_HandleTypeDef*</th>
                                <th>TIMのポインタ（xはTIMの番号）</th>
                            </tr>
                            <tr>
                                <th>TIM_CHANNEL_y</th>
                                <th>uint32_t</th>
                                <th>yはChannelの番号 </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>5. サンプルコード</div>

                <p>以下のコードをmain.cに追加し、動作を確認してみよう</p>

                <p>UART割り込みやprintfなどを使っているので、忘れてしまったら前の講座を確認しにいこう</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "tim.h"

void init(){
    
    //タイマーの起動
    HAL_TIM_PWM_Start(&htim1, TIM_CHANNEL_1);
    HAL_Delay(500);     
}
        
void loop(){
    
    //値の設定
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1000);
    HAL_Delay(1000);
        
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 1500);
    HAL_Delay(1000);
        
    __HAL_TIM_SET_COMPARE(&htim1, TIM_CHANNEL_1, 2000);
    HAL_Delay(1000);
}`}></CppCodeRender>

            <div className={style.title}>6. 練習問題</div>

                <p>PWMの値と角度は割と決め打ちや調整によって設定していくので、実際にやってみよう</p>

                <p>PWMの値を0~2500の好きな値に変更して、サーボモーターの角度が0度 90度 180度になるようにしよう</p>

            <div className={style.title}>7. おわりに</div>

                <p>大体いい感じの角度になったらボタンを押してね！</p>
            


            <CompleteButton section={3} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step3_02_SBUSRead" next="/Step3_04_Infrared" />
            <Footer />
        </div>
    );
}
