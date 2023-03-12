import axios from "axios";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";
import router from 'next/router';
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Menu from "../../components/b2b_components/Menu";
import useSwr, { mutate } from "swr";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductsList() {
  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);
  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  const { data: product_sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);

  const [listImages, setlistImages] = useState();

  var tamanho = products?.length || [];

  const deleteProducts = async (id) => {
    let data = await axios.delete(`/api/products/deleteProducts?id=${id}`);
    mutate(`/api/products`);
    router.push("/b2b/ProductsList");
  };

  const customImgLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <h1>Produtos</h1>
                <p className="breadcrumbs">
                  <span>
                    <Link href="/b2b">Dashboard</Link>
                  </span>
                  <span>
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                  Produtos
                </p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-body">
                      <div className="table-responsive">
                        {tamanho === 0 && (
                          <div className="text-center">
                            Não possui nenhum produto cadastrado
                          </div>
                        )}

                        {tamanho !== 0 && (
                          <table
                            id="responsive-data-table"
                            className="table"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Status</th>
                                <th>Produto</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              {products?.map((item, index) => {
                                let price = JSON.parse(item.price);
                                return (
                                  <tr key={item._id} className="align-middle">
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                      {price?.map((valores, index) => {
                                        var colorName = "";
                                        var colorId = valores.color;
                                        colors?.map((item2, index) => { if (item2._id === colorId) { colorName = item2.name } })

                                        var sizeName = "";
                                        var sizeId = valores.size;
                                        product_sizes?.map((item2, index) => { if (item2._id === sizeId) { sizeName = item2.name } })

                                        return (<p key={index}>Valor: R${valores.price} / Qtd: {valores.quantity} <br /> {sizeName} / Cor: {colorName} </p>)
                                      })}
                                    </td>
                                    <td>
                                      {item.active === '1' ? 'Ativado' : 'desativado'}
                                    </td>
                                    <td>

                                      <Image
                                        loader={customImgLoader}
                                        className="tbl-thumb"
                                        src={JSON.parse(item.image)[0].url || require("../../assets/img/b2b/noimg.jpg")}
                                        alt="Product Image"
                                        width={500}
                                        height={500}
                                      />
                                    </td>

                                    <td className="text-right">
                                      <div className="btn-group">
                                        <Link
                                          href={{
                                            pathname: '/b2b/EditProduct',
                                            query: { id: `${item?._id}` }
                                          }}
                                          className="btn btn-primary"
                                        >
                                          Editar
                                        </Link>
                                        <a
                                          className="btn btn-outline-primary delete-btn"
                                          onClick={() => deleteProducts(item._id)}
                                        >
                                          <FaTrash color="#cc0000" />
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";

  if (myCookie.access_token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/b2b/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};