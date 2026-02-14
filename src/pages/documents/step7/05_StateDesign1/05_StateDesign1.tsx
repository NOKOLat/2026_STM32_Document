import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Topbar from '../../../../layouts/Topbar';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';

export default function Step7_05_StateDesign1() {
    return (
        <div>
            <Topbar pageTitle='Step7: 重要な設計' />
            <Header page_count="5. " title="状態遷移の設計(1)" />
            <p>本文はここに書いてね</p>
            <CompleteButton section={7} page_number={5} />
            <br />
            <FooterPageRoute prev="/Step7_04_MagicNumberEnum" next="/Step7_06_StateDesign2" />
            <Footer />
        </div>
    );
}
