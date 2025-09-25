import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step3_04_Infrared() {
    return (
        <div>
            <Topbar pageTitle="Step3: 赤外線の検出" />
            <Header page_count="4. " title="赤外線の検出" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step3_03_ServoMotor" next="/Step3_05_AutodropDesign" />
            <Footer />
        </div>
    );
}
