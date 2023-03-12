import axios from "axios";
import router from "next/router";

import { useState } from "react";

import InputMask from "react-input-mask";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { toast } from "react-toastify";

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Register() {
  const { data: allCustomers } = useSwr(`/api/customers/getAllCustomers`, fetcher);

  const [cepAutoCompleteData, setCepAutocompleteData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bairro, setBairro] = useState("");
  const [cpf, setCpf] = useState("");
  const [address_one, setAddress_one] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  async function completeCityAndRegion(CEP) {
    await axios
      .get(`https://cdn.apicep.com/file/apicep/${CEP}.json`)
      .then(({ data }) => setCepAutocompleteData(data))
      .catch((err) => {
        if (err) return toast.error("Esse CEP não existe!");
      });
  }

  function checkAccountExistence(e) {
    e.preventDefault();
    let contaExistente = 0;

    allCustomers.map((customer, index) => {
      
    if (email === customer.email) {
        contaExistente++;
        return;
      }
    });
    if(contaExistente > 0){
      toast.info("Email já cadastrado!");
    }else{
      registerNewUser();
    }
  }

  async function registerNewUser() {
    let contador = 0;
    if (contador === 0) {
      contador++;
      await axios.put("/api/customers/insertCustomers", {
          name: name,
          email: email,
          password: password,
          phone: phone,
          cpf_cnpj: cpf,
          address_one: JSON.stringify([
            {
              street: address_one,
              number: number,
              cep: cep,
              bairro: bairro,
              state: cepAutoCompleteData?.state,
              city: cepAutoCompleteData?.city,
              complement: complement
            }
          ]),
          address_two: JSON.stringify([
            {
              street: "*",
              number: "*",
              cep: "*",
              bairro: "*",
              state: "*",
              city: "*",
              complement: "*"
            }
          ]),
          address_three: JSON.stringify([
            {
              street: "*",
              number: "*",
              cep: "*",
              bairro: "*",
              state: "*",
              city: "*",
              complement: "*"
            }
          ]),
          active: 1,
        })
        .then(() => {
          toast.success("Conta criada com sucesso!");

          router.push("/Login");
        })
        .catch(() => toast.error("OPS! Algo deu errado!"));
    }
  }

  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-bg-title">Criar conta</h2>
                <p className="sub-title mb-3">
                  Preencha o formulário abaixo
                </p>
              </div>
            </div>

            <div className="ec-register-wrapper">
              <div className="ec-register-container">
                <div className="ec-register-form">
                  <form onSubmit={(e) => checkAccountExistence(e)}>
                    <span className="col-12 col-lg-6 pr-lg-2">
                      <label htmlFor="name">Nome *</label>
                      <input
                        type="text"
                        name="firstname"
                        id="name"
                        placeholder="Nome completo"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-6">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Digite seu email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-6 pr-lg-2">
                      <label htmlFor="password">Senha *</label>
                      <input
                        type="password"
                        name="firstname"
                        id="password"
                        placeholder="Criar senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-6">
                      <label htmlFor="phone_number">Celular *</label>

                      <InputMask
                        mask="(99) 99999-9999"
                        type="text"
                        name="phonenumber"
                        id="phone_number"
                        placeholder="Digite seu celular com DDD"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-9 pr-lg-2">
                      <label htmlFor="phone_number">Endereço *</label>

                      <input
                        type="text"
                        name="address"
                        id="address_one"
                        placeholder="Endereço"
                        onChange={(e) => setAddress_one(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-3">
                      <label htmlFor="number">Número *</label>

                      <input
                        type="text"
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Número"
                        id="number"
                        name="number"
                      />
                    </span>
                    <span className="col-12 col-lg-6 pr-lg-2">
                      <label htmlFor="address_one">Bairro *</label>
                      <input
                        type="text"
                        name="address"
                        id="address_one"
                        placeholder="Bairro"
                        onChange={(e) => setBairro(e.target.value)}
                      />
                    </span>
                    <span className="col-12 col-lg-6">
                      <label htmlFor="complement">Complemento *</label>

                      <input
                        type="text"
                        onChange={(e) => setComplement(e.target.value)}
                        placeholder="Complemento"
                        id="complement"
                        name="complement"
                      />
                    </span>

                    <span className="col-12 col-lg-6 pr-lg-2">
                      <label htmlFor="CPF">CPF *</label>

                      <InputMask
                        mask="999.999.999-99"
                        name="cpf"
                        id="CPF"
                        placeholder="CPF"
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </span>

                    <span className="col-12 col-lg-6">
                      <label htmlFor="CEP">CEP *</label>

                      <InputMask
                        mask="99999-999"
                        name="postalcode"
                        id="CEP"
                        placeholder="CEP"
                        onChange={(e) => setCep(e.target.value)}
                        onBlur={(e) => completeCityAndRegion(e.target.value)}
                      />
                    </span>

                    <span className="col-12 col-lg-6 pr-lg-2">
                      <label>Estado *</label>
                      <input
                        type="text"
                        name="postalcode"
                        disabled
                        placeholder="Estado"
                        value={
                          cepAutoCompleteData !== ""
                            ? cepAutoCompleteData?.state
                            : ""
                        }
                      />
                    </span>

                    <span className="col-12 col-lg-6">
                      <label>Cidade *</label>
                      <input
                        type="text"
                        name="postalcode"
                        disabled
                        placeholder="Cidade"
                        value={
                          cepAutoCompleteData !== ""
                            ? cepAutoCompleteData?.city
                            : ""
                        }
                      />
                    </span>

                    <span className="ec-register-wrap ec-register-btn">
                      <button className="btn btn-primary" type="submit">
                        Register
                      </button>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
