import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import router from 'next/router';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useSwr, { mutate } from "swr";
import { CheckoutArr } from "../../Context";
import InputMask from "react-input-mask";
import axios from 'axios';
import { toast } from "react-toastify";

const fetcher = (url) => fetch(url).then((res) => res.json());
import { useCookies } from 'react-cookie';
import { isSetAccessorDeclaration } from "typescript";

export default function Checkout() {
  const { array } = useContext(CheckoutArr);
  const { data: customers } = useSwr(`/api/customers/getAllCustomers`, fetcher);
  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);
  let produtos = products || [];

  const [cepAutoCompleteData, setCepAutocompleteData] = useState(null);
  const [id_, setId_] = useState(0)
  const [aceito, setAceito] = useState(false)
  const [cookies, setCookie] = useCookies(['name']);
  const [nowCustomer, setNowCustomer] = useState([]);
  const [arrTeste, setArrTEste] = useState([]);
  const [cep1, setCep1] = useState('');
  const [cep2, setCep2] = useState('');
  const [cep3, setCep3] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState({});
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [AddInput, setAddInput] = useState([]);

  async function completeCityAndRegion(CEP) {
    await axios
      .get(`https://cdn.apicep.com/file/apicep/${CEP}.json`)
      .then(({ data }) => {
        setCepAutocompleteData(data);
        setCep(data.code);
        setCidade(data.city);
        setEstado(data.state);
      }
      )
      .catch((err) => {
        if (err) return toast.error("Esse CEP não existe!");
      });
  }


  useEffect(() => {
    if (array.id === undefined) {
      router.push('/ShoppingCart')
    } else {
      customers?.forEach(item => {
        if (cookies.customer_id === item._id) {
          setId_(item._id);
          setNowCustomer(item);
          setNome(item.name);
          JSON.parse(item.address_one).forEach(item2 => {
            setCep1(item2.cep)
          })
          JSON.parse(item.address_two).forEach(item2 => {
            setCep2(item2.cep)
          })
          JSON.parse(item.address_three).forEach(item2 => {
            setCep3(item2.cep)
          })
          completeCityAndRegion(array.cep)
        }
      });
    }
  }, [])

  const existAddress = (item) => {
    setEndereco(item.street)
    setNumero(item.number)
    setBairro(item.bairro)
    setComplemento(item.complement)
    setCep(item.cep)
    setCidade(item.city)
    setEstado(item.state)
  }

  console.log(array)

  const onSubmit = async (e) => {
    e.preventDefault();
    let now = new Date
    let priceId = 0;

    let addres = {
      endereco: endereco,
      numero: numero,
      bairro: bairro,
      complemento: complemento,
      cep: cep,
      cidade: cidade,
      estado: estado,
    }

    produtos?.map(item => {
      array.produtos?.map(item2 => {
        if (item._id === item2.id) {
          let newPrice = [];
          JSON.parse(item.price)?.map((item3, index) => {
            if (item2.sizeId === item3._id) {
              item3.quantity = parseInt(item3.quantity) - item2.quantidadeCompra;
              item3.quantity = `${item3.quantity}`;
              newPrice.push(item3)
            } else {
              newPrice.push(item3)
            }
            let tamanhoLista = JSON.parse(item.price);
            if (tamanhoLista.length === index + 1) {
              priceId = item._id;

              let data2 = axios.put(`/api/products_limit/updatePLimit?id=${priceId}`, {
                price: JSON.stringify(newPrice)
              });

            }
          })
        }
      })
    })

    toast('Pedido enviado com sucesso! acompanhe seus pedidos em seu perfil de usúario.', {
      position: "top-right",
    });

    let data = await axios.post(`/api/orderHistory/insertOrderHistory`, {
      id_user: id_,
      date: `${now.getDate()}/` + `${now.getMonth()}/` + `${now.getFullYear()}`,
      products: JSON.stringify(array),
      address: JSON.stringify(addres),
      status: "Pendente",
    });
    mutate(`/api/orderHistory/getAllOrderHistory`);


    localStorage.clear();

    if (data.data) router.push("/UserHistory");
  };




  return (
    <>
      <Header />
      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <h3 className="ec-checkout-title mb-4">Detalhes da compra</h3>
            {customers?.map((item, index) => {
              return (
                <>
                  {cookies.customer_id === item._id && (
                    <>
                      <div key={index} className="ec-checkout-leftside col-lg-8 col-md-12 ">
                        <>
                          {JSON.parse(item.address_one)?.map((item2, index) => {
                            if (item2.cep === array.cep) {
                              return (
                                <div key={index} className="ec-checkout-content">
                                  <div className="ec-checkout-inner">
                                    <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                                      <div className="ec-checkout-block ec-check-bill">
                                        <div className="ec-bl-block-content">
                                          <div className="ec-check-bill-form">
                                            <div className="col-12 p-5" style={{ border: "1px solid #f1f1f1", borderRadius: "10px" }}>
                                              <div className="d-flex">
                                                <div className="mr-5">
                                                  <input type='radio' value='1' name="address" style={{ width: '20px', height: '20px' }}
                                                    onChange={(e) => existAddress(item2)}
                                                  />
                                                </div>
                                                <div>
                                                  <h4 className="" style={{ color: "inherit" }}>{item2.street}, {item2.number}, {item2.bairro}, {item2.complement}, {item2.cep}</h4>
                                                  <span className="pt-3 d-block">{item2.city}-{item2.state}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              )
                            }
                          })}
                        </>
                        <>
                          {JSON.parse(item.address_two)?.map((item3, index) => {
                            if (item3.cep === array.cep) {
                              return (
                                <div key={index} className="ec-checkout-content">
                                  <div className="ec-checkout-inner">
                                    <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                                      <div className="ec-checkout-block ec-check-bill">
                                        <div className="ec-bl-block-content">
                                          <div className="ec-check-bill-form">
                                            <div className="col-12 p-5" style={{ border: "1px solid #f1f1f1", borderRadius: "10px" }}>
                                              <div className="d-flex">
                                                <div className="mr-5">
                                                  <input type='radio' value='2' name="address" style={{ width: '20px', height: '20px' }}
                                                    onChange={(e) => existAddress(item3)} />
                                                </div>
                                                <div>
                                                  <h4 className="" style={{ color: "inherit" }}>{item3.street}, {item3.number}, {item3.bairro}, {item3.complement}, {item3.cep}</h4>
                                                  <span className="pt-3 d-block">{item3.city}-{item3.state}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              )
                            }
                          })}
                        </><>
                          {JSON.parse(item.address_three)?.map((item4, index) => {
                            if (item4.cep === array.cep) {
                              return (
                                <div key={index} className="ec-checkout-content">
                                  <div className="ec-checkout-inner">
                                    <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                                      <div className="ec-checkout-block ec-check-bill">
                                        <div className="ec-bl-block-content">
                                          <div className="ec-check-bill-form">
                                            <div className="col-12 p-5" style={{ border: "1px solid #f1f1f1", borderRadius: "10px" }}>
                                              <div className="d-flex">
                                                <div className="mr-5">
                                                  <input type='radio' name="address" value='3' style={{ width: '20px', height: '20px' }}
                                                    onChange={(e) => existAddress(item4)} />
                                                </div>
                                                <div>
                                                  <h4 className="" style={{ color: "inherit" }}>{item4.street}, {item4.number}, {item4.bairro}, {item4.complement}, {item4.cep}</h4>
                                                  <span className="pt-3 d-block">{item4.city}-{item4.state}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              )
                            }
                          })}
                        </>
                      </div>
                    </>
                  )}
                </>
              )
            })}


            {array.cep === cep1 || array.cep === cep2 || array.cep === cep3 ?
              (
                <></>
              ) : (
                <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
                  <div className="ec-checkout-content">
                    <div className="ec-checkout-inner">
                      <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                        <div className="ec-checkout-block ec-check-bill">
                          <div className="ec-bl-block-content">
                            <div className="ec-check-bill-form container">
                              <form>
                                <span className="col-12">
                                  <label>Nome Completo *</label>
                                  <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Nome Completo"
                                    required
                                    onChange={(e) => setNome(e.target.value)}
                                  />
                                </span>
                                <span className="col-lg-6 col-12 pr-lg-1">
                                  <label>Endereço *</label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Endereço"
                                    onChange={(e) => setEndereco(e.target.value)}
                                  />
                                </span>
                                <span className="col-lg-2 col-12 pr-lg-1">
                                  <label>N° *</label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Endereço"
                                    onChange={(e) => setNumero(e.target.value)}
                                  />
                                </span>
                                <span className="col-lg-4 col-12">
                                  <label>Bairro *</label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Endereço"
                                    onChange={(e) => setBairro(e.target.value)}
                                  />
                                </span>

                                <span className="col-lg-6 col-12 pr-lg-1">
                                  <label>CEP *</label>
                                  <InputMask
                                    mask="99999-999"
                                    name="postalcode"
                                    placeholder="CEP"
                                    disable="true"
                                    value={cep}
                                  />
                                </span>
                                <span className="col-lg-6 col-12">
                                  <label>Complemento *</label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="Complemento"
                                    onChange={(e) => setComplemento(e.target.value)}
                                  />
                                </span>
                                <span className="col-lg-6 col-12 pr-lg-1">
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
                                <span className="col-lg-6 col-12">
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
              )}

            <div className="ec-checkout-rightside col-lg-4 col-md-12">
              <div className="ec-sidebar-wrap">
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Descrição</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-checkout-summary">
                      <div>
                        <span className="text-left">Sub-Total</span>
                        <span className="text-right">R${array.subtotal}</span>
                      </div>
                      <div>
                        <span className="text-left">Frete</span>
                        <span className="text-right">R${array.frete}</span>
                      </div>
                      <div>
                        <div className="ec-pay-desc" style={{ textAlign: 'justify', fontWeight: '500' }}>
                          Seu Frete foi calculado com prazo de entrega de <br></br>
                          {array.entrega} após a postagem do produto nos correios
                        </div>
                      </div>
                      <div className="ec-checkout-summary-total">
                        <span className="text-left">Valor Total</span>
                        <span className="text-right">R${array.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="ec-sidebar-wrap ec-checkout-pay-wrap pt-5">
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Conclusão de pedido</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-checkout-pay">
                      <div className="ec-pay-desc" style={{ textAlign: 'justify', fontWeight: '500' }}>
                        Após concluir o seu pedido, você será redirecionado para a página de pagamento, nosso sistema de pagamento é feito pelo PagSeguro.<br></br>
                        Garantindo total segurança com seus dados e com o método de pagamento escolhido, após o recebimento do pagamento iniciaremos o processo de envio do produto.
                      </div>
                      <form onSubmit={onSubmit}>
                        <span className="ec-pay-agree mb-3">
                          <input type="checkbox" style={{ opacity: '100' }} onClick={(e) => setAceito(true)} />
                          <a href="#">
                            Li e aceito os <span>Termos de Condições</span>
                          </a>
                          <span className="checked"></span>
                        </span>
                        <span className="ec-check-order-btn d-flex">
                          {aceito ?
                            <button name="submit" type="submit" className="btn btn-primary w-100">
                              Finalizar Pedido
                            </button>
                            :
                            <button disabled className="btn btn-primary w-100">
                              Aceitar termos
                            </button>

                          }

                        </span>
                      </form>
                    </div>
                  </div>
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

export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";

  if (myCookie.customer_access_token !== process.env.CUSTOMER_TOKEN) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};