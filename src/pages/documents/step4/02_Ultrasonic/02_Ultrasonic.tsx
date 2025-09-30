import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import pin_image from './pin.png';

export default function Step4_02_Ultrasonic() {
    return (
        <div>
            <Topbar pageTitle="Step4: 超音波センサーで距離を測ってみよう" />

            <Header page_count="2. " title="超音波センサーで距離を測ってみよう" />

            <p>前回の講座で、センサーのレジスタの概念を学んだので、実際にレジスタ操作を行ってデータを読み取ってみよう！</p>

            <p>今回は、作成者が知っている中で一番簡単なセンサーを持ってきたので頑張ってみてね</p>


            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>超音波センサーとは</li>
                        <li>ピン設定</li>
                        <li>回路の作成</li>
                        <li>I2C通信の関数</li>
                        <li>レジスタ構成</li>
                        <li>サンプルコード</li>
                        <li>練習問題</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. 超音波センサーとは</div>

                <p>超音波センサーは、音波を使って物体までの距離を測定するセンサーです</p>

                <p>音の反射を利用しているため、最も近い距離障害物までの距離を測定することができます</p>

                <p>床との距離を測りたくても壁が近いと、壁との距離を測ってしまうこともあるので注意</p>

            <div className={style.title}>2. ピン設定</div>

                <p>今回使用する超音波センサーは、I2C通信を使用するためPB8とPB9にI2C1と書いてあるものを追加しよう</p>

                <p>その後、左のタブからConnectivity → I2C1を選択して有効化しよう（設定の変更は不要）</p>

                <figure>
                    <img src={pin_image} alt="STM32: PB8, PB9 に接続された I2C のピン配置" width="50%"/>
                </figure>

            <div className={style.title}>3. 回路の作成</div>

                <p>ボードを持っていないので後で作成 D15 D14 3.3v GNDとどこをつなぐかを画像付きで書いておく</p>

            <div className={style.title}>4. I2C通信の関数</div>

                <p>I2C通信を使って、前回紹介したレジスタの読み書きをするためには以下の関数を使用する</p>

                <p>引数が多く見えるが、i2cのポインタやセンサーのアドレスは基本的に変更しないので、見た目よりもシンプルに使える</p>

                <br />

                <h3> 1. 書き込み </h3>

                <CppCodeRender code={`HAL_I2C_Mem_Write(&hi2cx, i2c_addr, register, reg_len, data, data_len, timeout);`} />

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
                                <th>&hi2cx</th>
                                <th>I2C_HandleTypeDef*</th>
                                <th>I2Cのポインタ（xはI2Cの番号）</th>
                            </tr>
                            <tr>
                                <th>i2c_addr</th>
                                <th>uint32_t</th>
                                <th>センサーの通信用アドレス</th>
                            </tr>
                            <tr>
                                <th>register</th>
                                <th>uint8_t*</th>
                                <th>レジスタの番号（ポインタ）</th>
                            </tr>
                            <tr>
                                <th>reg_len</th>
                                <th>uint32_t</th>
                                <th>レジスタの番号の数（基本１）</th>
                            </tr>
                            <tr>
                                <th>data</th>
                                <th>uint8_t*</th>
                                <th>書き込むデータのポインタ</th>
                            </tr>
                            <tr>
                                <th>data_len</th>
                                <th>uint32_t</th>
                                <th>書き込むデータの長さ</th>
                            </tr>
                            <tr>
                                <th>timeout</th>
                                <th>uint32_t</th>
                                <th>タイムアウト時間</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br />

                <h3> 2. 読み取り </h3>

                <CppCodeRender code={`HAL_I2C_Mem_Read(&hi2cx, i2c_addr, register, reg_len, data, data_len, timeout);`} />

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
                                <th>&hi2cx</th>
                                <th>I2C_HandleTypeDef*</th>
                                <th>I2Cのポインタ（xはI2Cの番号）</th>
                            </tr>
                            <tr>
                                <th>i2c_addr</th>
                                <th>uint32_t</th>
                                <th>センサーの通信用アドレス</th>
                            </tr>
                            <tr>
                                <th>register</th>
                                <th>uint8_t*</th>
                                <th>レジスタの番号（ポインタ）</th>
                            </tr>
                            <tr>
                                <th>reg_len</th>
                                <th>uint32_t</th>
                                <th>レジスタの番号の数（基本１）</th>
                            </tr>
                            <tr>
                                <th>data</th>
                                <th>uint8_t*</th>
                                <th>読み取るデータのポインタ</th>
                            </tr>
                            <tr>
                                <th>data_len</th>
                                <th>uint32_t</th>
                                <th>読み取るデータの長さ</th>
                            </tr>
                            <tr>
                                <th>timeout</th>
                                <th>uint32_t</th>
                                <th>タイムアウト時間</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>5. レジスタ構成</div>

            <p>使用するレジスタのみをデータシートから抜粋したものを紹介する</p>

            <p>また、今回のセンサーのアドレスは224である</p>

                <div className={style.note}>
                    <h3>このセンサーのレジスタ</h3>

                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>レジスタ名</th>
                                <th>アドレス</th>
                                <th>初期値</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>測定モード設定</th>
                                <th>0x00</th>
                                <th>0</th>
                                <th>測定モードの設定 / 0x51: mmモード 0x52: μsモード</th>
                            </tr>
                            <tr>
                                <th>通信チェック</th>
                                <th>0x01（読み取り専用）</th>
                                <th>0x80</th>
                                <th>固定値が返ってくる、通信チェックに利用</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x02</th>
                                <th>0x00</th>
                                <th>データの上位の8桁</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x03</th>
                                <th>0x00</th>
                                <th>データの下位の8桁</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>6. サンプルコード</div>

                <p>8桁のみでは距離を表現できないため、16桁を8桁2つに分割して読み取っている</p>

                <p>距離計算コードは、上下8桁ずつに分割されたものを合体させるためのコードである</p>


                <CppCodeRender code={`
#include "wrapper.hpp"
#include "i2c.h"
#include <stdio.h>

// センサーのアドレス(i2c_addr)
uint8_t i2c_addr = 0x70 << 1;

void init(){

	uint8_t reg_value = 0;
    
    // 値の読み取り
	HAL_I2C_Mem_Read(&hi2c1, i2c_addr, 0x00, 1, &reg_value, 1, 1000);

	// 0x80が帰ってくることを確認
	printf("softwareVersion: %d \\n", software_version);

}

void loop(){

	// 測定モードの設定（連続測定モード: mmモード)
	uint8_t command = 0x51;
    
    // 測定モードの書き込み
	HAL_I2C_Mem_Write(&hi2c1, i2c_addr, 0x00, 1, &command, 1, 1000);

	// 測定待機
	HAL_Delay(65);

	// データの取得
	uint8_t raw_data[2] = {};
	HAL_I2C_Mem_Read(&hi2c1, i2c_addr, 0x02, 1, raw_data, 2, 1000);

	// 距離の計算（上位8桁を8桁ずらして、空いた部分に下位8桁を足して、1つの16桁にする）
	uint16_t distance_mm = (uint16_t)(raw_data[0] << 8 | raw_data[1]);

	// 距離の出力
	printf("Distance_mm: %3.2f \\n", distance_mm);
}`} />

            <div className={style.title}>7. 練習問題</div>

                <p>測定モードをμsモードに変更して、距離ではなく時間を取得してみよう</p>
                <p>測定時間μsに音速をかけて、より正確な距離を求めてみよう</p>

                <p>下の例では音速の単位をv[cm/μs]にしたので、そのまま測定データにかけると距離[cm]が手に入るようになっている</p>

                <CppCodeRender code={`// 音速 v[cm/μs]（温度によって変化する）
float temp_c = 25.0f; // 温度（適当に測って入れてみてね）
float v = (331.3f + 0.606f * temp_c) / 10000;
`} />
            <div className={style.title}>8. おわりに</div>

            <p>無事に距離が測れたらボタンを押してね</p>

            <ComplateButton section={4} page_number={2} />

            <br />

            <FooterPageRoute prev="/Step4_01_SensorCommunication" next="/Step4_03_ToF" />
            
            <Footer />
        </div>
    );
}
