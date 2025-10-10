import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step5_04_AngleFromGyro() {
    return (
        <div>
            <Topbar pageTitle='Step5: センサーを使って角度を測ってみよう' />
            <Header page_count="4. " title="角速度センサーの値を取得してみよう" />

            <p>前回までの講座で、加速度からの角度計算だけでは不十分なことがわかった</p>

            <p>そこで、今回は角速度センサーの値を取得して角速度の積分から角度を得る方法を学んでみよう</p>

            <ComplateButton section={5} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step5_03_AngleFromAccel" next="/Step5_05_AngleFromGyro" />
            <Footer />
        </div>
    );
}
