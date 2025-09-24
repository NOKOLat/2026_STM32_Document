import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_02_IMU_Library() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="IMUのライブラリを書いてみよう" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step6_01_AboutClass" next="/Step6_03_SetPins" />
            <Footer />
        </div>
    );
}
