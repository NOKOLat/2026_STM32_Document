import PageLinkButton from "../layouts/PageLinkButton"

export default function MainPage() {

    return (

        <div>
            <h1>Main Page</h1>
            <p>Welcome to the main page!</p>


            <section>

                <h2>基礎編</h2>

                <PageLinkButton link="/basic_01" title="基礎編1 LEDをつけよう" />

            </section>
        </div>

    )
}