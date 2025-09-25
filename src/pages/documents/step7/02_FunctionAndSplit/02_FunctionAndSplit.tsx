import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_02_FunctionAndSplit() {
    return (
        <div>
            <Topbar pageTitle='Step7: 関数化とファイルの分割' />
            <Header page_count="2. " title="関数化とファイルの分割" />
            <p>本文はここに書いてね</p>
            <ComplateButton section={7} page_number={2} />
            <br />
            <FooterPageRoute prev="/Step7_01_ImportanceOfDesign" next="/Step7_03_FunctionAndSplit" />
            <Footer />
        </div>
    );
}
