import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import FooterPageRoute from "../../layouts/FooterPageRoute";

export default function TestPage() {

    return (
        <div>
            <Header title="テストページ" type = "開発編" number="1" />

            <h1>テストページ</h1>
            <h3>アクセステスト</h3>


            <FooterPageRoute prev="/" next="/" />
            
            <Footer />
        </div>
    );
}
