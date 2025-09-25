import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
//import style from '../../../../layouts/Format.module.css';
//import CppCodeRender from '../../../../components/documents/CppCodeRender';

export default function Step2_03_UartReceiveIT() {

    return (

        <div>

            <Topbar pageTitle='Step2: PCと通信してみよう' />
            <Header page_count="3. " title="データの取りこぼしをなくそう" />

            <p>本文はここに書いてね</p>


            <ComplateButton section={2} page_number={3} />

            <br />

            <FooterPageRoute prev="/Step2_02_UartReceive" next="/Step2_04_Printf" />

            <Footer />

        </div>
    );
}
