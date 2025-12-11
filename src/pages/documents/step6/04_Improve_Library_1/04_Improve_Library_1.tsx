import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_04_Improve_Library_1() {
    return (
        <div>
            <Topbar pageTitle="Step6: センサーをライブラリを自作してみよう" />
            <Header page_count="4. " title="ライブラリを改良してみよう" />

            <p>前回の講座で、きちんと動作するIMUのライブラリを書くことができた</p>

            <p>今回は細かい変更を加えることで、さらによいライブラリにしてみよう</p>
            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>コンストラクタとは</li>
                        <li>ピンを自由に設定できるようにしよう</li>
                        <li>レジスタ操作を1つの関数にしよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. コンストラクタとは</div>

                <p>前回の講座では、ライブラリを使うときにIMUSensor imu;のように書いた</p>

                <p>このときに呼ばれる特別な関数がコンストラクタである</p>

                <p>コンストラクタとは、クラスのインスタンスができたときに1度だけ呼ばれる関数であり、初期化処理を行うために使われる</p>

                <p>今回は、この機能を用いてi2cのピンを自由に変更できるようにしよう</p>

            <div className={style.title}>2. ピンを自由に設定できるようにしよう</div>

                <p>前回の講座ではi2cのピンが固定されていたため、他のセンサーと競合してしまう可能性がある</p>

                <p>そこで、コンストラクタを使ってピンを自由に設定できるようにしよう</p>

                <CppCodeRender code={`// コンストラクタの例

class IMUSensor{

    public:

        // コンストラクタ（引数付き）
        IMUSensor(HAL_I2C_HandleTypeDef* input_i2c_pin){
            
            i2c_pin = input_i2c_pin; // 引数で受け取ったピンをメンバ変数に代入する
        }

    private:
        
        HAL_I2C_HandleTypeDef* i2c_pin; // I2Cのピン情報
    }
}`}></CppCodeRender>

            <div className={style.title}>3. レジスタ操作を1つの関数にしよう</div>

                <p>現在使用しているI2Cの関数は引数が多くI2Cアドレスが変わった、タイムアウトの時間を調整したいなどの変更がめんどうである</p>

                <p>実際に使うときは、レジスタアドレス、データ、データの長さしか変えないことがほとんどであるため、</p>

                <p>そこで、IMUSensorクラスにレジスタの読み書きを行う関数を作成し、クラス内のすべてのI2C操作をまとめてみよう</p>

                <CppCodeRender code={`
void writeRegister(uint8_t reg_addr, uint8_t* data, uint8_t len){

    // HAL_I2C_Mem_Write関数を使ってI2Cでデータを書き込む

}

void readRegister(uint8_t reg_addr, uint8_t* data, uint8_t len){

    // HAL_I2C_Mem_Read関数を使ってI2Cでデータを読み込む
}`}></CppCodeRender>

            <div className={style.title}>4. おわりに</div>

                <p>2つの変更が無事に動いたらボタンを押してね</p>
                
            <ComplateButton section={6} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step6_03_IMU_Library" next="/Step6_05_Improve_Library_2" />
            <Footer />
        </div>
    );
}
