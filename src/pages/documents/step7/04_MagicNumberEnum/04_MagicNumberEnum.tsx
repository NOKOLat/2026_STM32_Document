import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_04_MagicNumberEnum() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="マジックナンバーとenum class化" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={4} />
            <br />
            <FooterPageRoute prev="/Step7_03_FunctionAndSplit" next="/Step7_05_StateDesign1" />
            <Footer />
        </div>
    );
}
