import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaRegEnvelope, FaBuilding, FaAngleRight } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link'
// import teste from '../assets';

function Footer() {


  return (
    <>
      {/* <!-- Footer Start --> */}
      <footer className="ec-footer section-space-mt">
        <div className="footer-newletter">
          <div className="container">
            <div className="row">
              <div className="text-center footer-news-inner">
                <div className="footer-news-block">
                  <div className="footer-news-title">Fale com a gente no &nbsp;
                    <button className="button btn-secondary btn-whatsapp btn-redes">Whatsapp! <FaWhatsapp /></button>
                  </div>
                  <div className="footer-news-title">Siga-nos no &nbsp;
                    <button className="button btn-secondary btn-instagram btn-redes">Instagram! <FaInstagram /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-12 col-lg-4 ec-footer-info">
                  <div className="ec-footer-widget">
                    <h4 className="ec-footer-heading">Mapa do Site</h4>
                    <div className="ec-footer-links">
                      <ul className="align-items-center">
                        <li className="ec-footer-link">
                          <FaAngleRight className="list-icon" />
                          <Link href="/">Home</Link>
                        </li>
                        <li className="ec-footer-link">
                          <FaAngleRight className="list-icon" />
                          <Link href="/sobre-nos">Sobre Nós</Link>
                        </li>
                        <li className="ec-footer-link">
                          <FaAngleRight className="list-icon" />
                          <Link href="/faq">Dúvidas Frequentes</Link>
                        </li>
                        <li className="ec-footer-link">
                          <FaAngleRight className="list-icon" />
                          <Link href="/TermsResponsability">Política de Compras</Link>
                        </li>
                        <li className="ec-footer-link">
                          <FaAngleRight className="list-icon" />
                          <Link href="/PrivacyPolicy">Política de Privacidade</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4 ec-footer-contact">
                  <div className="ec-footer-widget">
                    <h4 className="ec-footer-heading">Contato</h4>
                    <div className="ec-footer-links">
                      <ul className="align-items-center">
                        <li className="ec-footer-link">
                          <span><FaMapMarkerAlt className="ecicon" /></span>Rua
                          Cel. Pedro Penteado, 637 <br />
                          Serra Negra - SP
                        </li>
                        <li className="ec-footer-link">
                          <span><FaPhoneAlt className="ecicon" /></span>
                          <a href="tel:+551999999999">(19) 9999-9999</a>
                        </li>
                        <li className="ec-footer-link">
                          <span><FaBuilding className="ecicon" /></span>
                          CNPJ: 47.282.631/0001-04
                        </li>
                        <li className="ec-footer-link">
                          <span><FaRegEnvelope className="ecicon" /></span>
                          <a href="mailto:contato@aspapoulas.com.br">contato@aspapoulas.com.br</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4 ec-footer-account">
                  <Link href="/">
                    <Image src={require("../assets/img/logo-footer.png")} alt="Site Logo" width={250} height={120} />
                    <Image
                      className="dark-logo"
                      src={require("../assets/img/logo-dark-footer.png")}
                      alt="Site Logo"
                      style={{ display: 'none', maxWidth: '100%' }}
                      width={500} height={500}
                    />
                  </Link>
                </div>
                <div className="col-sm-12 ec-footer-social mt-4"></div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                {/* <!-- Footer Copyright Start --> */}
                <div className="col footer-copy">
                  <div className="footer-bottom-copy">
                    <div className="ec-copy">
                      © 2022 <a className="site-name">As Papoulas</a>. Todos
                      os direitos reservados.
                    </div>
                  </div>
                </div>
                {/* <!-- Footer Copyright End --> */}
                {/* <!-- Footer payment --> */}
                <div className="col footer-bottom-right">
                  <div className="footer-bottom-payment d-flex justify-content-end">
                    <div className="payment-link">
                      <Image src={require("../assets/img/footer/payment.png")} width={40} height={25} alt="" />
                    </div>
                  </div>
                </div>
                {/* <!-- Footer payment --> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Area End --> */}
    </>
  );
}

export default Footer;
