import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';

export default function Step5_04_AngleFromGyro() {
    return (
        <div>
            <Topbar pageTitle='Step5: センサーを使って角度を測ってみよう' />
            <Header page_count="4. " title="角速度センサーの値を取得してみよう" />

            <p>前回までの講座で、加速度からの角度計算だけでは不十分なことがわかった</p>

            <p>そこで、角速度のデータを用いて角速度の積分から角度を得る方法を学んでみよう</p>

            <p></p>

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

            <div className={style.title}>1. セットアップをしよう</div>

                <p>同じセンサーからデータが取れるかつ、データのレジスタが違うだけで取り扱いもほとんど同じなので、そのまま使うことができる</p>

            <div className={style.title}>2. 使用するレジスタ</div>

                <div className={style.note}>

                    <h3>このセンサーのレジスタ</h3>

                    <p>今回は加速度データに関係するレジスタをピックアップして掲載してみました</p>

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
                                <th>0x06</th>
                                <th>0x00</th>
                                <th>x軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x07</th>
                                <th>0x00</th>
                                <th>x軸の加速度データの上位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x08</th>
                                <th>0x00</th>
                                <th>y軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x09</th>
                                <th>0x00</th>
                                <th>y軸の加速度データの上位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（下位の桁）</th>
                                <th>0x0A</th>
                                <th>0x00</th>
                                <th>z軸の加速度データの下位8桁</th>
                            </tr>
                            <tr>
                                <th>データ（上位の桁）</th>
                                <th>0x0B</th>
                                <th>0x00</th>
                                <th>z軸の加速度データの上位8桁</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>3. コードを書いてみよう</div>

                <p>ここまでのコードを用いて、角速度データの取得とキャリブレーションのコードを書いてみよう</p>

                <p>初期設定では、角速度のデータは32768で250deg/sを表現しているので、センサーから得たデータを32768で割って250をかけることで角速度(deg/s)を求めよう</p>

                <p>角速度のデータの初期値は[0, 0, 0]になるようにキャリブレーションしよう</p>
            
            <div className={style.title}>4. おわりに</div>

                <p>回転の速度をセンサーで読めたり、何もしてないときに値がほぼ0になっていたら成功!</p>

                <p>思いっきりセンサーを回すと250に近い値が、ゆっくり回すと2桁くらいの値が出るかも</p>

            <ComplateButton section={5} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step5_03_AngleFromAccel" next="/Step5_05_AngleFromGyro" />
            <Footer />
        </div>
    );
}
