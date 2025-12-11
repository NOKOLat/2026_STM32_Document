import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step6_07_switch_i2c_spi() {
    return (
        <div>
            <Topbar pageTitle="Step6: I2CとSPIを切り替えできるようにしよう" />
            <Header page_count="7. " title="I2CとSPIを切り替えできるようにしよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step6_06_EnumClass" next="/Step6_08_BM1422AGMV" />
            <Footer />
        </div>
    );
}
