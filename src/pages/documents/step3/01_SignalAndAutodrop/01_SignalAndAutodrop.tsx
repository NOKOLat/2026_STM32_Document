import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';

import autodrop_image from './AutoDrop.png';

export default function Step3_01_SignalAndAutodrop() {

    return (
        <div>
            <Topbar pageTitle="Step3: 自動投下装置を作ってみよう" />
            <Header page_count="1. " title="自動投下装置とは" />

            <p>Step1とStep2で基本的なプログラムの書き方とデータの取得ができるようになった</p>
            <p>Step3では、実際に大会でも使う"自動投下装置"の製作をしてみよう</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>自動投下装置とは</li>
                        <li>必要な技術について</li>
                        <li>進捗報告ボタンを押す</li>

                    </ol>
                </div>

            <div className={style.title}>1. 自動投下装置とは</div>

                <p>毎年9月末に開催される飛行ロボットコンテストでは、空中から物を投下するミッションがある</p>

                <p>この際に、物を正確に投下するために箱の中から出ている赤外線を検知する方法が一般的になった</p>

                <p>具体的には、自動投下モードがオンになっているときに、赤外線を検知すると、物を投下する信号を出す仕組みになっている</p>

                <p>Step3では全5回に分けて、この装置の作成を行う</p>

                <figure>
                    <img src={autodrop_image} alt="自動投下装置のイメージ図" width="75%"/>
                    <figcaption>自動投下装置のイメージ図</figcaption>
                </figure>

            <div className={style.title}>2. 必要な技術について</div>

                <p>自動投下装置を作成するためには、以下の技術が必要になる</p>

                <p>Step3では、これらを上から順番に1つずつ習得していき、最後に全てを組み合わせて自動投下装置を完成させる</p>
                <ul>
                    <li>プロポ（操縦装置）からの信号受け取り</li>
                    <li>赤外線の検知</li>
                    <li>モーターの制御</li>
                    <li>上3つをまとめて制御</li>
                </ul>

            <div className={style.title}>3. おわりに</div>

            <p>行うミッションの構成にもよるが、全得点の半分程度を自動投下装置を利用して稼ぐことができる</p>

            <p>なんとなく仕組みを理解して、調整ができるだけでも重宝されるので頑張ってみてね！</p>

            <p>進捗報告ボタンを押して、次のステップに進んでね！</p>

            <CompleteButton section={3} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step2_04_Printf" next="/Step3_02_SBUSRead" />
            <Footer />
        </div>
    );
}
