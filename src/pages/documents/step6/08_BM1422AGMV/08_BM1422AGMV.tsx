import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step6_08_BM1422AGMV() {
    return (
        <div>
            <Topbar pageTitle="Step6: BM1422AGMVのライブラリを作ろう" />
            <Header page_count="8. " title="BM1422AGMVのライブラリを作ろう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={8} />
            <br />
            <FooterPageRoute prev="/Step6_07_switch_i2c_spi" next="/Step7_01_ImportanceOfDesign" />
            <Footer />
        </div>
    );
}
