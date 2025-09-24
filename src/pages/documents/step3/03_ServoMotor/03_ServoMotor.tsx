import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step3_03_ServoMotor() {
    return (
        <div>
            <Header section="Step3 操縦装置（プロポ）を使ってコントロールしよう" title="サーボモーター" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step3_02_SBUSRead" next="/Step3_04_Infrared" />
            <Footer />
        </div>
    );
}
