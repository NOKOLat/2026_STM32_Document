import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_03_AngleFromAccel() {
    return (
        <div>
            <Topbar pageTitle="Step5: キャリブレーションをして精度をあげてみよう" />
            <Header page_count="3. " title="キャリブレーションをして精度をあげてみよう" />


            <p>実際にセンサーのデータを読んでみると、水平においているはずなのに[0,0,1024]ではなく、ずれた値が出てくることがある</p>

            <p>これは、センサーの仕様であり、初期値のずれを補正する必要である</p>

            <p>今回はずれを修正するためのキャリブレーションをやってみよう</p>

            <div className={style.title}>今回やること</div>

                <p>前回の計算がうまくいかなかった理由を考えてみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>キャリブレーションとは</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. キャリブレーションとは</div>
            
                <p>キャリブレーションとは、センサーの初期値のずれを補正することである</p>

                <p>今回は、もっとも簡単な静的なキャリブレーションを行ってみる</p>

                <p>値のずれを単純に引き算するだけなので、計算も簡単である</p>

                <div className={style.note}>

                    <h3>キャリブレーションのイメージ</h3>

                    <p>表のように、本来の値（ここでは水平に置いている状況）からのずれをoffsetとして引くことで正確な値を求めることができる</p>

                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>名前</th>
                                <th>x</th>
                                <th>y</th>
                                <th>z</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>キャリブレーション前</th>
                                <th>37</th>
                                <th>42</th>
                                <th>1051</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>正しい値</th>
                                <th>0</th>
                                <th>0</th>
                                <th>1024</th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>offsetとして引く値</th>
                                <th>37</th>
                                <th>42</th>
                                <th>27</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            <div className={style.title}>2. 実際にコードを書いてみよう</div>

                <p>前回のコードにキャリブレーションのコードを追加してみよう</p>

                <p>キャリブレーション自体は、1000回の値の平均値をとる作業のみでいいので、下のコードを参考にしてね</p>

                <p>offsetの変数に実際のデータから引く値を入れて、実際のデータ取得コードも更新しよう</p>

                <CppCodeRender code={`// キャリブレーションコード
uint32_t accel_sum[3] = {};
uint32_t gyro_sum[3] = {};
uint16_t accel_offset[3] = {};
uint16_t gyro_offset[3] = {};

for (uint16_t i = 0; i < 1000; i++) {

    // データを取得して、accel_sum, gyro_sumに加算する

}

    // データの合計から平均値を求めて、オフセットを計算する
`}></CppCodeRender>

                <p>前回のコードにキャリブレーションをするコードを追加してみよう</p>

                <p>これも実行前に1回やればいい処理なので、電源設定の次の処理として書いておこう!</p>

            <div className={style.title}>3. おわりに</div>
            
                <p>初期値が前よりも0に近くなったらキャリブレーション成功</p>

                <p>完了ボタンを押して次のステップに進もう</p>

            <ComplateButton section={5} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step5_02_AngleFromAccel" next="/Step5_04_AngleFromGyro" />
            <Footer />
        </div>
    );
}
