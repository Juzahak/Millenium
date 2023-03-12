import Link from "next/link";
import router from "next/router";

import { useState } from "react";
import { useCookies } from "react-cookie";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { toast } from "react-toastify";

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Login() {
  const { data: allCustomers } = useSwr(`/api/customers/getAllCustomers`, fetcher);
  const [cookies, setCookie] = useCookies();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();

    allCustomers?.map((customer) => {
      if (customer.email === email && customer.password === password) return generateTokenAccess(customer);
    });
  }

  function generateTokenAccess(customer) {
    toast.success(`Olá ${customer.name}!`);

    setCookie("customer_access_token", "fsa15f61e56qa1gv52ads31g56qw1f231qa5", {
      path: "/",
    });
    setCookie("customer_name", customer.name, { path: "/" });
    setCookie("customer_id", customer._id, { path: "/" });

    router.push("/");
  }

  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-bg-title mb-4">Entrar</h2>
              </div>
            </div>

            <div className="ec-login-wrapper">
              <div className="ec-login-container">
                <div className="ec-login-form">
                  <form onSubmit={(e) => login(e)}>
                    <span className="ec-login-wrap">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="name"
                        placeholder="Escreva seu email..."
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                    <span className="ec-login-wrap">
                      <label>Senha *</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Escreva sua senha..."
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </span>
                    <span className="ec-login-wrap ec-login-fp">
                      <label>
                        <a href="#">Esqueceu a senha?</a>
                      </label>
                    </span>
                    <span className="ec-login-wrap ec-login-btn">
                      <Link href="/Register" className="btn btn-secondary rounded">
                        Registrar
                      </Link>
                      <button className="btn btn-primary rounded" type="submit">
                        Entrar
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
