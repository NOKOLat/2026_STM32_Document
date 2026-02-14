import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step3_05_AutodropDesign() {
    return (

        <div>
            <Topbar pageTitle="Step3: 自動投下装置を作ってみよう" />
            <Header page_count="5. " title="自動投下装置の設計" />

            <p>ここまでの講座で必要な要素をすべて勉強しました!!!</p>

            <p>これらの要素を組み合わせて、自動投下装置を設計してみましょう</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>自動投下装置の要件</li>
                        <li>回路のヒント</li>
                        <li>コードのヒント</li>
                        <li>実際にテストしてみよう</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. 自動投下装置の要件</div>

                <p>今回の自動投下装置は以下のような要件を満たして設計してほしい</p>

                <p>ほかの機能については考えなくていいので、いつも通り書いてみよう</p>

                <div className={style.note}>
                    <ol>
                        <li>CH5を手動での投下、CH6を自動投下モードの切り替えに割り当てる</li>
                        <li>常時手動投下は実装でき、プロポのスイッチを判定してサーボモーターを開閉する</li>
                        <li>自動投下モードが入っているときは、赤外線を検知したときに物を投下する</li>
                        <li>赤外線の閾値はadc_valueなどの変数で容易に調整できるようにする</li>
                    </ol>
                </div>

            <div className={style.title}>2. 回路のヒント</div>

                <p>ここまでの講座で使った回路を組み合わせてみよう</p>

                <p>ピンが被らないように設定したので、同じピンで同じ設定で実装することができる</p>

            <div className={style.title}>3. コードのヒント</div>

                <p>ここまでの講座で使ったコードを組み合わせてみよう</p>

                <p>まずSBUSのコードを書いて空の"void loop()"にADCの読み取り・サーボモーターの開閉判定・PWMの出力を追加すると書きやすいかもしれない</p>

                <p>複数の条件をまとめて書きたいときは、このようにかける</p>

                <CppCodeRender code={`if (condition1 && condition2) {

    // 条件1と条件2が両方とも真のときに実行される
}`} />
                <CppCodeRender code={`if (condition1 || condition2) {

    // 条件1または条件2が真のときに実行される
}`} />
                <p>これを組み合わせることで、このような複雑な条件を記述することもできる</p>
                <CppCodeRender code={`if (condition1 || (condition2 && condition3)) {

    // 条件1が真、または条件2と条件3が両方とも真のときに実行される
}`} />
            <div className={style.title}>4. 実際にテストしてみよう</div>

                <p>実際に投下装置を動かしてみて、うまく動くか確認してみよう</p>

                <div className={style.note}>

                    <h3>確認してほしい条件</h3>
                    <ol>
                        <li>CH5を操作して手動投下ができるか確認する</li>
                        <li>CH6を操作して自動投下モードに切り替える</li>
                        <li>赤外線をあてて、サーボが動くか確認する</li>
                        <li>自動投下モードでも手動でサーボが動くか確認する（赤外線を検知しているときは自動開くので例外）</li>
                        <li>近くに蛍光灯があっても誤作動しないか確認する（太陽は強すぎるので、気にしなくていいよ）</li>
                    </ol>
                </div>

            <div className={style.title}>5. おわりに</div>

                <p>すべての条件を達成したらボタンを押してね</p>

            <CompleteButton section={3} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step3_04_Infrared" next="/Step4_01_SensorCommunication" />
            <Footer />
        </div>
    );
}
