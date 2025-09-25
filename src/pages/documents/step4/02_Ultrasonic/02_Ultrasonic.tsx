import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step4_02_Ultrasonic() {
    return (
        <div>
            <Topbar pageTitle="Step4: 超音波センサーで距離を測ってみよう" />
            <Header page_count="2. " title="超音波センサーで距離を測ってみよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={4} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step4_01_SensorCommunication" next="/Step4_03_ToF" />
            <Footer />
        </div>
    );
}
