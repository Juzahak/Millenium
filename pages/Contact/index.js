import { FaPhoneAlt, FaMailBulk, FaMapMarkedAlt, FaItalic } from "react-icons/fa";
import Image from 'next/image';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useContext, useState } from "react";
import { CheckoutArr } from "../../Context";

export default function Contact() {
  const { telefone, endereco, cnpj, email } = useContext(CheckoutArr);
  const [emailForm, setEmail] = useState("")
  const [name, setName] = useState("")
  const [telefoneForm, setTelefone] = useState("")
  const [textForm, setText] = useState("")

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const [inputs, setInputs] = useState({
    name: name,
    email: `juzahak@gmail.com`,
    emailInput: emailForm,
    telefone: telefoneForm,
    texto: textForm,
    senderEmail: 'suporte2@frequencia.com.br',
    subtitleEmail: 'Contato Via Site - Loja Bellas Natural',
  })

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs({
        name: `${name}`,
        emailInput: `${emailForm}`,
        telefone: `${telefoneForm}`,
        texto: `${textForm}`,
        email: 'juzahak@gmail.com',
        senderEmail: 'suporte2@frequencia.com.br',
        subtitleEmail: 'Contato Via Site - Loja Bellas Natural',
      })
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }

  const handleOnSubmit = async e => {
    e.preventDefault();

    let inputsArr = {
      name: `${name}`,
      emailInput: `${emailForm}`,
      telefone: `${telefoneForm}`,
      texto: `${textForm}`,
      email: 'juzahak@gmail.com',
      senderEmail: 'suporte2@frequencia.com.br',
      subtitleEmail: 'Contato Via Site - Loja Bellas Natural',
    };

    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    const res = await fetch('/api/sendContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputsArr)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  }

  return (
    <>
      <Header />

      <section class="ec-page-content section-space-p">
        <div class="container">
          <div class="row">
            
            <div className="ec-faq-wrapper text-center mb-3">
              <div className="section-title al">
                <h2 className="ec-title">Contato</h2>
                <p className="sub-title-with-margin mt-5">Se ainda tiver alguma dúvida mesmo após verificar nosso site, estarecmos a disposição!</p>
              </div>
            </div>

            <div class="ec-common-wrapper d-flex mob-column">
              <div class="ec-contact-leftside">
                <div class="ec-contact-container">
                  <div class="ec-contact-form">
                    <form action="#" method="post">
                      <span class="ec-contact-wrap">
                        <label htmlFor="name">Nome*</label>

                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nome"
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="email">Email*</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="phonenumber">Telefone*</label>
                        <input
                          type="text"
                          name="phonenumber"
                          id="phonenumber"
                          placeholder="Telefone"
                          required
                          onChange={(e) => setTelefone(e.target.value)}
                        />
                      </span>
                      <span class="ec-contact-wrap">
                        <label htmlFor="message">Mensagem*</label>
                        <textarea
                          name="address"
                          id="message"
                          placeholder="Escreva sua mensagem aqui..."
                          style={{whiteSpace: 'pre-wrap'}}
                          onChange={(e) => setText(e.target.value)}
                        ></textarea>
                      </span>

                      <span class="ec-contact-wrap ec-contact-btn justify-content-center">
                        <button class="btn btn-primary" onClick={(e) => handleOnSubmit(e)}>
                          Enviar
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
              <div className="ec-contact-rightside mt-md-0">
                <div className="ec_contact_info w-100 mt-0">
                  <ul className="align-items-center w-100 p-4">
                    <li className="ec-contact-item">
                      <div className="d-flex align-items-center">
                        <FaPhoneAlt className="icon-contact"></FaPhoneAlt>&nbsp;
                        <span>Telefone :</span>
                      </div>
                      <a target="_blank" href="/"> (19) 9999-9999</a>
                    </li>
                    <li className="ec-contact-item">
                      <div className="d-flex">
                        <FaMailBulk className="icon-contact"></FaMailBulk>&nbsp;
                        <span>Email :</span>
                      </div>
                      <a target="_blank" href="/"> contato@aspapoulas.com.br</a>
                    </li>
                    <li className="ec-contact-item">
                      <div className="d-flex">
                        <FaMapMarkedAlt className="icon-contact"></FaMapMarkedAlt>&nbsp;
                        <span>Endereço :</span>
                      </div>
                      <a target="_blank" rel="noreferrer" href="https://goo.gl/maps/a9rh3GGSbEn1LRZd9"> Rua Cel. Pedro Penteado, 637 - Serra Negra -SP </a>
                    </li>
                  </ul>
                </div>
                <div className="ec_contact_map">
                  <div className="ec_map_canvas">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2112.6308636236004!2d-46.69847722068317!3d-22.613243458309157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c918771cf00001%3A0x3188f9ebea8ae21b!2sR.%20Cel.%20Pedro%20Penteado%2C%20637%20-%20Est%C3%A2ncia%20Su%C3%AD%C3%A7a%2C%20Serra%20Negra%20-%20SP%2C%2013930-000!5e1!3m2!1spt-BR!2sbr!4v1669229085735!5m2!1spt-BR!2sbr" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
