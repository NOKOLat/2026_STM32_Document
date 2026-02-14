import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_01_AboutStruct() {
    return (
        <div>
            <Topbar pageTitle='Step6: センサーライブラリを自作してみよう' />
            <Header page_count="1. " title="構造体とは" />

            <p>ここからは、プログラムを作成する上で重要な"クラス"という概念を紹介する</p>

            <p>クラスには多くの要素があり難しいため、まずは比較的簡単な構造体について紹介をする</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>構造体とは</li>
                        <li>構造体の使い方</li>
                        <li>実際に使ってみよう</li>
                        <li>補足</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. 構造体とは</div>

                <p>これまで、センサーデータや角度などの変数を扱ってきたが、それらをまとめて管理するための方法として構造体を使うことができる</p>

                <p>ここでは、いくつかの変数を構造体という大きな箱にまとめるイメージで使っている</p>

                <p>このように書くことで、たくさんの変数を扱うことになっても種類ごとにまとめることができる</p>

                <CppCodeRender code={`// これまでの書き方
float accel_x; // 加速度データ(x軸)
float accel_y; // 加速度データ(y軸)
float accel_z; // 加速度データ(z軸)

// 構造体を使うと以下のようにまとめられる
struct AccelData{

    float accel_x; // 加速度データ(x軸)
    float accel_y; // 加速度データ(y軸)
    float accel_z; // 加速度データ(z軸)
};
`}></CppCodeRender>

            <div className={style.title}>2. 構造体の使い方</div>

                    <p>このように変数をまとめることができる構造体であるが、ほかにも大きな特徴がある</p>

                    <p>それが、構造体自体をuintやfloatのような変数型として使うことができる点である</p>

                    <p>ここでは、2つのセンサーがあるときにそれぞれの加速度データをまとめて管理する例を載せた</p>

                    <CppCodeRender code={`// 構造体を宣言する
struct AccelData{

    float accel_x; // 加速度データ(x軸)
    float accel_y; // 加速度データ(y軸)
    float accel_z; // 加速度データ(z軸)
};

// 作った構造体のImuData型の変数を宣言する
AccelData imu_1;
AccelData imu_2;
`}></CppCodeRender>

                    <p>このように宣言することで、imu_1, imu_2という変数がそれぞれAccelData型として扱うことができる</p>

                    <p>構造体から作成した変数の中にx,y,zといった変数が入っている</p>

                    <p>そのため、imu_1.accel_xのようにドット(.)を使ってアクセスすることで、構造体の中の変数を扱うことができる</p>

                    <CppCodeRender code={`// 構造体を宣言する
struct AccelData{

    float accel_x; // 加速度データ(x軸)
    float accel_y; // 加速度データ(y軸)
    float accel_z; // 加速度データ(z軸)
};

// 作った構造体のAccelData型の変数を宣言する
AccelData imu_1;
AccelData imu_2; 

imu_1.accel_x = 1.0; // imu_1のx軸加速度データに1.0を代入
imu_2.accel_y = 2.0; // imu_2のy軸加速度データに2.0を代入

`}></CppCodeRender>
            
            <div className={style.title}>3. 実際に使ってみよう</div>

                <p>ここでは、以下の変数をImuDataという構造体にまとめて、実際に使ってみよう</p>

                <p>ここでは、指定された値を代入して、構造体の値をprintfで表示してみよう</p>

                <CppCodeRender code={`// void init()の上に書いてね
struct ImuData {
    float accel[3]; // 加速度データ(x,y,z)
    float gyro[3];  // 角速度データ(x,y,z)
    float angle[3]; // 角度データ(x,y,z)
};

ImuData imu; // ImuData型の変数imuを宣言
`}></CppCodeRender>

                <p>このデータをImuData構造体に入れてみよう</p>
                <CppCodeRender code={`// 入れたいデータ
accel_x = 0.2;
accel_y = -0.3;
accel_z = 9.8;

gyro_x = 21;
gyro_y = 3.2;
gyro_z = 1.1;

angle_x = 1.1;
angle_y = -0.3;
angle_z = 14;
`}></CppCodeRender>

                <p>すべてのデータが出力できたら成功（フォーマットは自由に決めてね）</p>
            
            <div className={style.title}>4. 補足</div>

                <p>ここまで構造体を定義して、構造体型の変数を作った</p>

                <p>このように自分で新しく宣言した構造体などから変数を作ることをインスタンス化という</p>

                <p>また、作成した構造体型の変数をインスタンスと呼ぶ</p>

                <p>int型の変数を作るのは、これと同じ動作であるがC++で元から用意されているためインスタンス化とは言わない</p>

                <CppCodeRender code={`
int number = 0; // int型の変数numberを宣言（インスタンス化とは言わない）

// 自分で構造体を作成して宣言
struct ImuData {
    float accel[3]; // 加速度データ(x,y,z)
    float gyro[3];  // 角速度データ(x,y,z)
    float angle[3]; // 角度データ(x,y,z)
};

ImuData imu; // ImuData型の変数imuを宣言（インスタンス化と言う）
                    
`}></CppCodeRender>

            <div className={style.title}>5. おわりに</div>

                <p>構造体を使うことで、複数の変数をまとめて管理することができるようになった</p>

                <p>構造体の概念がなんとなくわかったら完了ボタンを教えてね</p>
            
            <CompleteButton section={6} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step5_07_Madgwick" next="/Step6_02_AboutClass" />
            <Footer />
        </div>
    );
}
