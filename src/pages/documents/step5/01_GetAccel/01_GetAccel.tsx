import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step5_01_GetAccel() {
    return (
        <div>
            <Header section="Step5 センサーを使って角度を測ってみよう" title="加速度データの取得" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step4_04_FusionTwoSensors" next="/Step5_02_AngleFromAccel" />
            <Footer />
        </div>
    );
}
