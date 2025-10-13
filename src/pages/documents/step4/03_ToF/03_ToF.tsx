import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

import pin_1_image from './pin_1.png';
import pin_2_image from './pin_2.png';

export default function Step4_03_ToF() {
    return (
        <div>
            <Topbar pageTitle='Step4: センサーを使って距離を測ってみよう' />
            <Header page_count="3. " title="ToFセンサーで距離を測ってみよう" />


            <p>今回はSTM32と同じ会社（ST）が販売している光を使った距離センサーを使ってみよう</p>

            <p>設定やプログラムはとても難しいので、今回は値の取得を目標にしてみよう</p>

            <p>VL53L4CXと小さく印刷してある基板を探して使ってね</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>ToFセンサーとは</li>
                        <li>ピン設定</li>
                        <li>回路の作成</li>
                        <li>サンプルコード</li>
                        <li>練習問題</li>
                        <li>おわりに</li>
                    </ol>
                </div>

                <div className={style.title}>1. ToFセンサーとは</div>

                    <p>ToFセンサーは、光の飛行時間を測定することで距離を測るセンサーです</p>

                    <p>光を使っているため、音波を使う超音波センサーよりも高精度で測定することができます</p>

                <div className={style.title}>2. ピン設定</div>

                    <p>今回はI2C通信を使ってセンサーと通信を行います</p>

                    <p>このセンサーはSTM32と同じ会社が出しているため、STM32CubeIDEで使用するドライバーのインストールができます!</p>

                    <p>まず通常通りI2Cを設定し、そのあとにドライバーの設定をしよう</p>

                    <figure>
                        <img src={pin_1_image} alt="ピン設定" width="75%"/>
                    </figure>

                    <figure>
                        <img src={pin_2_image} alt="パッケージ設定" width="75%"/>
                    </figure>

                <div className={style.title}>3. 回路の作成</div>

                    <p>センサーのGND、VCC(3.3v)、SDA、SCLをそれぞれ接続してください</p>

                    <p>センサー側にピンの名前が書いてあるので間違えないように接続しよう</p>

                <div className={style.title}>4. サンプルコード</div>

                    <p>今回のプログラムは難しいので、サンプルコードを載せておいた</p>

                    <p>出力される値は、測定した値、周囲のノイズ、信号の強度を示している</p>

                    <CppCodeRender code={`#include "wrapper.hpp"
#include "stm32f4xx_nucleo_bus.h"
#include "vl53l4cx.h"
#include "vl53lx_api.h"


// 書き込み用の関数
static int32_t vl53l4cx_io_write(uint16_t DevAddr, uint8_t *pdata, uint16_t count)
{

  return BSP_I2C1_Send(DevAddr, pdata, count);
}

// 読み取り用の関数
static int32_t vl53l4cx_io_read(uint16_t DevAddr, uint8_t *pdata, uint16_t count)
{

  return BSP_I2C1_Recv(DevAddr, pdata, count);
}

// VL53L4CXのオブジェクト
static VL53L4CX_Object_t vl53l4cx;

// VL53L4CX_IO_t のオブジェクト
// 初期化などに使用する関数のポインタを設定
static VL53L4CX_IO_t vl53l4cx_io = {

	// I2Cの初期化関数
	.Init = BSP_I2C1_Init,

	// I2Cの終了関数
	.DeInit = BSP_I2C1_DeInit,

	// I2Cアドレス（ライブでの定数値）
	.Address = VL53L4CX_DEVICE_ADDRESS,

	// センサーへの書き込み関数
	.WriteReg = vl53l4cx_io_write,

	// センサーからの読み取り関数
	.ReadReg = vl53l4cx_io_read,

	// 現在の時間取得関数
	.GetTick = BSP_GetTick
};

// 設定用の構造体
static VL53L4CX_ProfileConfig_t vl53l4cx_profileConfig_t{

	// 測定モード(SHORT, MEDIUM, LONG)
	VL53L4CX_PROFILE_MEDIUM,

	// 測定時間(ms)
	95U,

	// 読み取りレート(hz)
	10U,

	// Ambientの出力設定(0 or 1)
	1U,

	// Signalの出力設定(0 or 1)
	1U
};

// 測定範囲の設定
// 縦横ともに分割が0~15であらわされているので7,8を中心として、上限と下限を設定する
static VL53L4CX_ROIConfig_t vl53l4cx_roiConfig_t{
	7U, /* TopLeftX  : 0 */
	7U, /* TopLeftY  : 0 */
	8U,/* BotRightX : 15 (max) */
	8U /* BotRightY : 15 (max) */
};


void init(){


	while(VL53L4CX_RegisterBusIO(&vl53l4cx, &vl53l4cx_io) != 0){

		static uint8_t error_count = 0;

		if(error_count++ > 100){

			printf("InitError\\n");
			while(1);
		}
	}

	printf("InitOK\\n");

	// 登録した関数を使って初期化をする
	VL53L4CX_Init(&vl53l4cx);

	// ProflieConfingの設定(測定レートなど）
	VL53L4CX_ConfigProfile(&vl53l4cx, &vl53l4cx_profileConfig_t);

	// ROIConfigの設定（測定範囲）
	VL53L4CX_ConfigROI(&vl53l4cx, &vl53l4cx_roiConfig_t);

	// 割り込みの設定（特定範囲に入ったらGPIO出力などができる）
	//VL53L4CX_ConfigIT(&vl53l4cx, pITConfig)

    // 測定開始（連続測距モード）
	VL53L4CX_Start(&vl53l4cx, VL53L4CX_MODE_BLOCKING_CONTINUOUS);
}

void loop(){

	// 結果を取得するための構造体のインスタンスを作成
	static VL53L4CX_Result_t res;

	// 測定結果を取得
	VL53L4CX_GetDistance(&vl53l4cx, &res);

	if(res.ZoneResult[0].Status[0] == 1){

		printf("Error: GetDistance\\n");
	}
	else{

		float best_SNR = 0.0f;
		uint8_t best_index = 0;

		for(uint8_t i=0; i<res.ZoneResult[0].NumberOfTargets; i++){

			float SNR = res.ZoneResult[0].Signal[i] / res.ZoneResult[0].Ambient[i];

			if(best_SNR < SNR){

				best_index = i;
			}
		}

        printf("%8s %7s %7s\\n","Distance", "Ambient", "Signal");
        printf("%8d, %7.3lf, %7.3lf\\n", res.ZoneResult[0].Distance[best_index], res.ZoneResult[0].Ambient[best_index], res.ZoneResult[0].Signal[best_index]);
	}

	// 測定終了
	//VL53L4CX_Stop(&vl53l4cx);
}`}></CppCodeRender>

            <div className={style.title}>5. 練習問題</div>

                <p>このプログラムにもセンサーの設定用の項目がある</p>

                <p>VL53L4CX_ROIConfig_tと書いてある部分に、センサーの測定範囲の設定がある</p>

                <p>この値を変えて、距離の測定ができる範囲を調整してみよう</p>

                <p>（小さいと測定範囲が狭くなる代わりに、遠い距離でも高精度で測定できるようになる）</p>

            <div className={style.title}>6. おわりに</div>

                <p>いろいろな距離を測定したらボタンを押してね</p>

                <ComplateButton section={4} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step4_02_Ultrasonic" next="/Step4_04_FusionTwoSensors" />
            <Footer />
        </div>
    );
}
