import FooterPageRoute from '../../../../components/FooterPageRoute';
import ComplateButton from '../../../../components/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../layouts/CppCodeRender';

// 画像データ
export default function Basic02() {

    return (

        <div>
            <Header type="基礎編" number="02" title="UART通信をしてみよう" />

            <div className={style.title}>今回やること</div>


            <div className={style.title}>1. ピンの設定</div>


            <div className={style.title}>2. 回路の作成</div>


            <div className={style.title}>3. プログラム</div>


            <div className={style.title}>4. サンプルコード</div>


            <div className={style.title}>5. 練習問題</div>


            <div className={style.title}>6. おわりに</div>

                <p>練習問題のコードが動いたら完了ボタンを押してね</p>

                
                <ComplateButton currentPage="02" />

                <br />

            <FooterPageRoute prev="/basic_01" next="/basic_03" />

            <Footer />

        </div>
    );
}
