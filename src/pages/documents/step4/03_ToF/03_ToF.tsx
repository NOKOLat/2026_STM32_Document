import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step4_03_ToF() {
    return (
        <div>
            <Topbar pageTitle='Step4: センサーを使って距離を測ってみよう' />
            <Header page_count="3. " title="ToFセンサーで距離を測ってみよう" />


            <p>いい感じのセンサーが見つかっていないので飛ばします</p>


            <ComplateButton section={4} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step4_02_Ultrasonic" next="/Step4_04_FusionTwoSensors" />
            <Footer />
        </div>
    );
}
