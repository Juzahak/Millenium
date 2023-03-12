// import SelectCity from "./SelectCity";
// import SelectState from "./SelectState";
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { useCookies } from 'react-cookie';
import router from 'next/router';
import { CheckoutArr } from "../../Context";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

export default function Summary({ valorTotal, cartProd, volumeGeral, peso, aceito, setAceito }) {
  const [correiosArr, setCorreiosArr] = useState()
  const [cep, setCep] = useState([])
  const [pedidoArr, setPedidoArr] = useState([])
  const [cookies, setCookie] = useCookies(['name']);
  const [metodo, setMetodo] = useState("04014");

  const { array, setArray } = useContext(CheckoutArr);

  const calcularFrete = async (e, req, res) => {
    e.preventDefault();
    
    let arrayCorreio = {};
    let args = {
      nCdServico: [`${metodo}`],
      sCepOrigem: '13930000',
      sCepDestino: `${cep}`,
      nVlPeso: peso,
      nCdFormato: 1,
      nVlComprimento: Math.pow(volumeGeral, 1 / 3),
      nVlAltura: Math.pow(volumeGeral, 1 / 3),
      nVlLargura: Math.pow(volumeGeral, 1 / 3),
      nVlDiametro: 0
    };
    axios.post('https://geosites.com.br/frete', args).then(response => {
      setCorreiosArr(response.data)
      arrayCorreio = response.data;
      let Total = (parseFloat(arrayCorreio[0].Valor.replace(",", ".")) + valorTotal).toFixed(2);
      let SubTotal = (valorTotal).toFixed(2);
      
      setPedidoArr(
        {
          id: cookies.customer_id,
          cep: cep,
          produtos: cartProd,
          frete: arrayCorreio[0].Valor,
          entrega: arrayCorreio[0].PrazoEntrega,
          subtotal: SubTotal,
          total: Total,
        })

        if(arrayCorreio[0].Valor === '0,00'){
          setAceito(false);
          return toast.error("Não foi possível gerar seu frete, verifique o CEP, caso a quantidade seja muito grande o peso pode exceder, sendo necessário contato com o vendedor");
        }else{
          setAceito(true);
        }
    });


  }

  const finalizar = (e) => {
    e.preventDefault();

    setArray(pedidoArr);

    router.push({
      pathname: "/Checkout"
    })
  }

  return (
    <>
      <div className="ec-cart-rightside col-lg-4 col-md-12">
        <div className="ec-sidebar-wrap">
          <div className="ec-sidebar-block">
            <div className="ec-sb-block-content">
              {/* <h4 className="ec-ship-title">Calcular Frete</h4> */}
              <div className="ec-cart-form">
                <p style={{ fontSize: '17px' }}>Use os campos abaixo para calcular o frete</p>
                <form action="#" method="post">
                  {/* <SelectCity />
                <SelectState /> */}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Selecionar método de envio</label>
                    <select
                      name="select"
                      id="Categories"
                      className="form-select"
                      defaultValue={"04014"}
                      onChange={(e) => setMetodo(e.target.value)}
                    >
                      <option selected value={"04014"}>
                        SEDEX
                      </option>
                      <option value={"04510"}>
                        PAC
                      </option>

                    </select>
                  </div>

                  <span className="ec-cart-wrap">
                    <label htmlFor="cep">CEP</label>
                    <InputMask
                        mask="99999-999"
                        name="postalcode"
                        id="CEP"
                        placeholder="CEP"
                        onChange={(e) => setCep(e.target.value)}
                      />
                  </span>

                  <button className="btn btn-primary mb-4 w-100" onClick={(e) => calcularFrete(e)}>
                    Calcular Frete
                  </button>

                </form>
              </div>
            </div>

            <div className="ec-sb-block-content">
              <div className="ec-cart-summary-bottom">
                <div className="ec-cart-summary">
                  <div>
                    <span className="text-left">Sub-Total</span>
                    <span className="text-right">R$ {valorTotal},00</span>
                  </div>
                  <div>
                    <span className="text-left">Frete</span>
                    <span className="text-right">R$ {correiosArr ?
                      <>{correiosArr[0].Valor}</>
                      :
                      <>00,00</>
                    }</span>
                  </div>
                  {/* <div>
                  <span className="text-left">Coupan Discount</span>
                  <span className="text-right">
                    <a className="ec-cart-coupan">Apply Coupan</a>
                  </span>
                </div> */}
                  <div className="ec-cart-coupan-content">
                    <form
                      className="ec-cart-coupan-form"
                      name="ec-cart-coupan-form"
                      method="post"
                      action="#"
                    >
                      <input
                        className="ec-coupan"
                        type="text"
                        required
                        placeholder="Enter Your Coupan Code"
                        name="ec-coupan"
                        value=""
                      />
                      <button
                        className="ec-coupan-btn button btn-primary"
                        type="submit"
                        name="subscribe"
                        value=""
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                  <div className="ec-cart-summary-total">
                    <span className="text-left">Total do Pedido</span>
                    <span className="text-right">R$ {correiosArr ?
                      <>{(parseFloat(correiosArr[0].Valor.replace(",", ".")) + valorTotal).toFixed(2)}</>
                      :
                      <>{valorTotal},00</>
                    }</span>
                  </div>
                  <div className='mt-4 w-100'>
                    {aceito ?
                    <button onClick={(e) => finalizar(e)} className="btn btn-primary w-100">
                      Finalizar
                    </button>
                    :
                    <button disabled className="btn btn-primary w-100">
                      Finalizar
                    </button>
                    }
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
