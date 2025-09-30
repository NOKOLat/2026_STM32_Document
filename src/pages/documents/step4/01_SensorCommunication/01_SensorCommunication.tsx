import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';

import sensor_reg_image from './sensor_reg.png';

export default function Step4_01_SensorCommunication() {
    return (
        <div>
            <Topbar pageTitle="Step4: センサーとの通信方法" />
            <Header page_count="1. " title="センサーとの通信方法" />
            

            <p>ここからは、センサーとの通信を行っていきます！</p>
            <p>世の中には様々なセンサーがあるので、実際にデータを読み取って感覚をつかむことが大切です</p>
            <p>Step4とStep5は、すでに作成されたコード（ライブラリ）を用いて、気軽にセンサーを使ってみましょう</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>センサーとの通信方法</li>
                        <li>レジスタとは</li>
                        <li>書き込みの例</li>
                        <li>読み取りの例</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. センサーの通信方法</div>

                <p>センサーとの通信では、UARTに加えてI2CやSPIといった通信方式を使うこともある</p>

                <p>Step4では、I2C通信というものを使ってセンサーとデータをやり取りしてみます</p>

                <p>詳しい関数は次のページで紹介します</p>

            <div className={style.title}>2. レジスタとは</div>

                <p>センサーには内部に設定や結果を保存するレジスタと呼ばれる場所がある</p>

                <p>簡単にいうと棚の中に決められた設定やデータが入っているようなものである</p>

                <p>ユーザーは、その棚の中のデータを書き換えたり読み取ったりすることでセンサーを使う</p>

                <p>それぞれのレジスタには8桁の0/1が保存されていて、それぞれの数字に役割が振られている</p>

                <figure>
                    <img src={sensor_reg_image} alt="Sensor Register" />
                </figure>

            
                <div className={style.title}>3. 書き込みの例</div>

                <p>設定を書き込むためには、どのレジスタにどのような値を書き込むかを確認する必要がある</p>

                <p>基本的にはセンサーのデータシートを見るとよいが、今回の講座では中身をわかりやすくまとめたものを用意するので安心してね</p>

                <p>実際の書き込みの例を書いてみたので、軽くイメージをつかんでおいてね</p>

                <div className={style.note}>

                    <h3>実際のレジスタ例(1: 電源設定)</h3>

                    <p>0/1しかないので基本的に2進数8桁(0~255の値)で書き込みや読み取りを行うことができる</p>

                    <p>実際に2つのbitを操作して、電源設定を切り替える例を紹介する</p>

                    <br />

                    <div style={{marginTop:12, marginBottom:12}}>
                        <div style={{fontWeight:600, marginBottom:6}}>8ビットレジスタの例（左: bit7 / 右: bit0）</div>
                        <div style={{overflowX:'auto'}}>
                            <table style={{borderCollapse:'collapse', minWidth:360}}>
                                <thead>
                                    <tr>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit7</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit6</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit5</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit4</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit3</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit2</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit1</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit0</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <br />

                    <h3> ビットの役割例</h3>
                    
                    <p>bit0: 全体の電源設定</p>

                    <p>bit5: 測定用の電力供給</p>

                    <br />

                    <h3> 電源ON (bit0を1にする)</h3>

                    <p>00000001 (10進数で1)を書き込む</p>

                    <div style={{marginTop:12, marginBottom:12}}>
                        <div style={{fontWeight:600, marginBottom:6}}>8ビットレジスタの例（左: bit7 / 右: bit0）</div>
                        <div style={{overflowX:'auto'}}>
                            <table style={{borderCollapse:'collapse', minWidth:360}}>
                                <thead>
                                    <tr>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit7</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit6</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit5</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit4</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit3</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit2</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit1</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit0</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br />
                    <h3> 電源ONにして、測定用の電力供給をする (bit0とbit5を1にする)</h3>

                    <p>00100001 (10進数で33)を書き込む</p>

                    <div style={{marginTop:12, marginBottom:12}}>
                        <div style={{fontWeight:600, marginBottom:6}}>8ビットレジスタの例（左: bit7 / 右: bit0）</div>
                        <div style={{overflowX:'auto'}}>
                            <table style={{borderCollapse:'collapse', minWidth:360}}>
                                <thead>
                                    <tr>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit7</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit6</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit5</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit4</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit3</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit2</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit1</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit0</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            <div className={style.title}>4. 読み取りの例</div>

                <p>基本的な考え方は書き込みと同様で、今度はセンサー側がセットしてくれた値を読み取ればよい</p>

                <div className={style.note}>

                    <h3>実際のレジスタ例(4: X軸のデータ)</h3>

                    <p>センサーがセットしてくれた値を読み取る例を紹介する</p>

                    <br />

                    <p>この場合は2進数で11001011であるため、10進数に直すと203である</p>

                    <p>基本的に整数値しか示せないため、203という値に特定の値をかけると測定したい物理量（加速度など）にすることができる</p>

                    <div style={{marginTop:12, marginBottom:12}}>
                        <div style={{fontWeight:600, marginBottom:6}}>センサーデータの読み取り</div>
                        <div style={{overflowX:'auto'}}>
                            <table style={{borderCollapse:'collapse', minWidth:360}}>
                                <thead>
                                    <tr>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit7</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit6</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit5</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit4</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit3</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit2</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit1</th>
                                        <th style={{border:'1px solid #888', padding:'6px 10px'}}>bit0</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center'}}>0</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                        <td style={{border:'1px solid #888', padding:'8px 12px', textAlign:'center', backgroundColor:'#3ecf8ea2'}}>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            <div className={style.title}>5. おわりに</div>

                <p>今回はセンサーとの通信方法とレジスタについて紹介しました</p>

                <p>新しい概念で理解が難しいかもしれませんが、センサーを触ってると勝手に理解できるのでそんなに気にせず次に進んでみよう</p>

                <p>一通り読んだらボタンを押してね</p>


            <ComplateButton section={4} page_number={1} />

            <br />
            <FooterPageRoute prev="/Step3_05_AutodropDesign" next="/Step4_02_Ultrasonic" />
            <Footer />
        </div>
    );
}
