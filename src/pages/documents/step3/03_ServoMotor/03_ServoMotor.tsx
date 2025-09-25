import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step3_03_ServoMotor() {
    return (
        <div>
            <Topbar pageTitle='Step3: 操縦装置（プロポ）を使ってコントロールしよう' />
            <Header page_count="3. " title="サーボモーター" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step3_02_SBUSRead" next="/Step3_04_Infrared" />
            <Footer />
        </div>
    );
}
