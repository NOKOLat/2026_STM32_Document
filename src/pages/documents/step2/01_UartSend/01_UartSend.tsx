import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
//import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step2_01_UartSend() {

    return (

        <div>

            <Header section="Step2 PCと通信してみよう" title="PCにデータを送ってみよう" />

            <p>本文はここに書いてね</p>


            <ComplateButton section={2} page_number={1} />

            <br />

            <FooterPageRoute prev="/Step1_04_LED" next="/Step2_02_UartReceive" />

            <Footer />

        </div>
    );
}
