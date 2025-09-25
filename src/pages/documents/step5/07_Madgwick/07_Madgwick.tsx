import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step5_07_Madgwick() {
    return (
        <div>
            <Header section="Step5 センサーを使って角度を測ってみよう" title="Madgwickフィルター" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step5_06_Complementary" next="/Step6_01_AboutLibrary" />
            <Footer />
        </div>
    );
}
