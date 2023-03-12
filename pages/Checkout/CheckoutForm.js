import axios from "axios";
import { useState } from "react";

import InputMask from "react-input-mask";

import { toast } from "react-toastify";

export default function CheckoutForm({ setCheckoutFormType }) {
  const [cepAutoCompleteData, setCepAutocompleteData] = useState(null);

  async function completeCityAndRegion(CEP) {
    await axios
      .get(`https://cdn.apicep.com/file/apicep/${CEP}.json`)
      .then(({ data }) => setCepAutocompleteData(data))
      .catch((err) => {
        if (err) return toast.error("Esse CEP não existe!");
      });
  }

  // apagar depois
  let dataStructure = {
    street: "Avenida Santos Pinto",
    number: "91",
    state: "São Paulo",
    city: "Serra Negra",
  };

  async function saveAddress(e) {
    e.preventDefault();

    await axios
      .post(`/api/checkoutForm`, {
        name: "Vitao",
        email: "email@email.com",
        login: "teste",
        password: "123456789",
        phone: "123456789456",
        address_one: JSON.stringify(dataStructure),
        address_two: "",
        address_three: "",
        address_four: "",
        active: 1,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
      <div className="ec-checkout-content">
        <div className="ec-checkout-inner">
          <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
            <div className="ec-checkout-block ec-check-bill">
              <div className="ec-bl-block-content">
                <div className="ec-check-bill-form">
                  <form>
                    <span className="ec-bill-wrap ec-bill-half">
                      <label>Nome *</label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Nome"
                        required
                      />
                    </span>
                    <span className="ec-bill-wrap ec-bill-half">
                      <label>Sobrenome *</label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Sobrenome"
                        required
                      />
                    </span>
                    <span className="col-lg-6" style={{padding: '0 15px'}}>
                      <label>Endereço *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                      />
                    </span>
                    <span className="col-lg-2" style={{padding: '0 15px'}}>
                      <label>N° *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                      />
                    </span>
                    <span className="col-lg-4" style={{padding: '0 15px'}}>
                      <label>Bairro *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                      />
                    </span>

                    <span className="ec-bill-wrap ec-bill">
                      <label>CEP *</label>

                      <InputMask
                        mask="99999-999"
                        name="postalcode"
                        placeholder="CEP"
                        onBlur={(e) => completeCityAndRegion(e.target.value)}
                      />
                    </span>
                    <span className="ec-bill-wrap ec-bill-half">
                      <label>Estado *</label>
                      <input
                        type="text"
                        name="estado"
                        placeholder="Estado"
                        required
                        disabled
                        value={
                          cepAutoCompleteData !== ""
                            ? cepAutoCompleteData?.state
                            : ""
                        }
                      />
                    </span>

                    <span className="ec-bill-wrap ec-bill-half">
                      <label>Cidade *</label>
                      <input
                        type="text"
                        name="cidade"
                        placeholder="Cidade"
                        required
                        disabled
                        value={
                          cepAutoCompleteData !== ""
                            ? cepAutoCompleteData?.city
                            : ""
                        }
                      />
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
