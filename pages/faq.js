import useSwr, { mutate } from "swr";
import Header from '../components/Header';
import Footer from '../components/Footer';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

    const { data: perguntas } = useSwr(`api/faq/getAllFaq`, fetcher);

    return (
        <>

            <Header />

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-faq-wrapper text-center mb-3">
                            <div className="section-title al">
                                <h2 className="ec-title">Fique sem suas dúvidas</h2>
                                <p className="sub-title-with-margin mt-5">Abaixo estão as principais pergutnas feitas pelos nossos clientes e suas respostas, caso sua dúvida ainda não seja esclarecida entre em contato!</p>
                            </div>
                        </div>
                        <div className="ec-faq-wrapper">
                            {perguntas?.map((item, index) => {
                                let collapseId = `#collapse${index}`
                                let collapse = `collapse${index}`
                                let accordion = `accordion${index}`
                                let heading = `heading${index}`
                              return(
                            <div key={index} className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h5 className="accordion-header" id={accordion}>
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={collapseId} aria-expanded="true" aria-controls={collapse}>
                                            {item.question}
                                        </button>
                                    </h5>
                                    <div id={collapse} className="accordion-collapse collapse" aria-labelledby={heading} data-bs-parent="#accordionExample">
                                        <div className="accordion-body" style={{whiteSpace: 'pre-wrap'}}>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
