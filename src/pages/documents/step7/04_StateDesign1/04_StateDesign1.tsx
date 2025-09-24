import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_04_StateDesign1() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="状態遷移の設計(1)" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step7_03_MagicNumberEnum" next="/Step7_05_StateDesign2" />
            <Footer />
        </div>
    );
}
