import PageLinkButton from "../layouts/PageLinkButton"
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';


export default function MainPage() {

    return (

        <div>

            <section>

                <Header type="メインページ" number="" title="メインページ" />

                <PageLinkButton link="/basic_01" title="基礎編1 LEDをつけよう" />

                <PageLinkButton link="/basic_02" title="基礎編2 UART通信をしてみよう" />

                <PageLinkButton link="/basic_03" title="基礎編3 タイマを使ってみよう" />

                <Footer />

            </section>
        </div>

    )
}