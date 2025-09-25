import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_07_BM1422AGMV() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="BM1422AGMVのライブラリ(演習問題)" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step6_06_I2C_SPI_2" next="/Step6_08_ICM42688P" />
            <Footer />
        </div>
    );
}
