import FooterPageRoute from '../../../../components/documents/FooterPageRoute';
import ComplateButton from '../../../../components/documents/ComplateButton';
import Header from '../../../../layouts/Header';
import Footer from '../../../../layouts/Footer';
import Topbar from '../../../../layouts/Topbar';

export default function Step3_01_SignalAndAutodrop() {

    return (
        <div>
            <Topbar pageTitle="Step3: 信号の流れと自動投下の話" />
            <Header page_count="1. " title="信号の流れと自動投下の話" />

            <p>本文はここに書いてね</p>

            <ComplateButton section={3} page_number={1} />
            <br />
            <FooterPageRoute prev="/Step2_04_Printf" next="/Step3_02_SBUSRead" />
            <Footer />
        </div>
    );
}
