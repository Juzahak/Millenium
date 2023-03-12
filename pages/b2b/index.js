import Link from "next/link";

import useSWR from "swr";

import { useState, useEffect } from "react";

import Modal from "../../components/b2b_components/ModalOrder";
import Menu from "../../components/b2b_components/Menu";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PendingOrder() {

  const [id_, setId] = useState(0);
  const { data: pendingOrderArr, error } = useSWR("/api/pendingOrder/getAllPendingOrder", fetcher);
  const { data: customers } = useSWR("/api/customers/getAllCustomers", fetcher);
  let pendingOrder = pendingOrderArr || [];
  console.log(pendingOrderArr)
  function renderSwitch(valueStatus) {
    switch (valueStatus) {
      case 'Pendente':
        return (
          <>
            <p className="mb-2 text-white badge badge-warning">
              {valueStatus}
            </p>
          </>
        );
      case 'Aprovado':
        return (
          <>
            <p className="mb-2 text-white badge badge-secondary">
              {valueStatus}
            </p>
          </>
        );
      case 'Enviado':
        return (
          <>
            <p className="mb-2 text-white badge badge-success">
              {valueStatus}
            </p>
          </>
        );
      case 'Finalizado':
        return (
          <>
            <p className="mb-2 text-white badge badge-info">
              {valueStatus}
            </p>
          </>
        );
      case 'Cancelado':
        return (
          <>
            <p className="mb-2 text-white badge badge-dark">
              {valueStatus}
            </p>
          </>
        );
    }
  }
  return (
    <div className="d-flex">
      <Menu />

      <div className="ec-page-wrapper">
        <div className="ec-content-wrapper">
          <div className="content">
            <div className="breadcrumb-wrapper breadcrumb-wrapper-2">
              <h1>Pedidos Pendentes</h1>
              <p className="breadcrumbs">
                <span>
                  <Link href="/b2b">Dashboard</Link>
                </span>
                <span>
                  <i className="mdi mdi-chevron-right"></i>
                </span>
                Pedidos Pendentes
              </p>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card card-default">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="responsive-data-table"
                        className="table"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {pendingOrder?.map((item) => {
                            const date = new Date(item.date);
                            
                            return (
                              <tr key={item._id} className="align-middle">
                                <td>{item.id}</td>
                                <td>
                                  {customers?.map(main => { if (item.id_user === main._id) return (<> {`${main.name}`} </>) })}
                                </td>
                                <td>{item.date}</td>
                                <td>
                                  <div className="btn-group">
                                    {renderSwitch(item.status)}
                                  </div>
                                </td>
                                <td className="text-right">
                                  <div className="btn-group">
                                    <Link
                                      href={{pathname:"/b2b", query:{id:item._id}}}
                                      data-link-action="editmodal"
                                      title="Edit Detail"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit_modal"
                                      className="btn btn-primary"
                                      onClick={() => setId(item._id)}
                                    >
                                      Visualizar
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {/* )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal orders={pendingOrder} id_={id_}/>
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