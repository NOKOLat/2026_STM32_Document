import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_02_AboutClass() {
    return (
        <div>
            <Topbar pageTitle='Step6: センサーをライブラリを自作してみよう' />
            <Header page_count="2. " title="クラスとは" />
            

            <p>前回は、構造体を用いて変数をまとめる方法を紹介した</p>

            <p>C++では、変数だけではなく関数も自由にまとめることができる</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>クラスとは</li>
                        <li>クラスの使い方</li>
                        <li>実際に使ってみよう</li>
                        <li>補足</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. クラスとは</div>

                <p>C++にはクラスという機能があり、変数と関数をまとめて1つの変数型として扱うことができる</p>

                <p>このとき、クラスの中の変数をメンバー変数、関数をメンバー関数と呼ぶこともある</p>

                <p>イメージとしては、センサーデータの変数とセンサーデータの単位換算を行う関数をまとめるということができる</p>

                <p>ここでは、加速度データの値を取得したときに行った、8桁のデータ→16桁のデータ→加速度データへの変換処理をまとめてみた</p>

                <p>どんな変数と関数があるかを知っておいてもらえば十分（中身まではしっかり読まなくて大丈夫）</p>

                <CppCodeRender code={`//センサーデータ処理に関係する処理と変数をまとめたクラス
class IMUSensor{

    public: //後で解説します（関数を書くことが多い場所）
        
        // 生データをセットする関数
        void setRawAccelData(uint8_t* raw_data){

            for(uint8_t i = 0; i < 6; i++){
                raw_accel[i] = raw_data[i];
            }
        }
        
        // 生データを加速度データに変換する関数
        void convertRawDataToInt16(){
                    
            for(uint8_t i = 0; i < 3; i++){
                raw_accel_16[i] = (int16_t)( (raw_accel[i*2] << 8) | raw_accel[i*2 + 1] );
            }

            for(uint8_t i = 0; i < 3; i++){

                // 加速度データに変換 (1g = 9.8m/s^2, センサーの設定は1g = 1024)
                accel[i] = (float)raw_accel_16[i] / 1024.0f * 9.8f;
            }
        }

        // 加速度データを取得する関数
        void getAccelData(float* out_accel){

            for(uint8_t i = 0; i < 3; i++){
                out_accel[i] = accel[i];
            }
        }

    private:// 後で解説します（変数を書くことが多い場所）

        uint8_t raw_accel[6]; // センサーの生データ
        int16_t raw_accel_16[3]; // int16_tに変換した加速度データ
        float accel[3];    // 加速度データ(m/s^2)
};`}></CppCodeRender>

            <div className={style.title}>2. クラスの使い方</div>

                <p>クラスは、構造体と同じように変数型を定義して、その変数型の変数を作成して使う</p>

                <p>上で定義したIMUSensorクラスを使う場合は、以下のようにする</p>

                <CppCodeRender code={`IMUSensor imu1; // IMUSensorクラスのインスタンス化をする（構造体と同様）`}></CppCodeRender>

                <p>このように宣言することで、imu1というIMUSensor型の変数が作成される</p>

                <p>また、中に定義された関数や変数も同様に、ドットを使ってアクセスすることができる</p>

                <CppCodeRender code={`// センサーからデータを取得
uint8_t raw_data[6] = {};

// 取得したデータをクラスにセット
imu1.setRawAccelData(raw_data);`}></CppCodeRender>

                <p>もちろん、2つ以上のインスタンスを作成して、それぞれ別のデータを管理することもできる</p>

                <CppCodeRender code={`IMUSensor imu1; // 1つ目のIMUSensorクラスのインスタンス化
IMUSensor imu2; // 2つ目のIMUSensorクラスのインスタンス化

uint8_t raw_data_1[6] = {}; // 1つ目のセンサーのデータ
uint8_t raw_data_2[6] = {}; // 2つ目のセンサーのデータ

imu1.setRawAccelData(raw_data_1); // imu1にデータをセット
imu2.setRawAccelData(raw_data_2); // imu2にデータをセット
`}></CppCodeRender>


            <div className={style.title}>3. クラスの利点</div>

            <p>実際に作ったクラスを使う例を下に載せた</p>

            <p>具体的な処理はすべてクラスの中にあり、ユーザーは生データを渡して、加速度データを取得するだけでよい</p>

            <CppCodeRender code={`IMUSensor imu1; // IMUSensorクラスのインスタンス化をする（構造体と同様）

// センサーからデータを取得
uint8_t raw_data[6] = {};

// 取得したデータをクラスにセット
imu1.setRawAccelData(raw_data);

// 生データを加速度データに変換
imu1.convertRawDataToInt16();

// 加速度データを取得
float accel[3] = {};
imu1.getAccelData(accel); `}></CppCodeRender>

            <p>このようにクラスを使うことで、複雑な処理を隠蔽して、簡単に扱うことができる</p>

            <p>実際に、madgwickフィルターもクラスで実装されているため中身を何も知らなくても角度を求めることができた</p>

            <div className={style.title}>4. public privateとは</div>

                <p>クラスの中には、publicとprivateというキーワードがある</p>

                <p>これは、外から呼び出すことができるかを決めていて、ユーザーが不必要な内部処理にアクセスできないようにするためのものである</p>

                <p>先ほどの例では、データのセット、変換の計算、データの取得を扱えれば十分であるため、それらをpublicにし、それ以外の変数はprivateにしている</p>

                <p>このようにすることで、中身の計算に使用する変数に誤って代入をしてしまうことを防ぐことができる</p>

                <CppCodeRender code={`class IMUSensor{

    public: //外からアクセスできる場所

        // データをセットしたり、処理を呼び出す関数を書く

    private: //外からアクセスできない場所

        // 内部処理で使う変数を書く
        // 細かい関数や処理を書くこともある
};`}></CppCodeRender>

            <div className ={style.title}>5. おわりに</div>

                <p>今回はクラスの基本的な使い方を紹介した</p>

                <p>クラスを使うことで、複雑な処理を隠蔽して簡単に扱うことができるので少しずつ使いこなせるようになろう</p>

            <ComplateButton section={6} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step6_01_AboutStruct" next="/Step6_03_IMU_Library" />
            <Footer />
        </div>
    );
}
