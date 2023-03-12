import axios from "axios";
import { Link } from "next/link";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import router from 'next/router'
import AddColors from "../../components/b2b_components/colors/AddColors";
import EditColors from "../../components/b2b_components/colors/EditColors";

import Menu from "../../components/b2b_components/Menu";
import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Colors({ }) {
  const [colorEditId, setColorEditId] = useState("");
  const [showEditCategoryComponent, setShowEditCategoryComponent] = useState(false);

  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);

  var tamanho = colors?.length || [];

  const deleteColors = async (id) => {
    let data = await axios.delete(`/api/colors/deleteColor?id=${id}`);
    mutate(`/api/colors/getAllColor`);
    router.push("/b2b/color");
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
                  <h1>Cores</h1>
                  <p className="breadcrumbs">
                    <span>
                      <a href="#">Dashboard</a>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Cores
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
                                  <th>Cor</th>
                                  <th></th>
                                </tr>
                              </thead>

                              <tbody>
                                {colors?.map((item) => {
                                  return (
                                    <tr key={item._id} className="align-middle">
                                      <td>{item.id}</td>
                                      <td>{item.name}</td>
                                      <td>
                                        <div style={{ backgroundColor: `${item.color}`, width: '100px', height: '30px' }}></div>
                                      </td>
                                      <td className="text-right">
                                        <div className="btn-group">
                                          <button
                                            type="value"
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                            setColorEditId(item._id);
                                            setShowEditCategoryComponent(true);
                                            }}
                                          >
                                            Editar
                                          </button>
                                          <button
                                            className="btn btn-outline-primary delete-btn"
                                            onClick={() => deleteColors(item._id)}
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
                          <AddColors />
                        ) : (
                          <EditColors colorId={colorEditId} colors={colors} setShowEditCategoryComponent={setShowEditCategoryComponent}/>
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