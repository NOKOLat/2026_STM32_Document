import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_03_IMU_Library() {
    return (
        <div>
            <Topbar pageTitle="Step6: センサーをライブラリを自作してみよう" />
            <Header page_count="3. " title="IMUのライブラリを書いてみよう" />
            <p>前回までで、基本的なクラスの書き方や利点を知ることができた</p>

            <p>今回はIMUセンサーのライブラリについて考えることで理解を深めてみよう</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>IMUのライブラリとは</li>
                        <li>IMUのライブラリを書いてみよう</li>
                        <li>書いたクラスを使ってみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. IMUのライブラリとは</div>

                <p>IMUのライブラリの目的は、センサーに関する操作を簡単にして、難しいコードを書かずにセンサーを使えるようにすることである</p>

                <p>もし、このような関数を並べるだけでセンサーデータが取得できるとしたらとっても楽である</p>

                <p>今回は、少し大変だがこれに似たライブラリを書いてみよう</p>

                <CppCodeRender code={`// IMUセンサーのライブラリを使う例
#include "IMUSensor.hpp"

IMUSensor imu1; // IMUSensorクラスのインスタンス化をする（構造体と同様）

void init(){

    imu1.begin(); // センサーの初期化を行う
}

void loop(){

    imu1.update(); // センサーデータの取得と角度計算を行う

    float accel[3] = {};
    imu1.getAccelData(accel); // 加速度データを取得

    float gyro[3] = {};
    imu1.getGyroData(gyro);  // 角速度データを取得
}`}></CppCodeRender>

            <div className={style.title}>2. IMUのライブラリを書いてみよう</div>

                <p>ここからは、練習もかねて少し前に書いたIMUのコードをライブラリにしてみよう</p>

                <p>クラスの宣言部分を書いてみたので、ImuLib.hppというファイルを作成してコピーしよう</p>

                <CppCodeRender code={`#ifndef IMULIB_HPP
#define IMULIB_HPP

#include "cstdint"
#include "i2c.h"

class ImuLib{   

    public:

        void begin(){
        
            // センサーの初期化コードを書く
            // 電源設定のコードをここに書こう
        }

        void update(){

            // センサーデータの取得コードを書く


            // 単位換算をするコードを書く

        }

        void getData(float* accel, float* gyro){

            // 加速度データと角速度データを引数の配列にコピーするコードを書く
        }

    private:

        float accel_data[3]; // 加速度データ(x,y,z)
        float gyro_data[3];  // 角速度データ(x,y,z)
};

#endif`}></CppCodeRender>

                <p>コピーできたら、以前に書いたimuのコードを参考に関数の中身を書いてみよう</p>

                <p>結果を格納するfloat型の変数はprivateに宣言してあるので、新しく宣言する必要はない</p>

            <div className={style.title}>3.書いたクラスを使ってみよう </div>

                <p>クラスを書き終えたら、実際に使ってみよう</p>

                <p>wrapper.cppでImuLib.hppをインクルードして必要な関数を呼び出してみよう</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "ImuLib.hpp"

ImuLib imu1; // ImuLibクラスのインスタンス化をする

float accel[3] = {};
float gyro[3] = {};

void init(){    

    // センサーの初期化を行う
}

void loop(){

    // センサーデータの取得と角度計算を行う

    // 加速度データと角速度データを取得

    // 取得したデータをprintfで表示するコードを書く
}`}></CppCodeRender>
            
            <div className={style.title}>4. おわりに </div>

                <p>今回は、IMUセンサーのライブラリを書いてみた</p>

                <p>今回クラスを書いたことで、次回の自分やほかのセンサーを使いたい人が楽をできるようになった</p>

            <ComplateButton section={6} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step6_02_AboutClass" next="/Step6_04_I2C_SPI_1" />
            <Footer />
        </div>
    );
}
