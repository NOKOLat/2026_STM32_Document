import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_01_AboutClass() {
    return (
        <div>
            <Topbar pageTitle='Step6: クラスとは' />
            <Header page_count="1. " title="クラスとは" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step5_07_Madgwick" next="/Step6_02_AboutClass" />
            <Footer />
        </div>
    );
}
