import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step3_04_Infrared() {
    return (
        <div>
            <Header section="Step3 操縦装置（プロポ）を使ってコントロールしよう" title="赤外線の検出" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step3_03_ServoMotor" next="/Step3_05_AutodropDesign" />
            <Footer />
        </div>
    );
}
