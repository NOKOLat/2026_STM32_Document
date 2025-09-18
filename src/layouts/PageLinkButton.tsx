import { Link } from "react-router-dom";
import style from './PageLinkButton.module.css';

export default function PageLinkButton({link, title}: {link: string, title: string}) {

    return (

        <div>
            <Link to= {link}>
                <button className={style.button}> {title} </button>
            </Link>
        </div>
    )
}