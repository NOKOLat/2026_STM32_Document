import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step4_01_SensorCommunication() {
    return (
        <div>
            <Topbar pageTitle="Step4: センサーとの通信方法" />
            <Header page_count="1. " title="センサーとの通信方法" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={4} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step3_05_AutodropDesign" next="/Step4_02_Ultrasonic" />
            <Footer />
        </div>
    );
}
