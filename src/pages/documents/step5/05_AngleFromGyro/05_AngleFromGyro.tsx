import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step5_05_AngleFromGyro() {
    return (
        <div>
            <Topbar pageTitle="Step5: 角速度の積分から角度を計算" />
            <Header page_count="5. " title="角速度の積分から角度を計算" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step5_04_AngleFromGyro" next="/Step5_06_Complementary" />
            <Footer />
        </div>
    );
}
