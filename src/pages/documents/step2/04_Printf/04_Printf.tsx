import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
//import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step2_04_Printf() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="4. " title="便利なprintfを使いこなそう" />

            <p>本文はここに書いてね</p>


            <ComplateButton section={2} page_number={4} />

            <br />

            <FooterPageRoute prev="/Step2_03_UartReceiveIT" next="/Step3_01_SignalAndAutodrop" />

            <Footer />

        </div>
    );
}
