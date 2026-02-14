import PageLinkButton from "../components/mainpage/PageLinkButton"
import Topbar from "../layouts/Topbar";
import Footer from '../layouts/Footer';
import MainPageSection from '../components/mainpage/MainPageSection';

export default function MainPage() {

    return (

        <div>

            <section>

                <Topbar pageTitle='メインページ' />

                <div id="section1">
                <MainPageSection title="Step 1 開発環境を用意しよう" section_number={1} page_count={4}>

                    <p>ファイルの自動生成や書き込みを行ってくれるSTM32CubeIDEと実行中に情報を受け取るためのTeraTermというアプリをインストールします</p>

                    <PageLinkButton section={1} number={1} link="/Step1_01_introduction" title="講座の進め方" />
                    <PageLinkButton section={1} number={2} link="/Step1_02_install" title="必要なソフトをインストールしよう" />
                    <PageLinkButton section={1} number={3} link="/Step1_03_makeproject" title="プロジェクトを作成しよう" />
                    <PageLinkButton section={1} number={4} link="/Step1_04_led" title="LEDをつけてみよう" />

                </MainPageSection>
                </div>

                <div id="section2">
                <MainPageSection title="Step 2 PCと通信してみよう" section_number={2} page_count={4}>

                    <p>Processingなどと違って、PCとは別のところで実行するため結果を受け取るためにはPCとの通信が必要になります</p>

                    <p>ここではUART通信という最も簡単な方法を実際の例を見ながら習得しましょう!</p>

                    <PageLinkButton section={2} number={1} link="/Step2_01_UartSend" title="PCにデータを送ってみよう" />
                    <PageLinkButton section={2} number={2} link="/Step2_02_UartReceive" title="PCからデータを受け取ってみよう" />
                    <PageLinkButton section={2} number={3} link="/Step2_03_UartReceiveIT" title="データの取りこぼしをなくすには" />
                    <PageLinkButton section={2} number={4} link="/Step2_04_Printf" title="便利なprintfを使いこなそう" />

                </MainPageSection>
                </div>

                <div id="section3">
                <MainPageSection title="Step 3 自動投下装置を作ってみよう" section_number={3} page_count={5}>

                    <p>実際に大会で重要になる"自動投下装置"を作成してみよう</p>

                    <PageLinkButton section={3} number={1} link="/Step3_01_SignalAndAutodrop" title="自動投下装置とは" />
                    <PageLinkButton section={3} number={2} link="/Step3_02_SBUSRead" title="SBUSの読み取り" />
                    <PageLinkButton section={3} number={3} link="/Step3_03_ServoMotor" title="サーボモーター" />
                    <PageLinkButton section={3} number={4} link="/Step3_04_Infrared" title="赤外線の検出" />
                    <PageLinkButton section={3} number={5} link="/Step3_05_AutodropDesign" title="自動投下装置の設計" />

                </MainPageSection>
                </div>

                <div id="section4">
                <MainPageSection title="Step 4 センサーを使って距離を測ってみよう" section_number={4} page_count={3}>

                    <p>制御をするうえで、目標や床との距離を測ることはとても大切</p>

                    <PageLinkButton section={4} number={1} link="/Step4_01_SensorCommunication" title="センサーとの通信方法" />
                    <PageLinkButton section={4} number={2} link="/Step4_02_Ultrasonic" title="超音波センサーで距離を測ってみよう" />
                    <PageLinkButton section={4} number={3} link="/Step4_03_ToF" title="ToFセンサーで距離を測ってみよう" />

                </MainPageSection>
                </div>

                <div id="section5">
                <MainPageSection title="Step 5 センサーを使って角度を測ってみよう" section_number={5} page_count={7}>

                    <p>機体が傾きすぎると墜落することになるので、水平に保つために角度を知る必要がある</p>

                    <PageLinkButton section={5} number={1} link="/Step5_01_GetAccel" title="加速度データを読んでみよう" />
                    <PageLinkButton section={5} number={2} link="/Step5_02_AngleFromAccel" title="加速度から角度を計算してみよう" />
                    <PageLinkButton section={5} number={3} link="/Step5_03_AngleFromAccel" title="キャリブレーションをして精度をあげてみよう" />
                    <PageLinkButton section={5} number={4} link="/Step5_04_AngleFromGyro" title="角速度データの取得" />
                    <PageLinkButton section={5} number={5} link="/Step5_05_AngleFromGyro" title="角速度の積分から角度を計算" />
                    <PageLinkButton section={5} number={6} link="/Step5_06_Complementary" title="相補フィルター" />
                    <PageLinkButton section={5} number={7} link="/Step5_07_Madgwick" title="Madgwickフィルター" />

                </MainPageSection>
                </div>

                <div id="section6">
                <MainPageSection title="Step 6 センサーのライブラリを自作してみよう" section_number={6} page_count={8}>

                    <PageLinkButton section={6} number={1} link="/Step6_01_AboutStruct" title="構造体でデータをまとめてみよう" />
                    <PageLinkButton section={6} number={2} link="/Step6_02_AboutClass" title="クラスとは" />
                    <PageLinkButton section={6} number={3} link="/Step6_03_IMU_Library" title="IMUのライブラリを書いてみよう" />
                    <PageLinkButton section={6} number={4} link="/Step6_04_Improve_Library_1" title="ライブラリを改良してみよう" />
                    <PageLinkButton section={6} number={5} link="/Step6_05_Improve_Library_2" title="センサー設定に対応しよう" />
                    <PageLinkButton section={6} number={6} link="/Step6_06_EnumClass" title="Enum Classを使ってみよう" />
                    <PageLinkButton section={6} number={7} link="/Step6_07_switch_i2c_spi" title="I2CとSPIを切り替えできるようにしよう" />
                    <PageLinkButton section={6} number={8} link="/Step6_08_BM1422AGMV" title="BM1422AGMVのライブラリを作ろう" />

                </MainPageSection>
                </div>

                <Footer />

            </section>
        </div>

    )
}