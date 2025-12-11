import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_07_switch_i2c_spi() {
    return (
        <div>
            <Topbar pageTitle="Step6: I2CとSPIを切り替えできるようにしよう" />
            <Header page_count="7. " title="I2CとSPIを切り替えできるようにしよう" />

            <p>前回までの講座で、設定をわかりやすく自由に変更できるようになった</p>

            <p>今回はi2cとspiの切り替えを簡単にできるようにしてみよう</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>切り替えの方法について</li>
                        <li>インクルード問題</li>
                        <li>コンストラクタを実装</li>
                        <li>読み取り、書き込み用関数の変更</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. 切り替えの方法について</div>

                <p>stm32cubeideでは、ピンを割り当てるだけで必要なヘッダーを生成してくれる</p>

                <p>これを上手に利用して、ユーザーがピンを割り当ててピン情報を渡すだけでどちらの通信形式かを判断すればよい</p>

            <div className={style.title}>2. インクルード問題</div>

                <p>STM32CubeIDEは必要なヘッダーしか生成しないため、i2cを使うときにspiのヘッダーのインクルードエラーが出てしまう</p>

                <p>そこで、ピンを割り当てているかでインクルードを条件分岐させる必要がある</p>

                <p>STM32CubeIDEではHAL_I2C_MODULE_ENABLEDやHAL_SPI_MODULE_ENABLEDが定義されているため、これを使ってこのように条件分岐させることができる</p>

                <CppCodeRender code={`#ifdef HAL_I2C_MODULE_ENABLED
    #include "i2c.h"
#endif

#ifdef HAL_SPI_MODULE_ENABLED
    #include "spi.h"
#endif`}></CppCodeRender>

            <p>また、メンバー変数のHAL_I2C_HandleTypeDefやHAL_SPI_HandleTypeDefも同様に条件分岐させる必要がある</p>

            <CppCodeRender code={`#ifdef HAL_I2C_MODULE_ENABLED
    HAL_I2C_HandleTypeDef* hi2c;
#endif
#ifdef HAL_SPI_MODULE_ENABLED
    HAL_SPI_HandleTypeDef* hspi;
#endif`}></CppCodeRender>

            <p>このように書くことで、コンパイル時に必要なものだけをコンパイルするようになる</p>

            <div className={style.title}>3. コンストラクタを実装</div>

                <p>次にコンストラクタを実装する</p>
                <p>ここでは、オーバーロードを使ってi2cとspiの両方に対応できるようにする</p>
                <p>i2cとspiのそれぞれの型を持つコンストラクタを定義して、適切な方をプログラムに判断させることができる</p>

                
                <p>ここでは、コンストラクタのコード例を載せておく（メンバー変数にuse_i2cやspiのポインタを追加しよう）</p>

                <CppCodeRender code={`// I2C用コンストラクタ
#ifdef HAL_I2C_MODULE_ENABLED
    IMU_Class(HAL_I2C_HandleTypeDef* hi2c_ptr){
        hi2c = hi2c_ptr;
        use_i2c = true;//メンバー変数に追加
    }
#endif

// SPI用コンストラクタ
#ifdef HAL_SPI_MODULE_ENABLED
    IMU_Class(HAL_SPI_HandleTypeDef* hspi_ptr){
        hspi = hspi_ptr;
        use_i2c = false;//メンバー変数に追加
    }
#endif`}></CppCodeRender>

            <div className={style.title}>4. 読み取り、書き込み用関数の変更</div>

                <p>最後に読み取り、書き込み用関数を変更する</p>

                <p>ここでは、use_i2cの値を判定して分岐するものと、インクルードエラー対策の条件分岐を両方実装する</p>

                <CppCodeRender code={`void writeRegister(uint8_t reg, uint8_t data){

    if(use_i2c){

        #ifdef HAL_I2C_MODULE_ENABLED

            // I2Cでの書き込み

        #endif
    } 
    else {

        #ifdef HAL_SPI_MODULE_ENABLED

            // SPIでの書き込み

        #endif
    }
}`}></CppCodeRender>

            <div className={style.title}>5. おわりに</div>

                <p>これで、i2cとspiの切り替えが簡単にできるようになった</p>

                <p>このようにしておくことで、ユーザーがとっても楽になるので頑張って実装しよう</p>

            <ComplateButton section={6} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step6_06_EnumClass" next="/Step6_08_BM1422AGMV" />
            <Footer />
        </div>
    );
}
