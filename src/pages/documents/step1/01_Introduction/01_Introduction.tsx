import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';   
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
//import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step1_Introduction() {

    return (

        <div>

            <Topbar pageTitle='Step1: 開発環境を用意しよう' />

            <Header section="" title="講座の進め方" />

            <p>本文はここに書いてね</p>


            <ComplateButton section={1} page_number={1} />

            <br />

            <FooterPageRoute prev="/mainpage" next="/Step1_02_install" />

            <Footer />

        </div>
    );
}
