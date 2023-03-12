import Image from "next/image";
import Link from "next/link";
import useSwr, { mutate } from "swr";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/UserPage/SideBar";
import Modal from "../../components/UserPage/ModalOrder";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
import { useCookies } from 'react-cookie';
export default function UserHistory() {
  const [id_, setId] = useState(0);
  const { data: allOrders } = useSwr(`api/orderHistory/getAllOrderHistory`, fetcher);
  const pedidos = allOrders || [];
  const { data: customers } = useSwr(`/api/customers/getAllCustomers`, fetcher);
  const [cookies, setCookie] = useCookies(['name']);
  console.log(allOrders)
  return (
    <>
      <Header />

      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            <SideBar />

            <div className="ec-shop-rightside col-lg-9 col-md-12">
              <div className="ec-vendor-dashboard-card">
                <div className="ec-vendor-card-header">
                  <h5>Histórico de Pedidos</h5>
                  {/* <button onClick={calcular} style={{color: 'black'}}>AAAAAAAAA</button> */}
                </div>
                <div className="ec-vendor-card-body">
                  <div className="ec-vendor-card-table">
                    {pedidos?.length === 0 && (
                      <div className="text-center">
                        Você não fez nenhum pedido ainda
                      </div>
                    )}

                    {pedidos?.length !== 0 && (
                      <table className="table ec-table">
                        <thead>
                          <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Data</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pedidos?.map((order, index) => {
                            let produtos = JSON.parse(order.products);
                            let contador = 0;
                            return (
                              <>
                                {customers?.map((item2, index) => {
                                  
                                  if (order.id_user === cookies.customer_id && contador === 0) {
                                    contador++;
                                    return(
                                    <tr key={index}>
                                      <td style={{ width: '60px' }}>
                                        <span>{order.id}</span>
                                      </td>
                                      <td>
                                        <span>{order.date}</span>
                                      </td>
                                      <td style={{ width: '100px' }}>
                                        <span>R${produtos.total}</span>
                                      </td>
                                      <td>
                                        <span>{order.status}</span>
                                      </td>
                                      <td>
                                        <span className="tbl-btn">
                                          <div
                                            data-link-action="editmodal"
                                            title="Edit Detail"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit_modal"
                                            className="btn btn-primary d-flex justify-content-center align-items-center"
                                            onClick={() => setId(order._id)}
                                          >
                                            Visualizar
                                          </div>
                                        </span>
                                      </td>

                                    </tr>)
                                  } else if(index < 1) {
                                    return (
                                      <div className="text-center">
                                        Você não fez nenhum pedido ainda
                                      </div>
                                    )
                                  }
                                })}
                              </>
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
      </section>
      <Modal orders={allOrders} id_={id_} />
      <Footer />
    </>
  );
}
