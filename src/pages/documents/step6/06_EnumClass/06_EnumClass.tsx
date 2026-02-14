import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_06_EnumClass() {
    return (
        <div>
            <Topbar pageTitle="Step6: センサーライブラリを自作してみよう" />
            <Header page_count="6. " title="Enum Classを使ってみよう" />

            <p>前回は、センサーの設定を実装した</p>

            <p>しかし今のままでは、設定を変えるためにはデータシートから値を見つけなくてはならない</p>

            <p>そこでenum classというものを導入して、文字と数字を対応させてみよう</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>enum classとは</li>
                        <li>関数の引数</li>
                        <li>実際にenum classを使ってみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. enum classとは</div>

                <p>enum classとは、変数に名前をつけて管理するための方法である</p>

                <p>例えば、加速度のスケールについてはこのように書くことができる</p>

                <CppCodeRender code={`// 加速度のスケールを表すenum class
enum class AccelScale : uint8_t {

    SCALE_32G = 0x00, // ±32g
    SCALE_16G = 0x01, // ±16g
    SCALE_8G  = 0x02, // ±8g
    SCALE_4G  = 0x03, // ±4g
    SCALE_2G  = 0x04  // ±2g
};`}></CppCodeRender>

                <p>このように書くことで、スケールを数字ではなく名前で指定できるようになる</p>

                <p>例えば、スケールを±8gに設定したい場合は、AccelScale::SCALE_8Gと書くだけでよい</p>

                <CppCodeRender code={`// スケールを±8gに設定する例(ODRは省略)
imu1.setAccelScale(AccelScale::SCALE_8G);`}></CppCodeRender>

            <div className={style.title}>2. 関数の引数</div>

                <p>直前の例ではuint8_t型の引数であったため、(uint8_t)をつけてenum classから数字にしている</p>

                <p>しかし、関数の引数自体をenum class型にすることで、(uint8_t)をつける必要がなくなる</p>

                <CppCodeRender code={`// 引数をenum class型にした関数の例(ODRは省略)
// AccelScale型のscaleを引数に取る
void setAccelScale(AccelScale scale){

    uint8_t reg_value = (uint8_t)scale; // enum classをuint8_tに変換

    // reg_valueを使ってセンサーの設定を行う
}`}></CppCodeRender>

            <div className={style.title}>3. 実際にenum classを使ってみよう</div>

                <p>前回と同様に、センサーの設定値はデータシートの79、80ページに記載されているので、実際に探してみよう</p>

                <p>この値を参考に、classのpublicの場所にenum classを追加しよう</p>

                <p>Accel、GyroのFSとODRについて合計4つのenum classを作成することになる</p>

                <p>作成後、設定用の関数の引数をenum class型に変更しよう</p>

                                <CppCodeRender code={`enum class AccelScale : uint8_t {
    SCALE_32G = 0x00, // ±32g
    SCALE_16G = 0x01, // ±16g
    SCALE_8G  = 0x02, // ±8g
    SCALE_4G  = 0x03, // ±4g
    SCALE_2G  = 0x04  // ±2g
};

enum class AccelODR : uint8_t {

}

enum class GyroScale : uint8_t {

}

enum class GyroODR : uint8_t {

}`}></CppCodeRender>
                

            <div className={style.title}>4. おわりに</div>

                <p>enum classの値をつかってwrapper.cppをより見やすくできたらボタンを押してね</p>

            <CompleteButton section={6} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step6_05_Improve_Library_2" next="/Step6_07_switch_i2c_spi" />
            <Footer />
        </div>
    );
}
