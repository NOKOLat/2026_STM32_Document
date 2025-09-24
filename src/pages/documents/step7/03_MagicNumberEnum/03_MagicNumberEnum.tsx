import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_03_MagicNumberEnum() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="マジックナンバーのenum class化" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step7_02_FunctionAndSplit" next="/Step7_04_StateDesign1" />
            <Footer />
        </div>
    );
}
