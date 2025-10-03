import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step4_04_FusionTwoSensors() {
    return (
        <div>
            <Topbar pageTitle='Step4: センサーを使って距離を測ってみよう' />
            <Header page_count="4. " title="2つのセンサーを使って正確な距離を測ろう" />
            <p>いい感じのセンサーが見つかっていないので飛ばします</p>
            <ComplateButton section={4} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step4_03_ToF" next="/Step5_01_GetAccel" />
            <Footer />
        </div>
    );
}
