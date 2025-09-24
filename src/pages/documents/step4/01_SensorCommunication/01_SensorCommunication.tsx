import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step4_01_SensorCommunication() {
    return (
        <div>
            <Header section="Step4 センサーを使って距離を測ってみよう" title="センサーとの通信方法" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={4} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step3_05_AutodropDesign" next="/Step4_02_Ultrasonic" />
            <Footer />
        </div>
    );
}
