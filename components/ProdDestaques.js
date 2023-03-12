import Image from 'next/image'
import Link from 'next/link';
import useSwr from "swr";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const fetcher = (url) => fetch(url).then((res) => res.json());
function ProdDestaques() {
  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  const { data: sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);
  const { data: mainCategories } = useSwr(`/api/category/getAllCategory`, fetcher);
  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);
  return (
    <>
      {/* <!-- Trending Item Start --> */}
      <section className="section ec-trend-product section-space-p">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-title mb-4">Produtos em Destaque</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 d-flex pb-4 mob-column container flex-wrap flex-row' >
          {products?.map((item, index) => {
            if (index <= 8) {
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
              valores.forEach((item) => {
                if (item.quantity > 0) {
                  prodExiste++;
                }
              })
              if (prodExiste > 0) {

                if (index < 4 && item.featured == 1) {
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
                                  colorFiltred?.map((colorFiltred, index) => {
                                    return (
                                      <li key={index} style={{ cursor: "default" }}>
                                        <a className="ec-opt-clr-img">
                                          <span
                                            style={{
                                              backgroundColor: `${colorFiltred}`,
                                            }}
                                          ></span>
                                        </a>
                                      </li>
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
                                {sizeFiltred?.map((itemFiltred, index) => {
                                  return (
                                    <li
                                      key={index}
                                      className="active"
                                      style={{ cursor: "default" }}
                                    >
                                      <a className="ec-opt-sz">{itemFiltred}</a>
                                    </li>
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
              }
            }
          })
          }
        </div>
      </section>
      {/* // <!-- Trending Item end --> */}
    </>
  );
}

export default ProdDestaques;
