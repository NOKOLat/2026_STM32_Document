import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_06_Complementary() {
    return (
        <div>
            <Topbar pageTitle="Step5: 相補フィルター" />
            <Header page_count="6. " title="相補フィルター" />
            
            <p>ここまでの講座では、角速度と角速度からそれぞれ角度を計算する方法を紹介した</p>

            <p>しかし、加速度から求めた角度は急な移動に弱く、角速度から求めた角度は時間が経つと誤差が大きくなってしまう</p>

            <p>そこで、これらの弱点を補うために相補フィルターという方法を使う</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>セットアップをしよう</li>
                        <li>相補フィルターとは</li>
                        <li>相補フィルターのコード</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>加速度のノルムを使って改善してみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. セットアップをしよう</div>

                <p>前回のコードに追記をするので、前回の講座で使用したコードやセンサーを用意しておこう</p>

            <div className={style.title}>2. 相補フィルターとは</div>

                <p>相補フィルターは、加速度センサーとジャイロセンサーのデータを組み合わせて、それぞれの弱点を補い合う方法である</p>

                <p>具体的な実装としては、1つ前の角度に角速度を足して求めた新しい角度の値と、加速度から直接求めた角度を組み合わせることをする</p>

                <p>一番簡単な方法は足して2で割ることであるが、よくある実装としては角速度から求めた角度 * 0.98 + 加速度から求めた角度 * 0.02 である</p>

                <p>この0.98という数字は、制御工学の知識などを利用して求めるものであるが、だいたい0.98くらいの値になるのでそのまま使ってしまおう</p>

            <div className={style.title}>3. 相補フィルターのコード</div>

                <p>相補フィルターのコードは以下のようになる</p>
                <CppCodeRender code={`// 角速度から求めた角度と加速度から求めた角度を組み合わせる
float accel_angle[3]; // 加速度から求めた角度
float gyro_angle[3];  // 角速度から求めた角度の変化
float angle[3];       // 最終的な角度

// 1. センサーデータを取得する

// 2. 加速度から角度を計算する
// accel_angleを更新

// 3. 角速度から角度を積分で計算する
// gyro_angleを更新

// 4. 相補フィルターで組み合わせる

float alpha = 0.98f; // フィルター係数
angle[0] = alpha * gyro_angle[0] + (1 - alpha) * accel_angle[0];
angle[1] = alpha * gyro_angle[1] + (1 - alpha) * accel_angle[1];
angle[2] = alpha * gyro_angle[2] + (1 - alpha) * accel_angle[2];
`}></CppCodeRender>
            <div className={style.title}>4. 実際にコードを書いてみよう</div>

                <p>前回のコードに追記して、相補フィルターを実装してみよう</p>
                <p>加速度から求めた角度と、角速度から積分で求めた角度を組み合わせて最終的な角度を求めてみよう</p>

            <div className={style.title}>5. 加速度のノルムを使って改善してみよう</div>

                <p>相補フィルターを使ってみても、思いっきりセンサーを振って大きな角速度をかけると誤差が大きくなってしまうことがある</p>

                <p>0.02という係数であっても、加速度の影響が大きいため重力以外の加速度が無視できないためである</p>

                <p>そのため、加速度のノルムが9.8±1.0の範囲内にある場合のみ、加速度を0.02の係数をつけていれるようにして、</p>

                <p>それ以外の場合は加速度の影響を無視して、角速度から求めた角度のみを使うようにしてみよう</p>

            <div className={style.title}>6. おわりに</div>

                <p>相補フィルターを使って、加速度と角速度のデータをうまく組み合わせることで、より正確な角度推定が可能になることがわかった</p>

                <p>z軸方向が正確に戻らないのは6軸imuの限界の部分があるので、あんまり気にしないようにしよう</p>
                
            <CompleteButton section={5} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step5_05_AngleFromGyro" next="/Step5_07_Madgwick" />
            <Footer />
        </div>
    );
}
