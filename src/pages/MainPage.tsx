import PageLinkButton from '../components/mainpage/PageLinkButton';
import Topbar from '../layouts/Topbar';
import Footer from '../layouts/Footer';
import MainPageSection from '../components/mainpage/MainPageSection';
import { ACTIVE_COURSE_SECTIONS } from '../features/course/courseData';

export default function MainPage() {
    return (
        <div>
            <section>
                <Topbar pageTitle='メインページ' />

                {ACTIVE_COURSE_SECTIONS.map((section) => (
                    <div key={section.id} id={`section${section.id}`}>
                        <MainPageSection
                            title={section.title}
                            section_number={section.id}
                            page_count={section.lessons.length}
                        >
                            {section.description.map((text) => (
                                <p key={text}>{text}</p>
                            ))}

                            {section.lessons.map((lesson) => (
                                <PageLinkButton
                                    key={lesson.path}
                                    section={section.id}
                                    number={lesson.number}
                                    link={lesson.path}
                                    title={lesson.title}
                                />
                            ))}
                        </MainPageSection>
                    </div>
                ))}

                <Footer />
            </section>
        </div>
    )
}
