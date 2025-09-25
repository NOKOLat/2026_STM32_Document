import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_02_AboutClass() {
    return (
        <div>
            <Topbar pageTitle='Step6: クラスの例' />
            <Header page_count="2. " title="クラスの例" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step6_01_AboutClass" next="/Step6_03_IMU_Library" />
            <Footer />
        </div>
    );
}
