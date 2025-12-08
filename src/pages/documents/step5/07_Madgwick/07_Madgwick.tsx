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

                <p>Madgwickフィルターを使ったコードは、このように書く</p>

                <CppCodeRender code={`#include "MadgwickAHRS.h"

Madgwick madgwick;

void setup() {

    madgwick.begin(100); // サンプリング周波数を設定
}

void loop() {  
    
    float raw_accel[3]; // 加速度センサーの値
    float raw_gyro[3];  // 角速度センサーの値
    float angle[3]; // 角度を格納する配列

    madgwick.updateIMU(raw_accel[0], raw_accel[1], raw_accel[2], raw_gyro[0], raw_gyro[1], raw_gyro[2]); // 角速度と加速度を渡す
    float angle[0] = madgwick.getRoll();  // ロール角を取得
    float angle[1] = madgwick.getPitch(); // ピッチ角を取得
    float angle[2] = madgwick.getYaw();   // ヨー角を取得
}`}></CppCodeRender>

            <div className={style.title}>4. 実際にコードを書いてみよう</div>

                <p>紹介したコードと、imuからデータを取得するコードを使ってmadgwickフィルターにデータを入れてみよう</p>

            <div className={style.title}>5. おわりに</div>

                <p>Madgwickフィルターを使って、さらに正確な角度を求めることができたら成功!</p>
                
            <ComplateButton section={5} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step5_06_Complementary" next="/Step6_01_AboutClass" />
            <Footer />
        </div>
    );
}
