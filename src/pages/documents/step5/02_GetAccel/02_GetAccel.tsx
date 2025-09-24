import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step5_02_GetAccel() {
    return (
        <div>
            <Header section="Step5 センサーを使って角度を測ってみよう" title="加速度データの取得" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={5} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step5_01_SPI" next="/Step5_03_AngleFromAccel" />
            <Footer />
        </div>
    );
}
