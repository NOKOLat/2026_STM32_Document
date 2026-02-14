import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_05_AngleFromGyro() {
    return (
        <div>
            <Topbar pageTitle="Step5: 角速度の積分から角度を計算" />
            <Header page_count="5. " title="角速度の積分から角度を計算" />

            <p>前回の講座で角速度のデータを得ることができたので、今回はそのデータを積分して角度を計算してみよう</p>

            <div className={style.title}>今回やること</div>

                <p>同じセンサーを使って角速度のデータを取得してみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>セットアップをしよう</li>
                        <li>プログラムで積分する方法とは</li>
                        <li>プログラムで積分するコード</li>
                        <li>実際に積分をするコードを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. セットアップをしよう</div>

                <p>前回のコードに追記をするので、前回の講座で使用したコードやセンサーを用意しておこう</p>

            <div className={style.title}>2. プログラムで積分する方法</div>

                <p>数学では、インテグラルの記号を数学の公式などを使いながら求めていったが、プログラムでは数値積分という方法を使う</p>

                <p>角速度のデータは、１秒間に何度回転したかを示しているので、それを時間ごとに足し算すれば角度が得られるという考え方である</p>

                <div className={style.note}>

                    <h3>プログラムの限界について</h3>

                    <p>今紹介した方法は、数学の世界で区分求積法と呼ばれるものである</p>

                    <p>本来の区分求積法は、足し合わせる面積の幅を極限まで0に近づけることで積分の操作と同じ結果を得られるというものである</p>

                    <p>しかし、プログラムでは時間の幅を0にすることはできないため、少しずつ誤差が溜まってしまう</p>
                </div>

            <div className={style.title}>3. プログラムで積分するコード</div>

                <p>このセンサーは初期で、1Khz（1秒間に1000回のデータ取得）が設定されているため、時間の幅は0.001秒となる</p>

                <p>つまり、得たデータ(deg/s)に1/1000をかけて足し合わせることで角度を求めることができる</p>

                                <CppCodeRender code={`//角度計算用の変数
float dt = 0.001f; // サンプリング時間（1kHzなので0.001秒）
float angle[3] = {0.0f, 0.0f, 0.0f}; // 角度の初期化

// 角速度データを取得した後に積分を行う
angle[0] += gyro_x * dt; // x軸の角度を更新
angle[1] += gyro_y * dt; // y軸の角度を更新
angle[2] += gyro_z * dt; // z軸の角度を更新
`}></CppCodeRender>

            <div className={style.title}>4. 実際にコードを書いてみよう</div>

                <p>前回のコードに追記して、角速度の積分を行ってみよう</p>
                <p>データを取得した後に、積分の計算を追加して角度をprintしてみよう</p>
                <p>今回はfloat型で角度を扱うことになるので、printfのfloat制限を解除しておこう</p>

            <div className={style.title}>5. おわりに</div>

                <p>思いっきり振り回したり、何回も回すとめちゃくちゃな値になってしまうが、（次の講座で説明）</p>
                <p>ゆっくり回してそれなりに正しい値が出たら成功</p>

            <CompleteButton section={5} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step5_04_AngleFromGyro" next="/Step5_06_Complementary" />
            <Footer />
        </div>
    );
}
