import { FaUserAlt, FaShoppingCart, FaSearch, FaAngleDown, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, useContext } from 'react';
import { CheckoutArr } from "../Context";
import { useCookies } from 'react-cookie';
import useSwr, { mutate } from "swr";
import router from 'next/router';
const fetcher = (url) => fetch(url).then((res) => res.json());
import { toast } from "react-toastify";
import axios from 'axios';
import Whatsapp from './Whatsapp';

function Header() {
  const { data: mainCategories } = useSwr(`/api/category/getAllCategory`, fetcher);
  const { data: subCategories } = useSwr(`/api/subcategory/getAllSubCategory`, fetcher);
  const [cartSubTotal, setSubTotal] = useState(0)
  const [cookies, setCookie] = useCookies(['name']);
  const [searchText, setSearchText] = useState("");
  const [session, setSession] = useState(false);
  const { buscaArr, setBuscaArr, cartProd, setCartProd, searchData, setSearchData } = useContext(CheckoutArr);

  let now = new Date;
  let data = `${now.getDate()}/` + `${now.getMonth()}/` + `${now.getFullYear()}`;
  let subTotal = 0;
  let Total = 0;
  var tamanho = cartProd?.length || 0;

  const { data: sizes } = useSwr(`api/product_sizes/getAllSizes`, fetcher);

  useEffect(() => {
    // Perform localStorage action
    setCartProd(JSON.parse(localStorage.getItem('produtos')));
    if (cookies.customer_access_token === process.env.NEXT_PUBLIC_GAID) {
      setSession(true)
    }
  }, [])

  const cartContainer = useRef();
  const menuContainer = useRef();

  const togglemenu = () => {
    menuContainer.current.classList.add("ec-open")
  }

  const closemenu = () => {
    menuContainer.current.classList.remove("ec-open")
  }

  const toggleCart = () => {
    cartContainer.current.classList.add("ec-open")
  }

  const closeCart = () => {
    cartContainer.current.classList.remove("ec-open")
  }

  const closeAllCart = () => {
    cartContainer.current.classList.remove("ec-open")
  }

  function removeProducts(id) {

    let product = cartProd.filter(function (obj) {

      return obj.fakeId != id;

    });

    localStorage.setItem("produtos", JSON.stringify(product));
    setCartProd(product);
  }

  function clearCookies() {

    setCookie("customer_access_token", "", { path: '/' });
    setCookie("customer_name", ``, { path: '/' });
    setCookie("customer_id", ``, { path: '/' });

    return router.push("/Login");
  }

  async function search(e) {
    e.preventDefault(e);

    await axios.get(`/api/products_limit/getAllPLimit?busca=${searchText}`)
      .then(({ data }) => {
        console.log(data)
        setSearchData(data);
        router.push({ pathname: "/AllProducts", query: { busca: searchText, procura: "Sim" } })
      })
      .catch((err) => console.log(err));
  }



  const estaLogado = () => {
    toast.error('Está logado? Realize o login para acessar o carrinho', {
      position: "top-right",
    });
  }

  return (
    <>

      <Whatsapp />
      <header className="ec-header">

        <div className="header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col header-top-left col-md-5">
                <div className="header-top-message">contato@aspapoulas.com.br</div>
              </div>
              <div className="col header-top-right d-none d-lg-block col-md-7">
                <div className="header-top-right-inner d-flex justify-content-end">
                  <div className="header-top-link">
                    {data}
                  </div>
                </div>
              </div>
              <div className="col header-top-res d-lg-none">
                <div className="ec-header-bottons">
                  <div className="ec-header-user dropdown">
                    <button className="dropdown-toggle" data-bs-toggle="dropdown">
                      <FaUserAlt className="svg_img header_svg" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      {session ?
                        <>
                          <li><Link className="dropdown-item" href="/UserProfile">Meus Dados</Link></li>
                          <li>
                            <Link className="dropdown-item" href="/UserHistory">Meus Pedidos</Link>
                          </li>
                          <li><a className="dropdown-item" href="#" onClick={() => clearCookies()}>Sair</a></li>
                        </>
                        :
                        <>
                          <li><Link className="dropdown-item" href="/Register">Registrar</Link></li>
                          <li><Link className="dropdown-item" href="/Login">Entrar</Link></li>
                        </>
                      }
                    </ul>
                  </div>
                  <a onClick={toggleCart} className="ec-header-btn ec-side-toggle">
                    <div className="header-icon">
                      <FaShoppingCart className="svg_img header_svg" />
                    </div>

                    <span className="ec-header-count ec-cart-count">{tamanho}</span>

                    <span className="ec-header-count ec-cart-count">{tamanho}</span>

                  </a>
                  <a
                    onClick={togglemenu}
                    href="#ec-mobile-menu"
                    className="ec-header-btn ec-side-toggle d-lg-none"
                  >
                    <CgMenuGridR size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="ec-header-bottom d-none d-lg-block">
          <div className="container position-relative">
            <div className="row">
              <div className="ec-flex">
                <div className="align-self-center ec-header-logo">
                  <div className="header-logo">
                    <Link href="/"
                    ><Image src={require("../assets/img/logo.png")} alt="Site Logo" width={250} height={120} />
                      <Image
                        className="dark-logo"
                        src={require("../assets/img/logo-dark.png")}
                        alt="Site Logo"
                        style={{ display: 'none' }}
                        width={250} height={120}
                      /></Link>
                  </div>
                </div>
                <div className="align-self-center ec-header-search">
                  <div className="header-search">
                    <form className="ec-search-group-form" action="#">
                      <input
                        className="form-control"
                        placeholder="Busca"
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      <button className="search_submit" onClick={(e) => search(e)} >
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                </div>


                <div className="align-self-center">
                  <div className="ec-header-bottons">
                    <div className="ec-header-user dropdown">
                      <button className="dropdown-toggle" data-bs-toggle="dropdown">
                        <FaUserAlt className="svg_img header_svg" />
                        {session ?
                          <span className="ec-btn-title ml-2">{cookies.customer_name.split(' ', 1)}</span>
                          :
                          <span className="ec-btn-title ml-2">Minha conta</span>
                        }
                      </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                        {session ?
                          <>
                            <li><Link className="dropdown-item" href="/UserProfile">Meus Dados</Link></li>
                            <li>
                              <Link className="dropdown-item" href="/UserHistory">Meus Pedidos</Link>
                            </li>
                            <li><a className="dropdown-item" href="#" onClick={() => clearCookies()}>Sair</a></li>
                          </>
                          :
                          <>
                            <li><Link className="dropdown-item" href="/Register">Registrar</Link></li>
                            <li><Link className="dropdown-item" href="/Login">Entrar</Link></li>
                          </>
                        }

                      </ul>
                    </div>
                    <a onClick={toggleCart} className="ec-header-btn ec-side-toggle">
                      <div className="header-icon">
                        <FaShoppingCart className="svg_img header_svg" />

                        <span className="ec-header-count ec-cart-count">{tamanho}</span>

                        <span className="ec-header-count ec-cart-count">{tamanho}</span>

                      </div>
                      <span className="ec-btn-title">Carrinho</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ec-header-bottom d-lg-none">
          <div className="container position-relative">
            <div className="row">
              <div className="col">
                <div className="header-logo">
                  <Link href="/"
                  ><Image src={require("../assets/img/logo.png")} alt="Site Logo" style={{ width: '180px !important' }} height={120} /><Image
                      className="dark-logo"
                      src={require("../assets/img/logo-dark.png")}
                      alt="Site Logo"
                      style={{ display: 'none' }}
                      height={120}
                    /></Link>
                </div>
              </div>
              <div className="col align-self-center ec-header-search">
                <div className="header-search">
                  <form className="ec-search-group-form" action="#">
                    <input
                      className="form-control"
                      placeholder="Busca"
                      type="text"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="search_submit" onClick={(e) => search(e)} >
                      <FaSearch />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <div className="ec-main-menu">
                  <ul>
                    <li><Link href="/">Home</Link></li>

                    <li className="dropdown">
                      <Link
                        className="d-flex align-items-center"
                        href={{
                          pathname: '/AllProducts',
                          query: { id: `Todos os Produtos` }
                        }}>
                        Produtos
                        <div style={{ width: '5px' }}></div>
                        <FaAngleDown /></Link>
                      <ul className="sub-menu">
                        {mainCategories?.map((item, index) => {
                          return (
                            <li key={index}><Link
                              href={{
                                pathname: '/AllProducts',
                                query: { id: `${item?._id}` }
                              }}>{item?.name}</Link></li>
                          )
                        })}
                      </ul>
                    </li>
                    <li>
                      <Link href="/sobre-nos">Sobre nós</Link>
                    </li>
                    <li>
                      <Link href="/Contact">Contato</Link>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="d-flex align-items-center">Mais
                        <div style={{ width: '5px' }}></div><FaAngleDown /></a>
                      <ul className="sub-menu">
                        <li><Link href="/faq">Dúvidas Frequentes</Link></li>
                        <li><Link href="/TermsResponsability">Termos e Condições</Link></li>
                        <li><Link href="/PrivacyPolicy">Política de Privacidade</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={menuContainer} className="ec-side-cart ec-mobile-menu">
          <div className="ec-menu-title">
            <span className="menu_title">Menu</span>
            <button onClick={closemenu} className="ec-close">×</button>
          </div>
          <div className="ec-menu-inner">
            <div className="ec-menu-content">
              <ul>
                <li><Link href="/">Home</Link></li>

                <li className="dropdown">
                  <Link
                    className="d-flex align-items-center"
                    href={{
                      pathname: '/AllProducts',
                      query: { id: `Todos os Produtos` }
                    }}>
                    Produtos
                    <div style={{ width: '5px' }}></div>
                    <FaAngleDown /></Link>
                  <ul className="sub-menu">
                    {mainCategories?.map((item, index) => {
                      return (
                        <li key={index}><Link
                          href={{
                            pathname: '/AllProducts',
                            query: { id: `${item?._id}` }
                          }}>{item?.name}</Link></li>
                      )
                    })}
                  </ul>
                </li>
                <li>
                  <Link href="/sobre-nos">Sobre nós</Link>
                </li>
                <li>
                  <Link href="/Contact">Contato</Link>
                </li>
                <li className="dropdown">
                  <a href="#" className="d-flex align-items-center">Mais
                    <div style={{ width: '5px' }}></div><FaAngleDown /></a>
                  <ul className="sub-menu">
                        <li><Link href="/faq">Dúvidas Frequentes</Link></li>
                    <li><Link href="/TermsResponsability">Termos e Condições</Link></li>
                    <li><Link href="/PrivacyPolicy">Política de Privacidade</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header-res-lan-curr">
              <div className="header-res-social">
                <div className="header-top-social">
                  <div className="ec-footer-links linksRedes" style={{ width: '100%' }}>
                    <ul className="align-items-center mob-width mob-links d-flex justify-content-evenly">
                      <li className="ec-footer-link"><a target="_blank" rel="noreferrer" href="https://www.instagram.com/aspapoulas_loja/">
                        <FaInstagram />
                      </a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* <!-- Ekka Cart Start --> */}
      <div onClick={closeAllCart} className="ec-side-cart-overlay"></div>
      <div ref={cartContainer} id="ec-side-cart" className="ec-side-cart">
        <div className="ec-cart-inner">
          <div className="ec-cart-top">
            <div className="ec-cart-title">
              <span className="cart_title">Meu Carrinho</span>
              <button onClick={closeCart} className="ec-close">×</button>
            </div>
            <ul className="eccart-pro-items">

              {cartProd?.map((item, index) => {
                return (
                  <li key={index}>
                    <a href="#" className="sidecart_pro_img">
                      <Image key={index} src={item.imagem}
                        width={250} height={250}></Image>
                    </a>
                    <div className="ec-pro-content">
                      <a href="#" className="cart_pro_title">{item.titulo}</a>
                      <span className="cart-price"><span>R${parseInt(item.valor).toFixed(2)}</span> x {item.quantidadeCompra}</span>
                      <span>{sizes?.map(main => { if (item.sizeId === main._id) return (<> {`${main.name}`} </>) })}</span>
                      <span style={{display: 'block', backgroundColor: `${item.colorHex}`, width: '20px', height: '20px', border: '1px solid #dedede', borderRadius : '50%'}}></span>
                      
                      <a href="#" onClick={() => removeProducts(item.fakeId)} className="remove">×</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="ec-cart-bottom">
            <div className="cart-sub-total">
              <table className="table cart-table">
                <tbody>
                  <tr>
                    <td className="text-left">Sub-Total :</td>
                    <td className="text-right">
                      R${cartProd?.map((item2, index) => {
                        subTotal = item2.valor * item2.quantidadeCompra + subTotal
                        if (index + 1 === tamanho) { return (subTotal.toFixed(2)) }
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart_btn">
              {session ?
                <Link href="/ShoppingCart" className="btn btn-primary w-100">Visualizar Carrinho</Link>
                :
                <div onClick={estaLogado} className="btn btn-primary w-100">Visualizar Carrinho</div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Ekka Cart End --> */}
    </>
  );
}

export default Header;


