import axios from "axios";
import { Link } from "next/link";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import router from 'next/router'
import AddCategory from "../../components/b2b_components/category/AddCategory";
import EditCategory from "../../components/b2b_components/category/EditCategory";

import Header from "../../components/b2b_components/Header";
import Menu from "../../components/b2b_components/Menu";
import Footer from "../../components/b2b_components/Footer";
import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Category({ }) {
  const [categoryEditId, setCategoryEditId] = useState("");
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [showEditCategoryComponent, setShowEditCategoryComponent] = useState(false);

  const { data: category } = useSwr(`/api/category/getAllCategory`, fetcher);

  var tamanho = category?.length || [];

  const deleteCategorie = async (id) => {
    let data = await axios.delete(`/api/category/deleteCategory?id=${id}`);
    mutate(`/api/category/getAllCategory`);
    router.push("/b2b/category");
  };

  return (
    <>
      <div style={{ backgroundColor: '#f3f3f3' }}>
        <div style={{ display: 'flex' }}>
          <Menu />
          <div className="ec-page-wrapper">
            <div className="ec-content-wrapper">
              <div className="content">
                <div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
                  <h1>Categoria</h1>
                  <p className="breadcrumbs">
                    <span>
                      <a href="#">Dashboard</a>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Categoria
                  </p>
                </div>
                <div className="row">

                  <div className="col-xl-8 col-lg-12">
                    <div className="ec-cat-list card card-default">
                      <div className="card-body">
                        <div className="table-responsive">
                          {tamanho === 0 && (
                            <div className="text-center">
                              Não possui nenhuma categoria cadastrada
                            </div>
                          )}

                          {tamanho !== 0 && (
                            <table id="responsive-data-table" className="table">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Nome</th>
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>

                              <tbody>
                                {category?.map((item) => {
                                  return (
                                    <tr key={item._id} className="align-middle">
                                      <td>{item.id}</td>
                                      <td>{item.name}</td>
                                      <td>
                                        {item.active === 0 ? "Desativado" : "Ativado"}
                                      </td>
                                      <td className="text-right">
                                        <div className="btn-group">
                                          <button
                                            type="value"
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                              setCategoryEditId(item._id);
                                              setShowEditCategoryComponent(true);
                                            }}
                                          >
                                            Editar
                                          </button>
                                          <button
                                            className="btn btn-outline-primary delete-btn"
                                            onClick={() => deleteCategorie(item._id)}
                                          >
                                            <FaTrash color="#cc0000" />
                                          </button>
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
                  <div className="col-xl-4 col-lg-12">
                    <div className="ec-cat-list card card-default mb-24px">
                      <div className="card-body">
                        {showEditCategoryComponent !== true ? (
                          <AddCategory />
                        ) : (
                          <EditCategory categoryId={categoryEditId} categories={category} setShowEditCategoryComponent={setShowEditCategoryComponent}/>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
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