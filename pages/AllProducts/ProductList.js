import Image from "next/image";
import Link from 'next/link';
import { FaShoppingBag } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CheckoutArr } from "../../Context";

import useSwr from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductList({ categorySelected, setCategorySelected, subCategorySelected, setSubCategorySelected, products, initialid, setProcura, procura }) {

  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  const { data: sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);
  const { data: mainCategories } = useSwr(`/api/category/getAllCategory`, fetcher);

  const { searchData } = useContext(CheckoutArr);
  const procuraFiltro = useRouter().query.procura;
  const buscaFiltro = useRouter().query.busca;
  const [array, setArray] = useState([]);
  let listArr = [];

  console.log(searchData)

  useEffect(() => {
    if (procuraFiltro !== undefined) {
      setProcura(procuraFiltro);
      setCategorySelected(0);
      setSubCategorySelected(0);
    }
  }, [procuraFiltro]);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => {
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
                <div key={item._id} className="ec-product-content col-12 col-lg-4 col-sm-6 mb-4">
                  <div className="ec-product-inner">
                    <div className="ec-pro-image-outer">
                      <div className="ec-pro-image">
                        <Link href={{ pathname: "/product", query: { id: `${item._id}` }, }} className="image">
                          <Image
                            className="main-image"
                            src={imagem}
                            alt="Product"
                            width={500}
                            height={500}
                          />
                          <Image
                            className="hover-image"
                            src={imagem}
                            alt="Product"
                            width={500}
                            height={500}
                          />
                        </Link>
                      </div>
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
          })}
      </>
    );

  }

  function PaginatedItems({ itemsPerPage, listArr }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = listArr.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listArr.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % listArr.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Próximo >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Antes"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }


  return (
    <>
      {searchData.map((item, index) => {
        if (procura === "Sim") {
          listArr.push(item)
          console.log(listArr)

        }
      })}


      {products?.map((item, index) => {
        if (categorySelected === item.category &&
          subCategorySelected === item.subcategory) {
          listArr.push(item)
          console.log(listArr)

        }
        if (categorySelected === "Todos os Produtos" || initialid === "Todos os Produtos") {
          listArr.push(item)
          console.log(listArr)
        }

        if (categorySelected === item.category && subCategorySelected === "" || initialid === item.category && subCategorySelected === undefined) {
          listArr.push(item)
          console.log(listArr)
        }

      })}

      <PaginatedItems itemsPerPage={12} listArr={listArr} />
    </>
  );
}
