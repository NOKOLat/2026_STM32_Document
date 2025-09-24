import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_01_ImportanceOfDesign() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="設計の重要性" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step6_08_ICM42688P" next="/Step7_02_NamingAndNamespace" />
            <Footer />
        </div>
    );
}
