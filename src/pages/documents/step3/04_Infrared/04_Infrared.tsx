import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import pin_image from './Pin.png';
import circuit_image from './Circuit.png';

export default function Step3_04_Infrared() {
    return (
        <div>

            <Topbar pageTitle="Step3: 自動投下装置を作ってみよう" />
            <Header page_count="4. " title="赤外線の検出" />

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>フォトトランジスタとは</li>
                        <li>ピン設定</li>
                        <li>回路の作成</li>
                        <li>使用する関数</li>
                        <li>サンプルコード</li>
                        <li>練習問題</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. フォトトランジスタとは</div>

                <p>フォトトランジスタとは、光を受け取って電気信号に変換する素子のこと</p>

                <p>赤外線を使った通信や障害物検知など、さまざまな用途で利用される</p>

                <p>STM32にはLEDで使った電圧を出力する機能のほかに電圧を読み取る機能があるので、赤外線の強度を測定すことができる</p>

            <div className={style.title}>2. ピン設定</div>

                <p>今回はADC(アナログ・デジタル変換器)を使って、フォトトランジスタからの信号を読み取る</p>

                <p>PA0にADC1_IN0を割り当てて、写真と同じように設定をしよう</p>

                <figure>
                    <img src={pin_image} alt="STM32: PA0 に接続された フォトトランジスタ のピン配置" width="75%"/>
                </figure>

            <div className={style.title}>3. 回路の作成</div>

                <p>フォトトランジスタとSTM32をジャンパー線で接続しよう</p>

                <figure>
                    <img src={circuit_image} alt="STM32: PA0 に接続された フォトトランジスタ の回路図" width="75%"/>
                </figure>

            <div className={style.title}>4. 使用する関数</div>

                <p>今回はADCのスタート・ストップ・読み取り・読み取り待機関数を紹介する</p>

                <p>すべてHALライブラリが整備されていて使いやすいので、簡単に見ていこう</p>

                <br />

                <h3>1. ADCのスタート</h3>

                <CppCodeRender code={`HAL_ADC_Start(&hadcx)`}></CppCodeRender>

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
                                <th>&hadcx</th>
                                <th>ADC_HandleTypeDef*</th>
                                <th>ADCのポインタ（xはADCの番号）</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <h3>2. ADCの読み取り待機</h3>

                <CppCodeRender code={`HAL_ADC_PollForConversion(&hadcx, time)`}></CppCodeRender>

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
                                <th>&hadcx</th>
                                <th>ADC_HandleTypeDef*</th>
                                <th>ADCのポインタ（xはADCの番号）</th>
                            </tr>
                            <tr>
                                <th>time</th>
                                <th>uint32_t</th>
                                <th>最大待機時間（ミリ秒）</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>3. ADCの読み取り</h3>

                <CppCodeRender code={`value = HAL_ADC_GetValue(&hadcx)`}></CppCodeRender>

                <div className={style.note}>

                    <h3>この関数の引数と戻り値（結果が受け取れる）</h3>

                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>引数・戻り値名</th>
                                <th>変数型</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>&hadcx</th>
                                <th>ADC_HandleTypeDef*</th>
                                <th>ADCのポインタ（xはADCの番号）</th>
                            </tr>
                            <tr>
                                <th>value（戻り値）</th>
                                <th>uint16_t</th>
                                <th>ADCの変換結果</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <h3>4. ADCのストップ</h3>

                <CppCodeRender code={`HAL_ADC_Stop(&hadcx)`}></CppCodeRender>

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
                                <th>&hadcx</th>
                                <th>ADC_HandleTypeDef*</th>
                                <th>ADCのポインタ（xはADCの番号）</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>5. サンプルコード</div>

                <p>以下のコードをmain.cに追加し、動作を確認してみよう</p>

                <p>赤外線については、赤外線投光器などを使用して実験してみよう</p>

                <p>UART割り込みやprintfなどを使っているので、忘れてしまったら前の講座を確認しにいこう</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "adc.h"
#include "stdio.h" 
uint16_t adc_value = 0;

void init(){
    
    HAL_Delay(500);     
}
        
void loop(){

    //ADCのスタート
    HAL_ADC_Start(&hadc1);
    
    //変換を待機（成功するとHAL_OKが返ってくるのでそれを利用）
    if(HAL_ADC_PollForConversion(&hadc1, 1000) == HAL_OK ){

        //値の読み取り
        adc_value = HAL_ADC_GetValue(&hadc1);

        printf("ADC Value: %d\\n", adc_value);
    }

    //ADCのストップ
    HAL_ADC_Stop(&hadc1);

    //ちょっと待機
    HAL_Delay(100);
}`}></CppCodeRender>

            <div className={style.title}>6. 練習問題</div>

                <p>いろいろな距離や角度から赤外線をあてて、反応を確認してみよう</p>

                <p>太陽や蛍光灯など、いろいろな光源に対して反応を確認して、誤った投下判断をしてしまわないように調整する必要がある</p>

            <div className={style.title}>7. おわりに</div>

                <p>なんとなく値の感覚がわかったらボタンを押してね</p>

            <CompleteButton section={3} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step3_03_ServoMotor" next="/Step3_05_AutodropDesign" />
            <Footer />
        </div>
    );
}
