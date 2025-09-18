import { Link } from "react-router-dom";
import style from './FooterPageRoute.module.css';

export default function FooterPageRoute({prev, next}: {prev: string, next: string}) {


    return (
        
        <div className={style.pageLinkBox}>

            <Link to={prev} className={style.pageLink}> &lt; 前のページ</Link>
            <Link to="/" className={style.pageLink}> メインページ</Link>
            <Link to={next} className={style.pageLink}>次のページ &gt;</Link>
        </div>

    );
}
