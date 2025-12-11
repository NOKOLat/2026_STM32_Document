import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step6_06_EnumClass() {
    return (
        <div>
            <Topbar pageTitle="Step6: センサーライブラリを自作してみよう" />
            <Header page_count="6. " title="Enum Classを使ってみよう" />








            <ComplateButton section={6} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step6_05_Improve_Library_2" next="/Step6_07_switch_i2c_spi" />
            <Footer />
        </div>
    );
}
