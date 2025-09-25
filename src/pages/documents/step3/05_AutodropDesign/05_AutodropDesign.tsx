import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step3_05_AutodropDesign() {
    return (
        <div>
            <Topbar pageTitle='Step3: 操縦装置（プロポ）を使ってコントロールしよう' />
            <Header page_count="5. " title="自動投下装置の設計" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={3} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step3_04_Infrared" next="/Step4_01_SensorCommunication" />
            <Footer />
        </div>
    );
}
