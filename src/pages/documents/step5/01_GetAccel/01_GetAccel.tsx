import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import pin_image from './pin.png'
import pin_name from './pin_name.png'
import pin_number from './pin_number.png'

export default function Step5_01_GetAccel() {
    return (
        <div>
            <Topbar pageTitle="Step5: 加速度データの取得" />
            <Header page_count="1. " title="加速度データの取得" />

            <p>Step5ではどの開発でも必須になる加速度と角速度を測定することができるimuと呼ばれるセンサーを扱う</p>

            <p>ここでは、データの取得方法とそのデータを使って角度を求める方法を学びます</p>
            <p>前回までの講座で、プロジェクトの作成とコードの書きこみの流れを紹介しました</p>

            <div className={style.title}>今回やること</div>

                <p>今回はI2C通信を使用して、加速度のデータを読み取ってみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>今回使用するIMU</li>
                        <li>I2Cにピンを割り当てる</li>
                        <li>回路を作成する</li>
                        <li>レジスタ構成について</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. 今回使用するIMU</div>

            <p>今回はTDKという会社のICM45686というセンサーを使用します</p>

            <p>これは2024年7月に発売されたセンサーで、高い精度で加速度と角速度を測定することができる</p>

            <div className={style.title}>2. I2Cにピンを割り当てる</div>

            <p>Step4の時と同じようにI2Cのピンを割り当てよう</p>

            <figure>
                <img src={pin_image} alt="I2Cのピン割り当て" className={style.image} width="75%" />
            </figure>

            <div className={style.title}>3. 回路の作成</div>

            <p>今回使用するICM45686には開発用にたくさんのピンがついている</p>

            <p>今回はCN1のピンの集まりの13にGND、20に5V、16にSCL、18にSDAを接続する</p>

            <figure>
                <img src={pin_name} alt="I2Cのピン割り当て" className={style.image} width="75%" />
            </figure>

            <figure>
                <img src={pin_number} alt="I2Cのピン割り当て" className={style.image} width="75%" />
            </figure>


            <div className={style.note}>

                <p>ピンはCN1を正面から見たときに右下が1、左上が20になる</p>

                <p>GNDと5Vを間違えると危険なので気を付けて作業をしよう</p>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Pin2</th>
                            <th>Pin4</th>
                            <th>(中略)</th>
                            <th>Pin14</th>
                            <th>Pin16(SCL)</th>
                            <th>Pin18(SDA)</th>
                            <th>Pin20</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Pin1</th>
                            <th>Pin3</th>
                            <th>(中略)</th>
                            <th>Pin13(GND)</th>
                            <th>Pin15</th>
                            <th>Pin17</th>
                            <th>Pin19(5v)</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={style.title}>4. 使用するレジスタ</div>

                <div className={style.note}>
                    <h3>このセンサーのレジスタ</h3>

                    <p>今回は通信チェック、電源設定、データ取得の3つのレジスタを紹介する</p>

                    <p>コードを書くときは通信チェックをした後に電源設定を1回書き込んでからデータを取得しよう</p>

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
                                <th>WIA（通信チェック）</th>
                                <th>0x72</th>
                                <th>0xE9(233)</th>
                                <th>定数が返ってくる。通信チェックに利用</th>
                            </tr>
                            <tr>
                                <th>電源設定</th>
                                <th>0x10</th>
                                <th>0x00</th>
                                <th>0x0fを書き込むことで測定開始（連続測定モード）</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x00</th>
                                <th>0x00</th>
                                <th>x軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x01</th>
                                <th>0x00</th>
                                <th>x軸の加速度データの上位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x02</th>
                                <th>0x00</th>
                                <th>y軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x03</th>
                                <th>0x00</th>
                                <th>y軸の加速度データの上位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x04</th>
                                <th>0x00</th>
                                <th>z軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x05</th>
                                <th>0x00</th>
                                <th>z軸の加速度データの上位8桁</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            
            <div className={style.title}>4. 実際にコードを書いてみよう</div>

            <p>今回から実際にコードを書いてみよう</p>

            <p>このセンサーのi2cアドレスは0x68 &lt;&lt;1である</p>

            <p>データ取得周りは少し難しいので、こちらで書いたものを使ってね</p>

            <CppCodeRender code={`uint8_t i2c_address = 0x68 << 1; // I2Cアドレス
// データ
uint8_t raw_data[6] = {};
uint16_t accel_data[3] = {0}; // x, y, zの加速度データ

// データの読み取り（i2c_address, ACEEL_DATA_X1_UIは定義してね）
HAL_I2C_Mem_Read(&hi2c1, i2c_address, ACEEL_DATA_X1_UI, 1, raw_data, 6, 1000);

//取得データの処理
accel_data[0]  = (int16_t)(raw_data[0] | raw_data[1] << 8);
accel_data[1]  = (int16_t)(raw_data[2] | raw_data[3] << 8);
accel_data[2]  = (int16_t)(raw_data[4] | raw_data[5] << 8);

// 取得データの出力（printfの用意をしてね）
printf("ACCEL: %d, %d, %d\\n", accel_data[0], accel_data[1], accel_data[2]);

// 処理が終わったら少し待つ
HAL_Delay(100);
`}></CppCodeRender>

            <div className={style.title}>5. おわりに</div>

                <p>センサーを水平に置いたときに 0, 0, 1024に近い値が手に入ったらボタンを押してね</p>

                <p>次回はこれを重力加速度gに変換して、物理でやった分力の計算と逆の操作で角度を求めてみよう</p>

            <ComplateButton section={5} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step4_04_FusionTwoSensors" next="/Step5_02_AngleFromAccel" />
            <Footer />
        </div>
    );
}
