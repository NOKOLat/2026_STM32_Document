import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step6_07_ICM42688P() {
    return (
        <div>
            <Header section="Step6 センサーのライブラリを自作してみよう" title="ICM42688Pのライブラリを書く（演習問題）" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={6} page_number={7} />
            <br />
            <FooterPageRoute prev="/Step6_06_BM1422AGMV" next="/Step7_00_ImportanceOfDesign" />
            <Footer />
        </div>
    );
}
