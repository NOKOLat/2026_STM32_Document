import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_06_BM1422AGMV() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="BM1422AGMVのライブラリ（演習問題）" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step6_05_I2C_SPI_1" next="/Step6_07_BM1422AGMV" />
            <Footer />
        </div>
    );
}
