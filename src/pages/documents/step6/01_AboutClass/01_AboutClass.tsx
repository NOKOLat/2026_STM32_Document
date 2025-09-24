import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_01_AboutClass() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="クラスとは" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step6_00_AboutLibrary" next="/Step6_02_IMU_Library" />
            <Footer />
        </div>
    );
}
