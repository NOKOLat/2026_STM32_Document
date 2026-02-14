import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';


import config1_image from './Config_1.png';
import circuit_image from './Circuit.png';

export default function Step3_02_SBUSRead() {
    return (
        <div>
            <Topbar pageTitle="Step3: 自動投下装置を作ってみよう" />
            <Header page_count="2. " title="SBUSの読み取り" />

            <p>自動投下装置作成のため、まずはプロポ（操縦装置）からの信号を受け取る方法を学ぼう</p>

            <p>今回は、SBUSというプロトコルを使って信号を受け取る方法を学ぶよ</p>

            <div className={style.title}>今回やること</div>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>SBUSとは</li>
                        <li>ピン設定</li>
                        <li>回路の作成</li>
                        <li>受信プログラム</li>
                        <li>サンプルコード</li>
                        <li>練習問題</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. SBUSとは</div>

                <p>SBUSとはラジコンで主に使用される通信プロトコルで、最大18チャンネルのデータを1つの信号線で送ることができます</p>

                <p>プロポと受信機は無線、受信機とSTM32はシリアル通信でデータをやりとりしています</p>

                <p>UARTとよくにたプロトコルですが、On/Offがなぜか反転しているので反転回路を組む必要があります</p>

            <div className={style.title}>2. ピン設定</div>

                <p>回路で反転した後は通常のUARTとして扱えるため、Step2でやったようにUARTの設定をする</p>

                <p>PCとの通信用とUARTを分けたいので、UART1をPA9とPA10に割り当てよう</p>

                <p>UART1はこの画像のように設定をして、Step2の3ページ目を参考にして割り込みの設定もしよう</p>

                <figure>
                    <img src={config1_image} alt="STM32: PA9, PA10 に接続された UART のピン配置" width="75%"/>
                    <figcaption>UART1の設定</figcaption>
                </figure>

            <div className={style.title}>3. 回路の作成</div>

                <p>反転回路の作成をする</p>

                <p>これは回路の講座ではないので、図と同じものをそのまま作ってしまえば大丈夫</p>

                <p>繋ぐところを間違えると受信機を壊す可能性があるので、不安なら先輩に確認してもらおう！</p>

                <p>抵抗は1kΩを使う(なければ500Ωを直列に2つ繋いで代用する)</p>

                <figure>
                    <img src={circuit_image} alt="反転回路の回路図" width="75%"/>
                    <figcaption>反転回路の回路図</figcaption>
                </figure>



            <div className={style.title}>4. SBUS受信プログラム</div>

                <p>UART通信は1度に8bitのデータを送ることができるが、SBUSは11bitで1つのデータになっている</p>

                <p>そのため、<strong>1チャンネル目のデータ = 1つ目のデータの8bit + 2つ目のデータの3bit</strong>というデータ処理をしなくてはならない</p>

                <p>ここには、ビットシフトとビットマスクという方法を使うが、これは難しいので今回は完成品が入っている関数を提供する</p>

                <CppCodeRender code={`// raw_data 受信したデータ[25]
// channel_data 取り出した後のデータ[10]

void SBUS_decode(uint8_t* raw_data, uint16_t* channel_data){

    channel_data[0]  = (raw_data[1]        | raw_data[2] << 8)   & 0x07FF;
    channel_data[1]  = (raw_data[2] >> 3   | raw_data[3] << 5)   & 0x07FF;
    channel_data[2]  = (raw_data[3] >> 6   | raw_data[4] << 2    | raw_data[5] << 10) & 0x07FF;
    channel_data[3]  = (raw_data[5] >> 1   | raw_data[6] << 7)   & 0x07FF;
    channel_data[4]  = (raw_data[6] >> 4   | raw_data[7] << 4)   & 0x07FF;
    channel_data[5]  = (raw_data[7] >> 7   | raw_data[8] << 1    | raw_data[9] << 9) & 0x07FF;
    channel_data[6]  = (raw_data[9] >> 2   | raw_data[10] << 6)  & 0x07FF;
    channel_data[7]  = (raw_data[10] >> 5  | raw_data[11] << 3)  & 0x07FF;
    channel_data[8]  = (raw_data[12]       | raw_data[13] << 8)  & 0x07FF;
    channel_data[9]  = (raw_data[13] >> 3  | raw_data[14] << 5)  & 0x07FF;
}`}></CppCodeRender>

            <div className={style.title}>5. サンプルコード</div>

                <p>以下のコードをmain.cに追加し、動作を確認してみよう</p>

                <p>UART割り込みやprintfなどを使っているので、忘れてしまったら前の講座を確認しにいこう</p>

                <CppCodeRender code={`#include "wrapper.hpp"
#include "usart.h"
#include "string"

uint8_t  raw_data[25];
uint16_t channel_data[10] = {};

void SBUS_decode(uint8_t* raw_data, uint16_t* channel_data);

void init(){

    //割り込みの開始
    HAL_UART_Receive_DMA(&huart1, raw_data, 25);
}

void loop(){
    
    //データを出力
    printf("Ch1: %d, Ch2: %d, Ch3: %d, Ch4: %d\\n", channel_data[0], channel_data[1], channel_data[2], channel_data[3]);

    //データを送信
	HAL_UART_Transmit(&huart2, (uint8_t *)str.c_str(),str.length(),100);
}

//データを受信したら呼び出される
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {

    //データがSBUSの形式であるか確認
	if(raw_data[0] == 0x0F && raw_data[24] == 0x00){

		SBUS_decode(raw_data, channel_data);//SUBSデータの分解
    }

    //受信の再開
    HAL_UART_Receive_DMA(&huart1, raw_data, 25);
}

// raw_data 受信したデータ[25]
// channel_data 取り出した後のデータ[10]
void SBUS_decode(uint8_t* raw_data, uint16_t* channel_data){

    channel_data[0]  = (raw_data[1]        | raw_data[2] << 8)   & 0x07FF;
    channel_data[1]  = (raw_data[2] >> 3   | raw_data[3] << 5)   & 0x07FF;
    channel_data[2]  = (raw_data[3] >> 6   | raw_data[4] << 2    | raw_data[5] << 10) & 0x07FF;
    channel_data[3]  = (raw_data[5] >> 1   | raw_data[6] << 7)   & 0x07FF;
    channel_data[4]  = (raw_data[6] >> 4   | raw_data[7] << 4)   & 0x07FF;
    channel_data[5]  = (raw_data[7] >> 7   | raw_data[8] << 1    | raw_data[9] << 9) & 0x07FF;
    channel_data[6]  = (raw_data[9] >> 2   | raw_data[10] << 6)  & 0x07FF;
    channel_data[7]  = (raw_data[10] >> 5  | raw_data[11] << 3)  & 0x07FF;
    channel_data[8]  = (raw_data[12]       | raw_data[13] << 8)  & 0x07FF;
    channel_data[9]  = (raw_data[13] >> 3  | raw_data[14] << 5)  & 0x07FF;
}`}></CppCodeRender>

            <div className={style.title}>6. 練習問題</div>

                <p>SBUSデータの5ch（スイッチに割り当て）の参照してLEDをつけたり消したりできるようにしよう</p>

                <p>具体的には、channel_data[4]の値を参照して、値が1000より大きいか小さいかで判定するとよさそう</p>

            <div className={style.title}>7. おわりに</div>

                <p>LEDを無事に操作できるようになったらボタンを教えてね</p>

            <CompleteButton section={3} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step3_01_SignalAndAutodrop" next="/Step3_03_ServoMotor" />
                <Footer />
        </div>
    );
}