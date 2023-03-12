import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Instagram from '../components/Instagram';
// import ProdDestaques from '../components/ProdDestaques';
import Header from '../components/Header';
import Footer from '../components/Footer';

import useSwr from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {

  const { data: banners } = useSwr(`/api/banners/getAllBanners`, fetcher);
  const { data: subBanners } = useSwr(`/api/subBanners/getAllSubBanner`, fetcher);
  const { data: promotions } = useSwr(`/api/promotions/getAllPromotions`, fetcher);
  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  const { data: sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);
  const { data: mainCategories } = useSwr(`/api/category/getAllCategory`, fetcher);
  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);

  return (
    <>

      <Header />
      {/* <!-- ec Banner Slider --> */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={true}
        autoplay={{ delay: 5000 }}>
        {banners?.map((item, index) => {
          let imagem = JSON.parse(item.image)[0].url;
          return (
            <SwiperSlide key={index}>
              <div style={{ position: 'absolute', width: '100%' }}>
                <Image alt="Site Logo" src={imagem} width={3000} height={2000} className='mob-banner' />
              </div>
              <div className="ec-slide-item swiper-slide d-flex slide" style={{ minHeight: '450px' }}>
                <div className="container align-self-center">
                  <div className="row">
                    <div
                      className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                      <div className="ec-slide-content slider-animation mob-content">
                        <h2 className="ec-slide-stitle">{item.title}</h2>
                        <h1 className="ec-slide-title">{item.text}</h1>
                        <Link href={item.btnLink} className="btn btn-lg btn-primary">{item.btnText}</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>)
        })}
      </Swiper>

      {/* <!-- ec Banner Section Start --> */}
      <section className="ec-banner section section-space-p">
        <h2 className="d-none">Banner</h2>
        <div className="container">
          <div className="row">
            <div className="ec-banner-bottom">
              <div className="ec-banner-inner">
                {promotions?.map((item, index) => {
                  let imagem = JSON.parse(item.image)[0].url;
                  return (
                    <div key={index} className="ec-banner-block ec-banner-block-4 mar-b-30">
                      <Link href={item.btnLink}>
                        <div className="banner-block">
                          <Image src={imagem} height={800} width={1200} alt="" />
                          <div className="banner-content">
                            <div className="banner-text">
                              <span className="ec-banner-title">{item.title}</span>
                              <span className="ec-banner-discount">{item.text}</span>
                            </div>
                            <span className="ec-banner-btn"><Link href={item.btnLink}>{item.btnText}</Link></span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ec Banner Section End --> */}

      {/* <!-- Trending Item Start --> */}
      <section className="section ec-trend-product section-space-p">
        <div className='col-12 d-flex pb-4 mob-column container flex-wrap flex-row' >
          {products?.map((item, index) => {
            let valores = JSON.parse(item.price);
            let mainName = '';
            let imagem = '';
            let sizeFiltred = [];
            let size = '';
            let colorFiltred = [];
            let smallValue = '';
            let prodExiste = 0;
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            const newList = shuffle(JSON.parse(item.image));
            mainCategories?.map((item3, index) => { if (item3._id === item.category) { mainName = item3.name } })
            newList?.map((item4, index) => { if (index === 0) { imagem = item4.url } })
            console.log(valores)
            valores.forEach((item) => {
              if (item.quantity > 0) {
                prodExiste++;
              }
            })
            if (prodExiste > 0) {
              return (
                <div key={item._id} className="ec-product-content col-lg-3 col-sm-6 col-12 mb-4">
                  <div className="ec-product-inner">
                    <div className="ec-pro-image-outer">
                      <Link className="ec-pro-image" href={{ pathname: "/product", query: { id: `${item._id}` }, }}>
                        <Image
                          className="main-image"
                          src={imagem}
                          alt="Product"
                          width={500}
                          height={500}
                        />
                      </Link>
                    </div>
                    <div className="ec-pro-content px-1">
                      <h5 className="ec-price">
                        <Link href={{ pathname: "/product", query: { id: `${item._id}` }, }} className="new-price" style={{ color: '#B01D21' }}>{item.name}</Link>
                      </h5>
                      <span className="ec-price">
                        {valores?.map((itemValue) => {
                          if (parseInt(itemValue.quantity) !== 0) {
                            if (smallValue === '') {
                              smallValue = itemValue.price;
                            }
                            if (parseFloat(smallValue) > parseFloat(itemValue.price)) {
                              smallValue = itemValue.price;
                            }
                          }
                        })}
                        <span className="new-price">Apartir de: <br />R$ {parseFloat(smallValue).toFixed(2)}</span>
                        <span className="old-price">
                          Em até 3x de R$
                          {(parseFloat(smallValue) / 3).toFixed(2)}
                        </span>
                      </span>
                      <div className="ec-pro-option">
                        <div className="ec-pro-color">
                          <ul className="ec-opt-swatch ec-change-img">
                            {JSON.parse(item.price).map((item) => {
                              if (parseInt(item.quantity) !== 0) {
                                let color = "";
                                colors?.map((itemColor) => {
                                  if (itemColor._id === item.color) {
                                    color = itemColor.color;
                                  }
                                });
                                colorFiltred.push(color);
                                colorFiltred = colorFiltred.filter((val, id, array) => array.indexOf(val) == id);
                              }
                            })}
                            {
                              colorFiltred?.map((colorFiltred) => {
                                return (
                                  <>
                                    <li style={{ cursor: "default" }}>
                                      <a className="ec-opt-clr-img">
                                        <span
                                          style={{
                                            backgroundColor: `${colorFiltred}`,
                                          }}
                                        ></span>
                                      </a>
                                    </li>
                                  </>
                                );
                              })
                            }
                          </ul>
                        </div>
                        <div className="ec-pro-size">
                          <ul className="ec-opt-size">
                            {JSON.parse(item.price).map((item) => {
                              if (parseInt(item.quantity) !== 0) {
                                sizes?.map((itemSize) => {
                                  if (itemSize._id === item.size) {
                                    size = itemSize.name;
                                  }
                                });
                                sizeFiltred.push(size);
                                sizeFiltred = sizeFiltred.filter((val, id, array) => array.indexOf(val) == id);
                              }
                            })}
                            {sizeFiltred?.map((itemFiltred) => {
                              return (
                                <>
                                  <li
                                    className="active"
                                    style={{ cursor: "default" }}
                                  >
                                    <a className="ec-opt-sz">{itemFiltred}</a>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className='col-12 pt-3'>
                      <span className="ec-offer-btn" style={{ borderRadius: '0px' }}><Link href={{ pathname: "/product", query: { id: `${item._id}` }, }} className="btn btn-lg btn-primary w-100 itemBtn d-flex">Compre Já</Link></span>
                    </div>
                  </div>
                </div>
              )
            }
          })
          }
        </div>
      </section>
      {/* // <!-- Trending Item end --> */}

      <section className="section ec-offer-section section-space-mb">
        {subBanners?.map((item, index) => {
          if (index < 1) {
            return (
              <>
                <div style={{ width: '100%', height: '500px' }}>
                  <Image src={JSON.parse(item.image)[0].url} width={3000} height={2000} alt="" className='imageBanner' />
                </div>
                <div className="ec-offer-inner">
                  <div className="row justify-content-end">
                    <div className="col-12 col-md-7 align-self-center ec-offer-content">
                      <h2 className="ec-offer-title pb-5">{item.title}</h2>
                      <span className="ec-offer-desc d-block" style={{ whiteSpace: 'pre-wrap' }}>{item.text}</span>
                      <span className="ec-offer-btn"><Link href={item.btnLink} className="btn btn-lg btn-primary">{item.btnText}</Link></span>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        })}
      </section>

      {/* <ProdDestaques products={products} mainCategories={mainCategories} sizes={sizes} colors={colors} /> */}

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
