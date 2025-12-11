import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_05_Improve_Library_2() {
    return (
        <div>
            <Topbar pageTitle="Step6: センサーライブラリを自作してみよう" />
            <Header page_count="5. " title="センサー設定に対応しよう" />


            <p>今回は、センサーの細かい設定を実装してみよう</p>

            <p>初期設定のままだと、急な動きをしたときに値が振り切れることがあるので、設定で調整しよう</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>センサー設定について</li>
                        <li>スケールと計算式</li>
                        <li>データシートから設定値を探そう</li>
                        <li>センサーの設定を実装しよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. センサー設定について</div>

                <p>センサーにはいくつかの設定項目があり、それらを適切に設定することで精度や応答性を調整できる</p>

                <p>基本的にはスケール、出力レート、フィルターが重要である</p>

                <p>今回はスケールと出力レートについて詳しく見ていこう</p>

            <div className={style.title}>2. スケールと計算式</div>

                <p>スケールとは、センサーが測定できる最大の値のことである</p>

                <p>加速度の場合は、±2g、±4g、±8g、±16gなどがある</p>

                <p>センサーデータを1024で割る動作があったが、これはデフォルトが±32gになっているためである</p>

                <p>計算方法は、16bit(65536)をスケールの範囲で割ることで得られる</p>

                <p>±32gの場合は、65536を64(±があるから倍になっている)で割ることになる</p>

            <div className={style.title}>3. データシートから設定値を探そう</div>

                <p>センサーの設定値はデータシートの79、80ページに記載されているので、実際に探してみよう</p>

                <p>レジスタアドレス、書き込む内容を確認しよう</p>

                <p>FSが範囲、ODRは出力レートのことを指す</p>

                <a href="https://example.com/imu-registers" target="_blank" rel="noopener noreferrer">ページリンク</a>

            <div className={style.title}>4. センサーの設定を実装しよう</div>

                <p>前回のライブラリにセンサー設定の関数を追加しよう</p>

                <p>今回は、データシートに書いてある値をそのまま引数にとれるようにしよう</p>

                <p>また、クラスのprivateに新しい変数を追加して、fs設定値を保存しておこう</p>

                <CppCodeRender code={`// ±2g、800hzを指定したいとき
// 2進数を直接指定したいときは0bをつける
imu1.AccelSetting(0b100, 0b0110);`}></CppCodeRender>

                <CppCodeRender code={`// センサー設定関数の例
void AccelSetting(uint8_t fs, uint8_t odr){

    accel_fs = fs; // スケールを保存しておく

    uint8_t config_value = fs << 3 | odr; // 値を組み合わせる

    // レジスタに設定値を書き込むコードを書く

}

void GyroSetting(uint8_t fs, uint8_t odr){

    gyro_fs = fs; // スケールを保存しておく

    uint8_t config_value = fs << 3 | odr; // 値を組み合わせる

    // レジスタに設定値を書き込むコードを書く
}`}></CppCodeRender>

                <p>関数を実装したら、メイン関数で実際に呼び出してみよう</p>

            <div className={style.title}>5. 単位換算式を実装しよう</div>

                <p>void update()は1024で割って9.8をかける式になっているので、ここも更新する必要がある</p>

                <p>fsの値は保存しているので、switch文や換算式を使って適切な値で割るように変更しよう</p>

                <CppCodeRender code={`void update(){

// 計算式の部分を更新しよう
                    
                    
}`}></CppCodeRender>      
            
            <div className={style.title}>6. おわりに</div>
                
                <p>作成した関数をメイン関数から呼び出してみよう</p>
                
                <p>センサー設定ができるようになったら、完了ボタンを押して次のステップに進もう</p>

            <ComplateButton section={6} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step6_04_Improve_Library_1" next="/Step6_06_EnumClass" />
            <Footer />
        </div>
    );
}
