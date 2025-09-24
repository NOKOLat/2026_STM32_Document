import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_01_NamingAndNamespace() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="命名規則と名前空間" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step7_00_ImportanceOfDesign" next="/Step7_02_FunctionAndSplit" />
            <Footer />
        </div>
    );
}
