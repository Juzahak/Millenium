import Image from "next/image";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Summary from "./Summary";
import Link from 'next/link';
import { useEffect, useState, useContext } from "react";
import { mutate } from "swr";
import { BsTrash } from "react-icons/bs";
import { CheckoutArr } from "../../Context";
import { toast } from "react-toastify";
export default function ShoppingCart() {
  const [quantityInput2, setQuantity] = useState(1);
  const [volumeGeral, setVolumeGeral] = useState(0);
  const [peso, setPeso] = useState(0);
  const [aceito, setAceito] = useState(false);
  const { cartProd, setCartProd } = useContext(CheckoutArr);

  let valorTotal = 0;

  useEffect(() => {
    // Perform localStorage action
    let volumeGeral = 0;
    let peso = 0;

    let localArr = JSON.parse(localStorage.getItem('produtos'));

    setCartProd(localArr);

    localArr?.forEach((item, index) => {

      let tamanho = localArr.length;

      if (index === tamanho - 1) {
        let soma = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
        volumeGeral = volumeGeral + soma * item.quantidadeCompra;
        peso = peso + parseFloat(item.peso) * item.quantidadeCompra;
        setVolumeGeral(volumeGeral);
        setPeso(peso)
      } else {
        let soma = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
        volumeGeral = volumeGeral + soma * item.quantidadeCompra;
        peso = peso + parseFloat(item.peso);
      }
    })

  }, [])

  function updateShoppingCart(){
     // Perform localStorage action
     let volumeGeral = 0;
     let peso = 0;
 
     let localArr = JSON.parse(localStorage.getItem('produtos'));
 
     setCartProd(localArr);
 
     localArr?.forEach((item, index) => {
 
       let tamanho = localArr.length;
 
       if (index === tamanho - 1) {
         let soma = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
         volumeGeral = volumeGeral + soma * item.quantidadeCompra;
         peso = peso + parseFloat(item.peso) * item.quantidadeCompra;
         setVolumeGeral(volumeGeral);
         setPeso(peso)
       } else {
         let soma = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
         volumeGeral = volumeGeral + soma * item.quantidadeCompra;
         peso = peso + parseFloat(item.peso);
       }
     })
  }

  function removeProducts(id) {

    let product = cartProd.filter(function (obj) {

      
      return obj.fakeId != id;
      
    });
    
    localStorage.setItem("produtos", JSON.stringify(product));
    setCartProd(product);
    updateShoppingCart();
  }
  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-cart-leftside col-lg-8 col-md-12 ">
              <div className="ec-cart-content">
                <div className="ec-cart-inner">
                  <div className="row">
                    <form action="#">
                      <div className="table-content cart-table-content" style={{overflowX: 'scroll'}}>
                        <table>
                          <thead>
                            <tr>
                              <th>Imagem</th>
                              <th>Name</th>
                              <th>Preço</th>
                              <th style={{ textAlign: "center" }}>Quantidade</th>
                              <th>Total</th>
                              <th>Retirar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartProd?.map((item, index) => {
                              let quantityInput = item.quantidadeCompra;
                              valorTotal = valorTotal + item.valor * quantityInput;
                              const inputQtd = (e, id, quantidade) => {
                                cartProd.forEach(item => {
                                  setAceito(false);
                                 
                                  if (item.sizeId === id) {
                                    if (quantidade >= item.estoque && e === 'mais'){
                                      toast.error('Quantidade maior do que disponivel!', {
                                          position: "top-right",
                                        });
                                  }
                                    if (e === 'mais' && quantidade < item.estoque) {
                                      let volumeProduto = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
                                      item.quantidadeCompra = quantidade + 1;
                                      item.total = item.quantidadeCompra * item.valor;
                                      quantityInput = quantidade + 1;
                                      setQuantity(quantityInput);
                                      setCartProd(cartProd);
                                      setVolumeGeral(volumeGeral + volumeProduto);
                                      setPeso(peso + parseFloat(item.peso))
                                      return 
                                    }
                                    if (quantidade < 1) {
                                      let volumeProduto = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
                                      item.quantidadeCompra = 0;
                                      quantityInput = item.quantidadeCompra;
                                      setQuantity(quantityInput);
                                      setCartProd(cartProd);
                                      setVolumeGeral(volumeGeral);
                                      setPeso(peso);
                                      return 
                                    }
                                    if (e === 'menos' && quantidade >= 2) {
                                      let volumeProduto = parseInt(item.comprimento) * parseInt(item.largura) * parseInt(item.altura);
                                      item.quantidadeCompra = quantidade - 1;
                                      item.total = item.quantidadeCompra * item.valor;
                                      quantityInput = quantidade - 1;
                                      setQuantity(quantityInput);
                                      setCartProd(cartProd);
                                      setPeso(peso - parseFloat(item.peso))
                                      setVolumeGeral(volumeGeral - volumeProduto);
                                      return 
                                    }
                                   
                                  }
                                })
                              }
                              return (
                                <tr key={index}>
                                  <td
                                    data-label="Product"
                                    className="ec-cart-pro-name"
                                  >
                                    <Image key={index} src={item.imagem} width={150} height={150} />
                                  </td>
                                  <td
                                    data-label="Product"
                                    className="ec-cart-pro-name"
                                  >
                                    <a href="product-left-sidebar.html">
                                      {item.titulo}
                                    </a>

                                  </td>
                                  <td
                                    data-label="Price"
                                    className="ec-cart-pro-price"
                                  >
                                    <span className="amount">R$ {item.valor}.00</span>
                                  </td>
                                  <td
                                    data-label="Quantity"
                                    style={{ textAlign: "center" }}
                                  >
                                    <div className="qty-plus-minus">
                                      <div className="dec ec_qtybtn" onClick={() => inputQtd('menos', item.sizeId, item.quantidadeCompra)}>-</div>
                                      <div className="qty-input">{quantityInput}</div>
                                      <div className="inc ec_qtybtn" onClick={() => inputQtd('mais', item.sizeId, item.quantidadeCompra)}>+</div>
                                    </div>
                                  </td>
                                  <td
                                    data-label="Total"
                                    className="ec-cart-pro-subtotal"
                                  >
                                    R$ {item.valor * quantityInput}.00
                                  </td>
                                  <td
                                    data-label="Remove"
                                    className="ec-cart-pro-remove"
                                    style={{ textAlign: "center" }}
                                  >
                                    <a onClick={() => removeProducts(item.fakeId)}>
                                      <BsTrash />
                                    </a>
                                  </td>
                                </tr>
                              )})}

                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="ec-cart-update-bottom">
                            <Link href="/AllProducts?id=Todos+os+Produtos">Continuar Comprando</Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <Summary valorTotal={valorTotal} cartProd={cartProd} volumeGeral={volumeGeral} peso={peso} aceito={aceito} setAceito={setAceito}/>
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