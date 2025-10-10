import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';

export default function Step5_03_AngleFromAccel() {
    return (
        <div>
            <Topbar pageTitle="Step5: キャリブレーションをして精度をあげてみよう" />
            <Header page_count="3. " title="キャリブレーションをして精度をあげてみよう" />


            <p>前回のコードでは、最初から少し角度がずれていたり大きく動かしたときに値がめちゃくちゃになったりした</p>

            <p>この問題を解決するために、キャリブレーションを行ってセンサーの誤差を補正しよう</p>

            <div className={style.title}>今回やること</div>

                <p>前回の計算がうまくいかなかった理由を考えてみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>最初の角度が0度ではない理由について</li>
                        <li>急に動かすと角度の値が跳ねる理由について</li>
                        <li>キャリブレーションについて</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. 最初の角度が0度ではない理由について</div>

            
                <p>センサーは変化をかなり正確に捉えることができるが、初期値がずれていることが多い</p>

                <p>この初期値のずれをキャリブレーションによって補正する必要がある</p>

                <p>やり方は簡単で初期値が0, 0, 1024という値になるように余計な値を引いてあげるだけである</p>

                <p>実際には、1000回センサーデータを取った平均値を計算し、その値が0,0,1024になるように補正する</p>

                <p>これは静的なキャリブレーションであり、初期値を正確にすることや、ゆっくり動く環境に対して有効である</p>

            <div className={style.title}>2. 急に動かすと角度の値が跳ねる理由について</div>

                <p>今回の角度は、重力加速度の分力の計算を利用している</p>

                <p>しかし、急に動かすと重力加速度に加えて動かしたことによる加速度が働くため計算が成立しなくなってしまう</p>

                <p>実際に使われるアルゴリズムでは、移動による加速度がないときだけ重力加速度の分力を利用して角度を計算することが多い</p>

                <p>移動による加速度がかかっているときは、角速度センサーの積分値を主に使用して角度を計算することになる</p>

            <div className={style.title}>3. 実際にコードを書いてみよう</div>

                <p>前回のコードにキャリブレーションをするコードを追加してみよう</p>

                <p>これも実行前に1回やればいい処理なので、電源設定の次の処理として書いておこう!</p>

            <div className={style.title}>4. おわりに</div>
            
                <p>初期値が前よりも0に近くなったらキャリブレーション成功</p>

                <p>完了ボタンを押して次のステップに進もう</p>

            <ComplateButton section={5} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step5_02_AngleFromAccel" next="/Step5_04_AngleFromGyro" />
            <Footer />
        </div>
    );
}
