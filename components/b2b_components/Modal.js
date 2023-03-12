import { useState } from "react";

export default function Modal({ customers, id_ }) {
  const [] = useState();
  return (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "6px" }}>
          <div className="modal-body">
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
                <div className="ec-vendor-upload-detail">
                  {customers?.map((item, index) => {
                    var string1 = JSON.parse(item.address_one);
                    var string2 = JSON.parse(item.address_two);
                    var string3 = JSON.parse(item.address_three);
                    if (item._id === id_) {
                      return (
                        <form className="row g-3" key={item.id}>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="first-name" className="form-label">
                              Nome
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.name}
                              id="first-name"
                            />
                          </div>
                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="last-name" className="form-label">
                              E-mail
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.email}
                              id="last-name"
                            />
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Endereço 1
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].street}
                                id="address-1"
                              />
                            </div>
                            <div className="col-1">
                              <label htmlFor="address-1" className="form-label">
                                Nº
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].number}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Bairro
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].district}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Complemento
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].complement}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                CEP
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].cep}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Cidade
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string1[0].city}
                                id="address-1"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Endereço 2
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].street}
                                id="address-1"
                              />
                            </div>
                            <div className="col-1">
                              <label htmlFor="address-1" className="form-label">
                                Nº
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].number}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Bairro
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].district}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Complemento
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].complement}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                CEP
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].cep}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Cidade
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string2[0].city}
                                id="address-1"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Endereço 3
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].street}
                                id="address-1"
                              />
                            </div>
                            <div className="col-1">
                              <label htmlFor="address-1" className="form-label">
                                Nº
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].number}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Bairro
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].district}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Complemento
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].complement}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                CEP
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].cep}
                                id="address-1"
                              />
                            </div>
                            <div className="col-2">
                              <label htmlFor="address-1" className="form-label">
                                Cidade
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={string3[0].city}
                                id="address-1"
                              />
                            </div>
                          </div>


                          <div className="col-md-6 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-md-2">
                            <label htmlFor="email" className="form-label">
                              DDD
                            </label>
                            <input type="text" value={item.ddd} className="form-control" id="email" />
                            </div>
                            <div className="col-md-9">
                            <label htmlFor="email" className="form-label">
                              Telefone 1
                            </label>
                            <input type="text" value={item.phone} className="form-control" id="email" />
                            </div>
                          </div>

                          <div className="col-md-6 space-t-15 d-flex justify-content-between mt-3">
                            <div className="col-md-2">
                            <label htmlFor="email" className="form-label">
                              DDD
                            </label>
                            <input type="text" value={item.ddd_2} className="form-control" id="email" />
                            </div>
                            <div className="col-md-9">
                            <label htmlFor="email" className="form-label">
                              Telefone 2
                            </label>
                            <input type="text" value={item.phone_2} className="form-control" id="email" />
                            </div>
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              CPF
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.cpf_cnpj}
                              id="phone-1"
                            />
                          </div>

                          <div className="col-md-6 space-t-15 mt-3">
                            <label htmlFor="phone-2" className="form-label">
                              Nascimento
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.birthday}
                              id="phone-2"
                            />
                          </div>
                          <div className="col-md-12 space-t-15 mt-4 d-flex justify-content-center text-center">
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="btn btn-sm btn-primary qty_close"
                              style={{width: '250px'}}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Fechar
                            </button>
                          </div>
                        </form>
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
