import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step5_07_Madgwick() {
    return (
        <div>
            <Topbar pageTitle="Step5: Madgwickフィルター" />
            <Header page_count="7. " title="Madgwickフィルター" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step5_06_Complementary" next="/Step6_01_AboutClass" />
            <Footer />
        </div>
    );
}
