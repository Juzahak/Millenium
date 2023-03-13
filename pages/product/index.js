import Image from "next/image";
import useSwr, { mutate } from "swr";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProdDestaques from '../../components/ProdDestaques';
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantityInput, setQuantity] = useState(1);
    const [value, setValue] = useState(0);
    const [sizeName, setSizeName] = useState('');
    const [colorHex, setColorHex] = useState('');
    const [colorName, setColorName] = useState('');
    const [sizeId, setSizeId] = useState('');
    const [size, setSize] = useState('');
    const [array, setArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [quantity, setQuantityItem] = useState(0);
    const [product, setProduct] = useState();
    const [arrPrice, setArrPrice] = useState([]);

    const { data: products } = useSwr(`api/products/getAllProducts`, fetcher);
    const { data: colors } = useSwr(`api/colors/getAllColor`, fetcher);
    const { data: sizes } = useSwr(`api/product_sizes/getAllSizes`, fetcher);
    const { data: mainCategories } = useSwr(`api/category/getAllCategory`, fetcher);

    const router = useRouter();
    const { id } = router.query;

    // console.log(arrPrice)

    const colorConstructor = (name) => {
        setArray([]);
        setPriceArray([]);
        let arrPrice = JSON.parse(product.price) || []
        arrPrice?.forEach((item3, index) => {
            if (item3.size == name) {
                colors.forEach(item4 => {
                    if (item3.color === item4._id) {
                        setArray(array => [...array, item4]);
                    }
                })
                sizes.forEach(item5 => {
                    if (item3.size === item5._id) {
                        setPriceArray(array => [...array, item3]);
                        setValue(item3.price);
                        setQuantityItem(item3.quantity);
                        setSizeId(item3._id);
                        setSize(item3.size);
                    }
                })
            }
        })

    }

    useEffect(() => {
        products?.forEach((item, index) => {
            if (item?._id === id) {
                setProduct(item)
                setArrPrice(JSON.parse(item?.price));
                JSON.parse(item.price)?.forEach((item2, index) => {
                    if (index < 1) {
                        sizes?.map(item3 => {
                            if (item3?._id === item2?.size) {
                                setSizeName(item3?.name)
                            }
                        })
                    }
                })
            }
        })
    }, [products])

    const inputQtd = (e) => {
        let valorAtual = quantityInput;
        if (e === 'mais' && valorAtual < quantity) {
            setQuantity(valorAtual + 1);
        }
        if (valorAtual >= quantity && e === 'mais') {
            toast('Quantidade maior do que disponivel!', {
                position: "top-right",
            });
            setQuantity(valorAtual);
        }
        if (valorAtual < 1) {
            setQuantity(valorAtual = 1);
        }
        if (e === 'menos' && valorAtual >= 2) {
            setQuantity(valorAtual - 1);
        }
    }


    const addProduct = () => {
        var product = JSON.parse(localStorage.getItem('produtos'));
        if (product == null) product = [];
        var prodArr = [];
        var prodColor = '';
        var prodSize = '';

        product.forEach(producto => {

            if (producto._id == id) {
                prodArr = producto._id;
                prodColor = producto.colorHex;
                prodSize = producto.sizeId;
            }
        })

        products.forEach((item, index) => {
            let imagemURL = JSON.parse(item.image)?.map((item, index) => { if (index < 1) { return item.url } });
            if (quantityInput > parseInt(quantity) && index === 0) {
                toast('Produto além do estoque!', {
                    position: "top-right",
                })
            }
            if (colorHex === "" && colorName === "") {
                toast('Escolha o tamanho e a cor do produto!', {
                    position: "top-right",
                })
            } else if (item._id === id && quantityInput <= parseInt(quantity)) {
                var entry = {
                    fakeId: Date.now(),
                    id: item._id,
                    titulo: item.name,
                    embalagem: sizeName,
                    colorHex: colorHex,
                    colorName: colorName,
                    estoque: parseInt(quantity),
                    sizeId: sizeId,
                    valor: value,
                    imagem: imagemURL[0],
                    peso: item.peso,
                    largura: item.largura,
                    altura: item.altura,
                    comprimento: item.comprimento,
                    quantidadeCompra: quantityInput,
                    total: value * quantityInput
                }
                localStorage.setItem('entry', JSON.stringify(entry));
                product.push(entry);
                localStorage.setItem("produtos", JSON.stringify(product));
                return (
                    router.push(`/AllProducts?id=Todos+os+Produtos`),
                    toast('Produto adicionado com sucesso!', {
                        position: "top-right",
                    }))
            }
        })
    }

    return (
        <>
            <Header />

            {products?.map((item, index) => {
                let idItem = id;
                let sizeFiltred = [];
                let size = '';
                return item._id === idItem ? (
                    <>
                        {console.log("ITEM", index, item.image)}
                        <section className="ec-page-content section-space-p">
                            <div className="container">
                                <div className="row">
                                    <div className="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">
                                        <div className="single-pro-block">
                                            <div className="single-pro-inner">
                                                <div className="row">
                                                    <div className="col-12 col-md-5">
                                                        <Swiper
                                                            style={{
                                                                "--swiper-navigation-color": "#fff",
                                                                "--swiper-pagination-color": "#fff",
                                                                'marginBottom': '30px',
                                                            }}
                                                            spaceBetween={10}
                                                            navigation={true}
                                                            pagination={true}
                                                            modules={[FreeMode, Navigation, Pagination, Thumbs]}
                                                            className="mySwiper2"
                                                        >
                                                            {JSON.parse(item.image)?.map((item2, index) => {
                                                                return (
                                                                    <SwiperSlide key={index}>
                                                                        <Image src={item2.url} alt="" width={500} height={500} />
                                                                    </SwiperSlide>)
                                                            })}
                                                        </Swiper>
                                                        {/* 
                                                        <Swiper
                                                            onSwiper={setThumbsSwiper}
                                                            loop={true}
                                                            spaceBetween={10}
                                                            slidesPerView={3}
                                                            freeMode={true}
                                                            watchSlidesProgress={true}
                                                            modules={[FreeMode, Navigation, Thumbs]}
                                                            className="mySwiper"
                                                        >
                                                            {JSON.parse(item.image)?.map((item2, index) => {
                                                                return (
                                                                    <SwiperSlide key={index}>
                                                                        <Image src={item2.url} alt="" width={500} height={500} />
                                                                    </SwiperSlide>)
                                                            })}
                                                        </Swiper> */}
                                                    </div>

                                                    <div className="col-12 col-md-7">
                                                        <div className="ec-faq-wrapper mb-3 mt-3">
                                                            <div className="section-title al">
                                                                <h2 className="ec-title">{item.name}</h2>
                                                            </div>
                                                        </div>
                                                        <div className="single-pro-content h-100 d-flex flex-column justify-content-between">
                                                            <div>
                                                                <div className="ec-single-desc pt-4 pb-4" style={{ whiteSpace: 'pre-wrap' }}>
                                                                    {item.short_description}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                {JSON.parse(item.price).map((item, index) => {
                                                                    if (index < 1) {
                                                                        return (
                                                                            <div key={index} className="ec-single-price-stoke">
                                                                                <div className="ec-single-price">
                                                                                    <span className="ec-single-ps-title">
                                                                                        Valor
                                                                                    </span>
                                                                                    <span className="new-price">
                                                                                        R${(value * quantityInput).toFixed(2)}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="ec-single-stoke">
                                                                                    <span className="ec-single-ps-title">
                                                                                        Peças em Estoque:
                                                                                    </span>
                                                                                    <span className="ec-single-sku">
                                                                                        {quantity}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                })}

                                                                <div className="ec-pro-variation">
                                                                    <div className="ec-pro-variation-inner ec-pro-variation-size">
                                                                        <span>Escolha seu Tamanho</span>
                                                                        <div className="ec-pro-variation-content">
                                                                            <ul className="ec-cat-tab-nav nav d-flex flex-row">
                                                                                {JSON.parse(item.price).map((item) => {
                                                                                    if (parseInt(item.quantity) !== 0) {
                                                                                        sizes?.map((itemSize) => {
                                                                                            if (itemSize._id === item.size) {
                                                                                                size = itemSize._id;
                                                                                            }
                                                                                        });
                                                                                        sizeFiltred.push(size);
                                                                                        sizeFiltred = sizeFiltred.filter((val, id, array) => array.indexOf(val) == id);
                                                                                    }
                                                                                })}
                                                                                {sizeFiltred?.map((itemFiltred, index) => {

                                                                                    return (
                                                                                        <li key={index} onClick={() => {
                                                                                            setSizeName(itemFiltred);
                                                                                            colorConstructor(itemFiltred);
                                                                                            setColorHex("");
                                                                                            setColorName("");
                                                                                        }}>
                                                                                            <a data-bs-toggle="tab" className="cat-link selected"
                                                                                                href="#tab-cat-1">
                                                                                                <span>{sizes?.map(main => { if (itemFiltred === main._id) return (<> {`${main.name}`} </>) })}</span>

                                                                                            </a>
                                                                                        </li>
                                                                                    );
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ec-pro-variation">
                                                                    <div className="ec-pro-variation-inner ec-pro-variation-size">
                                                                        <span>Escolha sua Cor</span>
                                                                        <div className="ec-pro-variation-content">
                                                                            <ul className="ec-cat-tab-nav nav d-flex flex-row">
                                                                                {array?.map((colorFiltred, index) => {
                                                                                    return (
                                                                                        <li
                                                                                            key={index}
                                                                                            className="size-color"
                                                                                            onClick={() => {
                                                                                                setColorHex(colorFiltred.color);
                                                                                                setColorName(colorFiltred.name);
                                                                                            }}>
                                                                                            <a data-bs-toggle="tab" className="cat-link selected color"
                                                                                                href="#tab-cat-1">
                                                                                                <span
                                                                                                    style={{
                                                                                                        width: '25px',
                                                                                                        height: '25px',
                                                                                                        borderRadius: '50%',
                                                                                                        border: '1px solid #dedede',
                                                                                                        backgroundColor: `${colorFiltred.color}`,
                                                                                                    }}
                                                                                                ></span>

                                                                                            </a>
                                                                                        </li>
                                                                                    );
                                                                                })
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ec-single-qty">
                                                                    <div className="qty-plus-minus">
                                                                        <div className="dec ec_qtybtn" onClick={() => inputQtd('menos')}>-</div>
                                                                        <div className="qty-input" type="text">{quantityInput}</div>
                                                                        <div className="inc ec_qtybtn" onClick={() => inputQtd('mais')}>+</div>
                                                                    </div>
                                                                    <div className="ec-single-cart ">
                                                                        <button className="btn btn-primary" onClick={addProduct}>Adicionar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-product mt-7">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link active"
                                                        id="home-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        Descrição Completa
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div
                                                    className="tab-pane fade show active pt-5 pb-5"
                                                    id="home"
                                                    role="tabpanel"
                                                    aria-labelledby="home-tab"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                >
                                                    {item.full_description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <ProdDestaques products={products} mainCategories={mainCategories} />
                    </>
                ) : (
                    <></>
                );
            })}

            <Footer />
        </>
    );
}
