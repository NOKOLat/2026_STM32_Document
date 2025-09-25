import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';   
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import style from '../../../../layouts/Format.module.css';

export default function Step1_Introduction() {

    return (

        <div>

            <Topbar pageTitle='Step1: 開発環境を用意しよう' />

            <Header page_count="1. " title="講座の進め方" /> 

            <p>この講座では、STM32を使った開発の基本を学びます</p>
            <p>STM32はかなり難しい部類に入るため、少しでもわかりやすいように細かい講座にわけられています</p>

            <div className={style.title}>この講座について</div>

            <p>この講座では、STM32を使った基本的な操作から外部通信・プログラムの設計まで幅広く学ぶことができます。</p>
            <p>作成者が1年半かけて勉強したことが詰まっているので、9月中までに終えられたら相当すごいことです。</p>

            <p><strong>後半の内容は特に難しいので、区切りのいいところまで進めてほかの製作を体験するのもよい選択肢だと思います！</strong></p>


            <div className={style.title}>講座の流れ</div>

                <p>各講座はこのような構成になっています</p>

                <p>基本的に、ページの上から読み進めて作業していくと理解しやすいように書いてあります</p>

                <div className={style.note}>
                    <ol>
                        <li>概要・前提知識の説明</li>
                        <li>ピンの設定</li>
                        <li>回路を作成する</li>
                        <li>関数を知る</li>
                        <li>サンプルコードを動かす</li>
                        <li>練習問題を解いてみる</li>
                        <li>進捗報告ボタンを押す</li>
                    </ol>
                </div>

            <div className={style.title}>講座を受けるにあたって</div>

            <p>STM32の開発がしっかりできるようになってほしいので、以下の点に気を付けてください</p>

            <p>時間がかかってもいいので、安全に確実に理解しながら進めてください</p>

            <div className={style.note}>
                <ol>
                    <li>生成AIによるコード作成をさける(質問はOK)</li>
                    <li>配線の確認を怠らない（ショートして燃えます）</li>
                </ol>
            </div>

            <div className={style.title}>バグや不具合の報告について</div>

            <p>システム + ドキュメントで3万行程度のコードによって構成されています</p>

            <p>作成者は普通の人間なので、ほぼ確実に何かしらのバグがいると思います</p>

            <p>もしバグや不具合を見つけた場合は、上のツールバーの「報告」ボタンからバグ報告にご協力ください</p>

            <div className={style.title}>進捗報告について</div>

            <p>各ページにある練習問題を解き終わったら、完了報告ボタンを押してください</p>

            <p>ボタンを押すとDiscordに進捗が報告されて、メインページに戻ります</p>

            <p>今回の説明の内容を読んだら、ボタンを押してください！</p>

            <ComplateButton section={1} page_number={1} />

            <br />

            <FooterPageRoute prev="/mainpage" next="/Step1_02_install" />

            <Footer />

        </div>
    );
}
