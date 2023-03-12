import Image from 'next/image'
import useSwr from "swr";
import ProdDestaques from '../components/ProdDestaques';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Instagram from '../components/Instagram';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { data: products } = useSwr(`api/products`, fetcher);
    return (
        <>

            <Header />

            <section>
                <div className='container'>
                    <div className="row mb-4 mt-5 pt-4">

                        <div className="ec-faq-wrapper text-center mb-3">
                            <div className="section-title al">
                                <h2 className="ec-title">Sobre As Papoulas</h2>
                                <p className="sub-title-with-margin mt-5">Nossa história e nossos pensamentos sobre moda diretamente para você!</p>
                            </div>
                        </div>

                        <div className="col-md-12 text-center">

                            <div className='col-12 d-block d-md-flex mt-4 justify-content-center'>

                                <div className='col-12 col-md-2 d-flex flex-md-column justify-content-around'>
                                    <Image src={require("../assets/img/produtos/3.jpg")} alt="" className="grid-img-small" />
                                    <Image src={require("../assets/img/produtos/2.jpg")} alt="" className="grid-img-small" />
                                </div>

                                <div className='col-12 col-md-4'>
                                    <Image src={require("../assets/img/produtos/1.jpg")} alt="" className="grid-img" />
                                </div>

                                <div className='col-12 col-md-2 d-flex flex-md-column justify-content-around'>
                                    <Image src={require("../assets/img/produtos/1.jpg")} alt="" className="grid-img-small" />
                                    <Image src={require("../assets/img/produtos/3.jpg")} alt="" className="grid-img-small" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <ProdDestaques products={products} />

            <section className="section ec-brand-area section-space-p pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-6">
                            <div className="section-title">
                                <h2 className="ec-title">Instagram</h2>
                            </div>
                        </div>

                        <Instagram />

                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
}
