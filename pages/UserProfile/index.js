import Image from "next/image";
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/UserPage/SideBar";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

import useSwr, { mutate } from "swr";
import { useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile() {
  const [id_, setId] = useState(0);
  const { data: allCustomers } = useSwr(`/api/customers/getAllCustomers`, fetcher);
  const [cookies] = useCookies();

  return (
    <>
      <Header />

      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            <SideBar />

            {allCustomers?.map((customer) => {
            console.log(customer)
              return (
                <>
                  {customer._id === cookies.customer_id && (
                    <div
                      key={customer._id}
                      className="ec-shop-rightside col-lg-9 col-md-12"
                    >
                      <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
                        <div className="ec-vendor-card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="ec-vendor-block-profile">
                                <div className="ec-vendor-block-img space-bottom-30">
                                  <div className="ec-vendor-block-detail pb-5">
                                    <h5 className="name">{customer.name}</h5>
                                  </div>
                                  <p>
                                    Olá <span>{customer.name}</span>
                                  </p>
                                  <p className="mt-3">
                                    Bem vindo! Esse é o seu painel de usúario, nele você pode alterar os seus dados e acompanhar os seus pedidos.
                                  </p>
                                </div>
                                <h5>Informações da Conta</h5>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                                      <h6>
                                        E-mail
                                        <a
                                          href="javasript:void(0)"
                                          data-link-action="editmodal"
                                          title="Edit Detail"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_modal"
                                          onClick={() => setId(customer._id)}
                                        >
                                          <Image
                                            src={require("../../assets/img/edit.svg")}
                                            className="svg_img pro_svg"
                                            alt="edit"
                                          />
                                        </a>
                                      </h6>
                                      <ul>
                                        <li>
                                          <strong>Email : </strong>
                                          {customer.email}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                                      <h6>
                                        CPF
                                        <a
                                          href="javasript:void(0)"
                                          data-link-action="editmodal"
                                          title="Edit Detail"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_modal"
                                          onClick={() => setId(customer._id)}
                                        >
                                          <Image
                                            src={require("../../assets/img/edit.svg")}
                                            className="svg_img pro_svg"
                                            alt="edit"
                                          />
                                        </a>
                                      </h6>
                                      <ul>
                                        <li>
                                          <strong>CPF : </strong>
                                          {customer.cpf_cnpj}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="ec-vendor-detail-block ec-vendor-block-contact space-bottom-30">
                                      <h6>
                                        Celular
                                        <a
                                          href="javasript:void(0)"
                                          data-link-action="editmodal"
                                          title="Edit Detail"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_modal"
                                          onClick={() => setId(customer._id)}
                                        >
                                          <Image
                                            src={require("../../assets/img/edit.svg")}
                                            className="svg_img pro_svg"
                                            alt="edit"
                                          />
                                        </a>
                                      </h6>
                                      <ul>
                                        <li>
                                          <strong>Telefone : </strong>
                                          {customer.phone}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="ec-vendor-detail-block ec-vendor-block-address mar-b-30">
                                      <h6>
                                        Endereço
                                        <a
                                          href="javasript:void(0)"
                                          data-link-action="editmodal"
                                          title="Edit Detail"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit_modal"
                                          onClick={() => setId(customer._id)}
                                        >
                                          <Image
                                            src={require("../../assets/img/edit.svg")}
                                            className="svg_img pro_svg"
                                            alt="edit"
                                          />
                                        </a>
                                      </h6>
                                      <ul>
                                        <li>
                                          {JSON.parse(customer.address_one)?.map((item, index) => {
                                            return(
                                              <>
                                              <strong>Rua : </strong>
                                              {item.street}, Nº: {item.number}, {item.complement}, {item.city}-{item.state}
                                              <br></br>
                                              <strong>CEP : </strong>
                                              {item.cep}
                                              </>
                                            )
                                          })}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      <Modal customers={allCustomers} id_={id_}/>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.customer_access_token !== process.env.CUSTOMER_TOKEN) {
    return {
      redirect: {
        destination: "/Register",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
