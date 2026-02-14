import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import CompleteButton from '../../../../components/documents/CompleteButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step7_06_StateDesign2() {
    return (
        <div>
            <Topbar pageTitle='Step7: 重要な設計' />
            <Header page_count="6. " title="～" />
            <p>本文はここに書いてね</p>
            <CompleteButton section={7} page_number={6} />
            <br />
            <FooterPageRoute prev="/Step7_05_StateDesign1" next="/mainpage" />
            <Footer />
        </div>
    );
}
