import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step5_06_Complementary() {
    return (
        <div>
            <Topbar pageTitle="Step5: 相補フィルター" />
            <Header page_count="6. " title="相補フィルター" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step5_05_AngleFromGyro" next="/Step5_07_Madgwick" />
            <Footer />
        </div>
    );
}
