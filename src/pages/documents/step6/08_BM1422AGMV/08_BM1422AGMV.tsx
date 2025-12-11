import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step6_08_BM1422AGMV() {
    return (
        <div>
            <Topbar pageTitle="Step6: BM1422AGMVのライブラリを作ろう" />
            <Header page_count="8. " title="BM1422AGMVのライブラリを作ろう" />
            
            <p>最後に地磁気センサーのライブラリを書いてみよう</p>

            <div className={style.title}>今回やること</div>

                <div className={style.note}>
                    <ol>
                        <li>BM1422AGMVについて</li>
                        <li>ヘッダーファイルを書いてみよう</li>
                        <li>ソースファイルを書いてみよう</li>
                        <li>おわりに</li>
                    </ol>
                </div>

            <div className={style.title}>1. BM1422AGMVについて</div>




            <div className={style.title}>2. データシートを読んでみよう</div>

            
                <p>BM1422AGMVのデータシートを読んで、必要な情報を確認しよう</p>

                <p>16ページに詳細な起動からデータ取得までが書いてある</p>

                <p>また、10ページから詳細なレジスタの中身が書いてあるので、ここも読んでみよう</p>


                <a href="https://akizukidenshi.com/goodsaffix/BM1422AGMV.pdf" target="_blank" rel="noopener noreferrer">BM1422AGMVのデータシート</a>

            <div className={style.title}>3. ヘッダーファイルを書いてみよう</div>

                <p>前回までの講座で学んだことを活かして、ヘッダーファイルを書いてみよう</p>

                <p>今回は、ヘッダーファイルには宣言のみ、実装はソースファイルに書いてみよう</p>

                <p>BM1422AGMV.hpp</p>
                <CppCodeRender code={`#ifndef BM1422AGMV_H
#define BM1422AGMV_H
#include <stdint.h>
#include "i2c.h"

class BM1422AGMV {

public:

    BM1422AGMV();
    void begin(HAL_I2C_HandleTypeDef* hi2c);

    // 必要な関数とenum classを宣言


private:

    HAL_I2C_HandleTypeDef* hi2c;
    uint8_t i2c_address = 0b0001110 << 1;
};
#endif // BM1422AGMV_H`}></CppCodeRender>

                <div className={style.title}>4. ソースファイルを書いてみよう</div>

                <p>次にソースファイルを書いてみよう</p>

                <p>ヘッダーファイルで宣言した関数を呼ぶためには、BM1422AGMV:: のようにクラス名と"::"を付けたあとに関数名を書こう</p>

                <p>BM1422AGMV.cpp</p>

                <CppCodeRender code={`#include "BM1422AGMV.hpp"

BM1422AGMV::BM1422AGMV(HAL_I2C_HandleTypeDef* hi2c) {

    // コンストラクタ
}

void BM1422AGMV::begin() {

}

// ヘッダーファイルに自分で定義した関数の実装をしよう
`}></CppCodeRender>
            
            <div className={style.title}>5. おわりに</div>

                <p>これでBM1422AGMVのライブラリが完成した</p>

                <p>このようにデータシートを読み解きながらライブラリを作成できると、開発がどんどん進むのでこれからも頑張ってね</p>

            <ComplateButton section={6} page_number={8} />
            <br />
            <FooterPageRoute prev="/Step6_07_switch_i2c_spi" next="/Step7_01_ImportanceOfDesign" />
            <Footer />
        </div>
    );
}
