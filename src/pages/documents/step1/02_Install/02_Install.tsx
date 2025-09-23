import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
//import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step1_Install() {

    return (

        <div>

            <Header section="Step1 開発環境を用意しよう" title="ソフトをインストールしよう" />

            <p>本文はここに書いてね</p>


            <ComplateButton section={1} page_number={2} />

            <br />

            <FooterPageRoute prev="/Step1_01_introduction" next="/Step1_03_makeproject" />

            <Footer />

        </div>
    );
}
