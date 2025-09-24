import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step3_02_SBUSRead() {
    return (
        <div>
            <Header section="Step3 操縦装置（プロポ）を使ってコントロールしよう" title="SBUSの読み取り" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step3_01_SignalAndAutodrop" next="/Step3_03_ServoMotor" />
            <Footer />
        </div>
    );
}
