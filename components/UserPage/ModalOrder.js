import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import Image from 'next/image';

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ModalOrder({ orders, id_ }) {

  const [] = useState();
  const { data: customers } = useSwr(`/api/customers/getAllCustomers`, fetcher);

  const [valueStatus, setValueStatus] = useState("")
  const [valueId, setValueId] = useState("");
  const [data, setData] = useState();
  const [diaCompra, setDiaCompra] = useState();
  const [calculo, setCalculo] = useState(false);
  
  useEffect(() => {
    orders?.forEach(item => {
      if (item._id === id_) {
        setValueId(item._id);
        setValueStatus(item.status);
        setDiaCompra(item.date)
      }
    });
  }, [id_])

  const calcular = (e, total) => {
    e.preventDefault()
    let totalCompra = parseFloat(total);
    let args = {
      "notification_url": "https://webhook.site/510e10d2-bac9-42f8-a771-6a5a006a50da",
       "external_reference": "123456789",
       "items": [
         {
           "title": `Pedido Número ${id_}`,
           "quantity": 1,
           "currency_id": "BRL",
           "unit_price": totalCompra,
           "picture_url": "https://firebasestorage.googleapis.com/v0/b/bellasnatural-2a2e9.appspot.com/o/image%2F681613757?alt=media&token=07587cd2-05dd-4305-aba1-57a4ac39f250"
         }
       ]
     };

    axios.post('https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-6527355853850944-121910-4632788bdfac72ca9732ace4c7045aab-577672292', args).then(response => {
      setData(response.data);
      setCalculo(true);
      toast.success("Gerado com sucesso!");
    });
  }



  const customImgLoader = ({ src }) => {
    return `${src}`;
  };


  return (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "6px" }}>
          <div className="modal-body">
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
                <div className="ec-vendor-upload-detail">
                  {orders?.map((item, index) => {
                    let addressArr = JSON.parse(item.address);
                    let productsArr = JSON.parse(item.products);
                    const date = new Date(item.date);
                    if (item._id === id_) {
                      return (
                        <>
                          <form className="row g-3" key={item._id}>
                            {customers?.map((item2, index) => {
                              if (item.id_user === item2._id) {
                                return (
                                  <>
                                    <label className="form-label">
                                      <td>Data do pedido:{diaCompra}</td>
                                    </label>
                                    <div className="col-12 col-lg-6 space-t-15 mt-3">
                                      <label className="form-label">
                                        Nome
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={item2.name}
                                        disabled
                                      />
                                    </div>

                                    <div className="col-12 col-lg-6 space-t-15 mt-3">
                                      <label className="form-label">
                                        E-mail
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={item2.email}
                                        disabled
                                      />
                                    </div>

                                    <div className="col-md-6 space-t-15 mt-3">
                                      <label className="form-label">
                                      Telefone
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={item2.phone}
                                        disabled
                                      />
                                    </div>

                                    <div className="col-md-6 space-t-15 mt-3">
                                      <label className="form-label">
                                        CPF / CNPJ
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={item2.cpf_cnpj}
                                        disabled
                                      />
                                    </div>
                                  </>
                                )
                              }
                            })}

                            <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3 mob-column">
                              <div className="col-12 col-lg-2">
                                <label className="form-label  mt-3 mt-lg-0">
                                  Endereço
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.endereco}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-1">
                                <label className="form-label  mt-3 mt-lg-0">
                                  Nº
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.numero}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-2">
                                <label className="form-label  mt-3 mt-lg-0">
                                  Bairro
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.bairro}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-1">
                                <label className="form-label  mt-3 mt-lg-0">
                                  Complemento
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.complemento}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-2">
                                <label className="form-label  mt-3 mt-lg-0">
                                  CEP
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.cep}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-2">
                                <label className="form-label  mt-3 mt-lg-0">
                                  Cidade
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.cidade}
                                  disabled
                                />
                              </div>
                              <div className="col-12 col-lg-1">
                                <label className="form-label mt-3 mt-lg-0">
                                  Estado
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={addressArr.estado}
                                  disabled
                                />
                              </div>
                            </div>


                            <div className="col-12 mt-3" style={{overflowX: 'scroll'}}>
                              <table
                                id="responsive-data-table"
                                className="table"
                                style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Embalagem</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Total</th>
                                    <th>Produto</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    productsArr.produtos?.map((item4, index) => {
                                      return (
                                        <>
                                          <tr key={item4._id} className="align-middle">
                                            <td>{item4._id}</td>
                                            <td>{item4.titulo}</td>
                                            <td>{item4.embalagem}</td>
                                            <td><p>R${parseInt(item4.valor).toFixed(2)} </p></td>
                                            <td><p>{item4.quantidadeCompra}</p></td>
                                            <td><p>R${item4.total.toFixed(2)}</p></td>
                                            <td>
                                              <Image
                                                loader={customImgLoader}
                                                className="tbl-thumb"
                                                src={item4.imagem || require("../../assets/img/b2b/noimg.jpg")}
                                                alt="Product Image"
                                                width={500}
                                                height={500}
                                              />
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                                  <div className="d-flex mt-5 mb-5">
                                    <div className="font-weight-bold mr-5">FRETE: R${productsArr.frete}</div>
                                    <div className="font-weight-bold">TOTAL: R${productsArr.total}</div>
                                  </div>
                            </div>

                            <div className="col-md-12 space-t-15 mt-4 text-center d-flex justify-content-around">
                              {calculo ?
                              <a
                                href={data.init_point}
                                target='_blank'
                                rel="noreferrer"
                                className="btn btn-sm btn-mercado qty_close"
                                style={{ width: '250px', backgroundColor: '#00B1EA !important' }}
                              >
                                <div className="d-flex justify-content-center align-items-center">
                                <div className="mr-3 d-flex align-items-center" style={{color: '#fff'}}>
                                Realizar Pagamento
                                </div>
                                <div style={{width: '40px'}} className="d-flex align-items-center ">
                                <Image src={require("../../assets/img/mercado-pago.png")} alt="Site Logo" width={250} height={250} />
                                </div>
                                </div>
                              </a>
                              :
                              <button
                                onClick={(e) => calcular(e, productsArr.total)}
                                className="btn btn-sm btn-secondary qty_close"
                                style={{ width: '250px' }}
                              >
                                Gerar Pagamento
                              </button>
                              }
                              <button
                                onClick={(e) => {e.preventDefault(), setCalculo(false)}}
                                className="btn btn-sm btn-primary qty_close"
                                style={{ width: '250px' }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Fechar
                              </button>
                            </div>
                          </form>
                        </>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
