import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step4_02_Ultrasonic() {
    return (
        <div>
            <Header section="Step4 センサーを使って距離を測ってみよう" title="超音波センサーで距離を測ってみよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={4} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step4_01_SensorCommunication" next="/Step4_03_ToF" />
            <Footer />
        </div>
    );
}
