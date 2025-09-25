import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step6_03_IMU_Library() {
    return (
        <div>
            <Topbar pageTitle="Step6: IMUのライブラリを使ってみよう" />
            <Header page_count="3. " title="IMUのライブラリを使ってみよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step6_02_AboutClass" next="/Step6_04_I2C_SPI_1" />
            <Footer />
        </div>
    );
}
