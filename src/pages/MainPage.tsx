import PageLinkButton from "../components/mainpage/PageLinkButton"
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import MainPageSection from '../components/mainpage/MainPageSection';

export default function MainPage() {

    return (

        <div>

            <section>

                <Header type="" number="" title="メインページ" />

                <MainPageSection title="Step 1 開発環境を用意しよう" section_number={1} page_count={4}>

                    <p>ファイルの自動生成や書き込みを行ってくれるSTM32CubeIDEと実行中に情報を受け取るためのTeraTermというアプリをインストールします</p>

                    <PageLinkButton section={1} number={1} link="/mainpage" title="講座の進め方" />

                    <PageLinkButton section={1} number={2} link="/mainpage" title="必要なソフトをインストールしよう" />

                    <PageLinkButton section={1} number={3} link="/mainpage" title="プロジェクトを作成しよう" />

                    <PageLinkButton section={1} number={4} link="/basic_01" title="LEDをつけてみよう" />

                </MainPageSection>

                <MainPageSection title="Step 2 PCと通信してみよう" section_number={2} page_count={4}>

                    <p>Processingなどと違って、PCとは別のところで実行するため結果を受け取るためにはPCとの通信が必要になります</p>

                    <p>ここではUART通信という最も簡単な方法を実際の例を見ながら習得しましょう!</p>

                    <PageLinkButton section={2} number={1} link="/basic_02" title="PCにデータを送ってみよう" />

                    <PageLinkButton section={2} number={2} link="/basic_03" title="PCからデータを受け取ってみよう" />

                    <PageLinkButton section={2} number={3} link="/mainpage" title="データの取りこぼしをなくすには" />

                    <PageLinkButton section={2} number={4} link="/mainpage" title="便利なprintfを使いこなそう" />

                </MainPageSection>

                <MainPageSection title="Step 3 外部の入力を受け取ってみよう" section_number={3} page_count={4}>

                    <p>飛行機やマルチコプターを飛ばすときに使うプロポの情報を受け取ってみよう</p>

                    <p>実際に大会で重要になる"自動投下装置"を作成してみよう</p>

                    <PageLinkButton section={3} number={1} link="/mainpage" title="今回作る 『自動投下装置』について" />

                    <PageLinkButton section={3} number={2} link="/mainpage" title="プロポからデータを受信してみよう" />

                    <PageLinkButton section={3} number={3} link="/mainpage" title="サーボモーターを動かしてみよう" />

                    <PageLinkButton section={3} number={4} link="/mainpage" title="赤外線を読んでみよう" />

                </MainPageSection>
        
                <Footer />

            </section>
        </div>

    )
}