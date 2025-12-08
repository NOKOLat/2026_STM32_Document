import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_07_Madgwick() {
    return (
        <div>
            <Topbar pageTitle="Step5: Madgwickフィルター" />
            <Header page_count="7. " title="Madgwickフィルター" />

            <p>前回の講座では、相補フィルターを用いて角度を推定した</p>

            <p>今回はさらに精度がよくて、ライブラリ化されていて使いやすいMadgwickフィルターを使ってみる</p>
            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>セットアップをしよう</li>
                        <li>Madgwickフィルターとは</li>
                        <li>Madgwickフィルターのコード</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. セットアップをしよう</div>

                <p>前回のコードに追記をするので、前回の講座で使用したコードやセンサーを用意しておこう</p>

            <div className={style.title}>2. Madgwickフィルターとは</div>

                <p>Madgwickさんという方が考えたアルゴリズムで、難しい数学（説明略）を使うことで正確な値を求めることができる</p>

                <p>使用するライブラリは、MadgwickAHRSというものでarudinoという別の環境向けに書かれたものであるが、STM32でもそのまま動かすことができる</p>

                <p>以下のリンクからダウンロードしておこう</p>

                <p><a href="link"></a></p>

            <div className={style.title}>3. Madgwickフィルターライブラリ構成</div>

                <p>相補フィルターのコードは以下のようになる</p>
                <CppCodeRender code={`
#include "MadgwickAHRS.h"

Madgwick madgwick;

void setup() {

    madgwick.begin(100); // サンプリング周波数を設定
}
    
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
                
            <ComplateButton section={5} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step5_06_Complementary" next="/Step6_01_AboutClass" />
            <Footer />
        </div>
    );
}
