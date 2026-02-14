import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step5_02_AngleFromAccel() {
    return (
        <div>
            <Topbar pageTitle="Step5: 加速度のベクトルから角度を計算" />
            <Header page_count="2. " title="加速度のベクトルから角度を計算" />
            
            <p>高校物理では、重力を角度θを使って各軸の分力に変換した</p>

            <p>この操作の逆を行うことで、センサーから手に入れることができる各軸の加速度から現在の角度が計算できる</p>

            <div className={style.title}>今回やること</div>

                <p>各軸の加速度の値から角度を求めてみよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>前回と同じセットアップをする</li>
                        <li>加速度データを(m/s^2)に換算しよう</li>
                        <li>角度の求め方について</li>
                        <li>実際にコードを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. 前回と同じセットアップをする</div>

                <p>前回のデータ取得のコードを再利用します！</p>

                <p>今回は前回のコードに追記してしまっても大丈夫</p>

            <div className={style.title}>2. 加速度データを(m/s^2)に換算しよう</div>

                <p>加速度センサーの生データは、16bitで表された整数値でありそのまま使うこともできるが</p>

                <p>デバックや調整がしにくいので、見慣れた単位に換算して扱っていこう</p>

                <div className={style.note}>

                    <h3>データの変換方法について</h3>

                    <p>今回のセンサーの初期設定では、1g = 1024であるため、1024で割って9.8をかけることで変換ができる</p>

                    <CppCodeRender code={`// 加速度データを(m/s^2)に換算
float accel_x = (float)raw_accel_x / 1024.0f * 9.8f;
float accel_y = (float)raw_accel_y / 1024.0f * 9.8f;
float accel_z = (float)raw_accel_z / 1024.0f * 9.8f;
                    `}></CppCodeRender>

                </div>

            <div className={style.title}>3. 角度の求め方について</div>

                <p>加速度センサーは、静止状態では重力加速度を検出のでこの分力から角度を求めてみよう</p>

                <p>重力加速度にsin,cos,tanなどをかけることで分力に変換したので、ここでは逆三角形関数というものを使用する</p>
                
                <div className={style.note}>

                    <h3>実際のプログラムについて</h3>

                    <p>atan2fという逆三角形関数の関数とsqrtfという平方根を求める関数を使って角度を計算する</p>

                    <p>地面と水平に回しても各軸の重量加速度は変化しないため、水平回転のz軸を正確に求めることができない</p>

                    <CppCodeRender code={`// 角度の計算
#include <math.h> // 三角関数を使うために必要

// x軸の角度
float angle_x = atan2f(accel_y, sqrtf(accel_x * accel_x + accel_z * accel_z)) * (180.0f / 3.14159f);
// y軸の角度
float angle_y = atan2f(-accel_x, sqrtf(accel_y * accel_y + accel_z * accel_z)) * (180.0f / 3.14159f);
                    `}></CppCodeRender>

                </div>

            <div className={style.title}>4. 実際にコードを書いてみよう</div>

                <p>前回のコードに単位換算をするコードと角度を計算するコードを追加してprintfで出力してみよう</p>

                <p>今回はセンサーのずれを補正していないので、少しずれるがなんとなくの動きを計算することができる</p>

                <p>急な移動をすると角度の値が跳ね上がるが、それについては次回説明します</p>

            <div className={style.title}>5. おわりに</div>

                <p>大まかに現在の基板の角度が取得出来たら完了ボタンを押してね</p>

                <p>次回は補足説明と簡単なキャリブレーションを実装してさらに精度をあげてみよう</p>

            <CompleteButton section={5} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step5_01_GetAccel" next="/Step5_03_AngleFromAccel" />
            <Footer />
        </div>
    );
}
