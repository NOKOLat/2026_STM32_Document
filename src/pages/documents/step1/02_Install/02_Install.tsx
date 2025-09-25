import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';
import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';
import login_image from './Login.png';

export default function Step1_Install() {

    return (

        <div>

            <Topbar pageTitle='Step1: 開発環境を用意しよう' />
            <Header page_count="2. " title="ソフトをインストールしよう" />

            <p>開発をするうえで必要なツールのインストールを行います！</p>

            <p>今回はwin10/win11環境を想定した手順になっているため、ほかのOSを使用している人は講座担当者に相談してください。</p>

            <div className={style.title}>今回やること</div>

                <p>今回は、STM32の開発に必要なソフトをインストールしよう</p>

                <p>今回の内容は以下の通り</p>

                <div className={style.note}>
                    <ol>
                        <li>STmicroのアカウントを作る</li>
                        <li>STM32CubeIDEをインストールする</li>
                        <li>STM32CubeIDEを開き、ログインする</li>
                        <li>TeraTermをインストールする</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>1. STmicroのアカウントを作る</div>

                <p>STM32の開発を行うには、STmicroのアカウントが必要になる</p>
                <p>以下のリンクを開いて、右上の人のアイコンからアカウントを作成しよう</p>

                <p>メールアドレスとパスワードはこの後使うので、メモやスクショをとっておこう</p>

                <a href="https://www.st.com/ja/development-tools/stm32cubeide.html" target="_blank" rel="noopener noreferrer">ダウンロードはこちら</a>

            <div className={style.title}>2. STM32CubeIDEをインストールする</div>

                <p>次に、STM32CubeIDEをインストールする</p>
                <p>先ほどのリンクの下のほうにいくと、"ソフトウェア入手"というセクションがあるので、そこをクリックしよう</p>
                <p>"STM32CubeIDE-Win"の最新バージョンをダウンロードしよう</p>

                <p>ダウンロードされたzipファイルを解凍してインストーラーを起動すれば、インストールが始まるよ</p>

            <div className={style.title}>3. STM32CubeIDEを開き、ログインする</div>

                <p>インストールが完了したら、STM32CubeIDEを起動しよう</p>
                <p>いろいろな画面が出てくるが、とりあえず確定を押しておけば大丈夫</p>

                <p>上にツールバーが出てきたら、"Help" → "STM32Cube Update" → "Connection myST"を押して、ログインしよう</p>

                <p>ログインに失敗することがあるが、3回くらいやるとうまくいくことが多い</p>

                <figure>
                    <img src={login_image} alt="STM32CubeIDE: mySTへのログイン画面" />
                </figure>

            <div className={style.title}>4. TeraTermをインストールする</div>

                <p>TeraTermをインストールするには、以下のリンクからダウンロードページに移動しよう</p>

                <p>V5系統・64bitと書いてあるものをダウンロードしよう（上から2番目）</p>

                <a href="https://forest.watch.impress.co.jp/library/software/utf8teraterm/" target="_blank" rel="noopener noreferrer">ダウンロードはこちら</a>

            <div className={style.title}>5. 進捗報告</div>

                <p>これで、開発に必要なソフトのインストールが終わりました！</p>

                <p>次のページでは、実際にプロジェクトを作成していきます</p>

                <p>それでは、進捗報告ボタンを押して次のステップに進みましょう</p>

                <ComplateButton section={1} page_number={2} />

            <br />

            <FooterPageRoute prev="/Step1_01_introduction" next="/Step1_03_makeproject" />

            <Footer />

        </div>
    );
}
