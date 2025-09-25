import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step5_05_AngleFromGyro() {
    return (
        <div>
            <Header section="Step5 センサーを使って角度を測ってみよう" title="角速度の積分から角度を計算" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step5_04_GetGyro" next="/Step5_06_Complementary" />
            <Footer />
        </div>
    );
}
