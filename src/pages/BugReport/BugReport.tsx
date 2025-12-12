import Topbar from '../../layouts/Topbar';
import Footer from '../../layouts/Footer';

export default function BugReport() {
  return (
    <div>
      <Topbar pageTitle='バグ報告' />
      
        <h3>バグ報告について</h3>

        <p>githubのissueにてバグ報告を受け付けています。</p>

        <p>右上のgithubアイコンからアクセスしてください。</p>

        <p>現在ははDiscordサーバー上のバグ報告でも受け付けています</p>

        <br />

        <br />

        <br />

      <Footer />
    </div>
  );
}
