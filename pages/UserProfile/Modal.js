import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function Modal({ customers, id_ }) {
  const [] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(0)
  //addres 1
  const [addres1, setAddres1] = useState("")
  const [number1, setNumber1] = useState("")
  const [complement1, setComplement1] = useState("")
  const [bairro1, setBairro1] = useState("");
  const [cep1, setCep1] = useState("")
  const [city1, setCity1] = useState("")
  const [state1, setState1] = useState("")
  //addres 2
  const [addres2, setAddres2] = useState("")
  const [number2, setNumber2] = useState("")
  const [complement2, setComplement2] = useState("")
  const [bairro2, setBairro2] = useState("");
  const [cep2, setCep2] = useState("")
  const [city2, setCity2] = useState("")
  const [state2, setState2] = useState("")
  //addres 3
  const [addres3, setAddres3] = useState("")
  const [number3, setNumber3] = useState("")
  const [complement3, setComplement3] = useState("")
  const [bairro3, setBairro3] = useState("");
  const [cep3, setCep3] = useState("")
  const [city3, setCity3] = useState("")
  const [state3, setState3] = useState("")

  useEffect(() => {
    customers?.forEach(item => {
      if(item._id === id_){
        setName(item.name);
        setEmail(item.email);
        setPhone(item.phone);
        setCpf(item.cpf_cnpj);
        setPassword(item.password);
        setActive(item.active);
        JSON.parse(item.address_one)?.map(item2 => {
          setAddres1(item2.street)
          setNumber1(item2.number)
          setComplement1(item2.complement)
          setBairro1(item2.bairro)
          setCep1(item2.cep)
          setCity1(item2.city)
          setState1(item2.state)
        })
        JSON.parse(item.address_two)?.map(item3 => {
          setAddres2(item3.street)
          setNumber2(item3.number)
          setComplement2(item3.complement)
          setBairro2(item3.bairro)
          setCep2(item3.cep)
          setCity2(item3.city)
          setState2(item3.state)
        })
        JSON.parse(item.address_three)?.map(item4 => {
          setAddres3(item4.street)
          setNumber3(item4.number)
          setComplement3(item4.complement)
          setBairro3(item4.bairro)
          setCep3(item4.cep)
          setCity3(item4.city)
          setState3(item4.state)
        })
      }
    });
  }, [id_])

  async function updateUser(e) {
    e.preventDefault()
    await axios
      .put(`/api/customers/updateCustomers?id=${id_}`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        cpf: cpf,
        address_one: JSON.stringify([
          {
            street: addres1,
            number: number1,
            cep: cep1,
            bairro: bairro1,
            state: state1,
            city: city1,
            complement: complement1,
          },
        ]),
        address_two: JSON.stringify([
          {
            street: addres2,
            number: number2,
            cep: cep2,
            bairro: bairro2,
            state: state2,
            city: city2,
            complement: complement2,
          },
        ]),
        address_three: JSON.stringify([
          {
            street: addres3,
            number: number3,
            cep: cep3,
            bairro: bairro3,
            state: state3,
            city: city3,
            complement: complement3,
          },
        ]),
        active: 1,
      })
      .then(() => {
        toast.success("Usúario editado com sucesso");
        mutate('/api/customers/getAllCustomers');
        router.push("/UserProfile");
      })
      .catch(() => toast.error("OPS! Algo deu errado!"));
  }


  return (
    <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "6px" }}>
          <div className="modal-body">
            <div className="row">
              <div className="ec-vendor-block-img space-bottom-30">
                <div className="ec-vendor-upload-detail">
                  {customers?.map((item, index) => {
                    if (item._id === id_) {
                      return (
                        <form className="row g-3" key={item._id}>
                          <div className="col-12 col-md-6 space-t-15 mt-3">
                            <label htmlFor="first-name" className="form-label">
                              Nome
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              id="first-name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-md-6 space-t-15 mt-3">
                            <label htmlFor="last-name" className="form-label">
                              E-mail
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              id="last-name"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3 mob-column">
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Rua <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={addres1}
                                id="address-1"
                                onChange={(e) => setAddres1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Nº <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={number1}
                                id="address-1"
                                onChange={(e) => setNumber1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Bairro <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={bairro1}
                                id="address-1"
                                onChange={(e) => setBairro1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Complemento <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={complement1}
                                id="address-1"
                                onChange={(e) => setComplement1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                CEP <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={cep1}
                                id="address-1"
                                onChange={(e) => setCep1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Cidade <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={city1}
                                id="address-1"
                                onChange={(e) => setCity1(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Estado <p className="mob-block">* (Endereço 1)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={state1}
                                id="address-1"
                                onChange={(e) => setState1(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3 mob-column">
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Rua <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={addres2}
                                id="address-1"
                                onChange={(e) => setAddres2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Nº <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={number2}
                                id="address-1"
                                onChange={(e) => setNumber2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Bairro <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={bairro2}
                                id="address-1"
                                onChange={(e) => setBairro2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Complemento <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={complement2}
                                id="address-1"
                                onChange={(e) => setComplement2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                CEP <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={cep2}
                                id="address-1"
                                onChange={(e) => setCep2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Cidade <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={city2}
                                id="address-1"
                                onChange={(e) => setCity2(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Estado <p className="mob-block">* (Endereço 2)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={state2}
                                id="address-1"
                                onChange={(e) => setState2(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 space-t-15 d-flex justify-content-between mt-3 mob-column">
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Rua <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={addres3}
                                id="address-1"
                                onChange={(e) => setAddres3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Nº <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={number3}
                                id="address-1"
                                onChange={(e) => setNumber3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Bairro <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={bairro3}
                                id="address-1"
                                onChange={(e) => setBairro3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Complemento <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={complement3}
                                id="address-1"
                                onChange={(e) => setComplement3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                CEP <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={cep3}
                                id="address-1"
                                onChange={(e) => setCep3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-2 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Cidade <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={city3}
                                id="address-1"
                                onChange={(e) => setCity3(e.target.value)}
                              />
                            </div>
                            <div className="col-lg-1 col-12">
                              <label htmlFor="address-1" className="form-label d-flex mt-3 mt-lg-0">
                                Estado <p className="mob-block">* (Endereço 3)</p>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={state3}
                                id="address-1"
                                onChange={(e) => setState3(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-6 col-12 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              Telefone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={phone}
                              id="email"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 col-12 space-t-15 mt-3">
                            <label htmlFor="phone-1" className="form-label">
                              CPF
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={cpf}
                              id="phone-1"
                              onChange={(e) => setCpf(e.target.value)}
                            />
                          </div>
                        
                          <div className="col-md-12 space-t-15 mt-4 d-flex justify-content-around">
                            <button
                              onClick={(e) => updateUser(e)}
                              className="btn btn-sm btn-secondary qty_close"
                              style={{width: '250px'}}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Atualizar
                            </button>
                            <button
                              onClick={(e) => e.preventDefault()}
                              className="btn btn-sm btn-primary qty_close mt-3 mt-lg-0"
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
