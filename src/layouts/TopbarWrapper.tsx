import { useLocation } from 'react-router-dom';
import Topbar from './Topbar';

const pageTitle: { [key: string]: string } = {
    '/mainpage': 'メインページ',
    '/mypage': 'マイページ',
    '/report-bug': 'バグ報告',
    '/Step1_01_introduction': '1. 講座の進め方',
    '/Step1_02_install': '2. 必要なソフトをインストールしよう',
    '/Step1_03_makeproject': '3. プロジェクトを作成しよう',
    '/Step1_04_led': '4. LEDをつけてみよう',
    '/Step2_01_UartSend': '1. PCにデータを送ってみよう',
    '/Step2_02_UartReceive': '2. PCからデータを受け取ってみよう',
    '/Step2_03_UartReceiveIT': '3. データの取りこぼしをなくすには',
    '/Step2_04_Printf': '4. 便利なprintfを使いこなそう',
    '/Step3_01_SignalAndAutodrop': '1. 自動投下装置とは',
    '/Step3_02_SBUSRead': '2. SBUSの読み取り',
    '/Step3_03_ServoMotor': '3. サーボモーター',
    '/Step3_04_Infrared': '4. 赤外線の検出',
    '/Step3_05_AutodropDesign': '5. 自動投下装置の設計',
    '/Step4_01_SensorCommunication': '1. センサーとの通信方法',
    '/Step4_02_Ultrasonic': '2. 超音波センサーで距離を測ってみよう',
    '/Step4_03_ToF': '3. ToFセンサーで距離を測ってみよう',
    '/Step5_01_GetAccel': '1. 加速度データを読んでみよう',
    '/Step5_02_AngleFromAccel': '2. 加速度から角度を計算してみよう',
    '/Step5_03_AngleFromAccel': '3. キャリブレーションをして精度をあげてみよう',
    '/Step5_04_AngleFromGyro': '4. 角速度データの取得',
    '/Step5_05_AngleFromGyro': '5. 角速度の積分から角度を計算',
    '/Step5_06_Complementary': '6. 相補フィルター',
    '/Step5_07_Madgwick': '7. Madgwickフィルター',
    '/Step6_01_AboutStruct': '1. 構造体でデータをまとめてみよう',
    '/Step6_02_AboutClass': '2. クラスとは',
    '/Step6_03_IMU_Library': '3. IMUのライブラリを書いてみよう',
    '/Step6_04_Improve_Library_1': '4. ライブラリを改良してみよう',
    '/Step6_05_Improve_Library_2': '5. センサー設定に対応しよう',
    '/Step6_06_EnumClass': '6. Enum Classを使ってみよう',
    '/Step6_07_switch_i2c_spi': '7. I2CとSPIを切り替えできるようにしよう',
    '/Step6_08_BM1422AGMV': '8. BM1422AGMVのライブラリを作ろう',
};

export default function TopbarWrapper() {
    const location = useLocation();
    const title = pageTitle[location.pathname] || '';

    return <div className="app-topbar-wrapper"><Topbar pageTitle={title} /></div>;
}
