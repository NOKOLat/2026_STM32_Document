import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_00_AboutLibrary() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="ライブラリとは" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={0} />
            <br />
            <FooterPageRoute prev="/Step5_06_Madgwick" next="/Step6_01_AboutClass" />
            <Footer />
        </div>
    );
}
