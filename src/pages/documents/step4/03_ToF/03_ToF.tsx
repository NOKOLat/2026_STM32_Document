import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step4_03_ToF() {
    return (
        <div>
            <Header section="Step4 センサーを使って距離を測ってみよう" title="ToFセンサーで距離を測ってみよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={4} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step4_02_Ultrasonic" next="/Step4_04_FusionTwoSensors" />
            <Footer />
        </div>
    );
}
