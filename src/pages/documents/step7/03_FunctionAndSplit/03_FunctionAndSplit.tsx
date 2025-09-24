import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_03_FunctionAndSplit() {
    return (
        <div>
            <Header section="Step7 プログラムの設計を学ぼう" title="関数化とファイルの分割" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={3} />
            <br />
            <FooterPageRoute prev="/Step7_02_NamingAndNamespace" next="/Step7_04_MagicNumberEnum" />
            <Footer />
        </div>
    );
}
