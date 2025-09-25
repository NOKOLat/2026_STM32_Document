import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_04_I2C_SPI_1() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="I2C/SPI両対応なコードを書こう(1)" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step6_03_IMU_Library" next="/Step6_05_I2C_SPI_1" />
            <Footer />
        </div>
    );
}
