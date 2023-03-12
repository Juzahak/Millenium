import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

export default function AddUsers() {
  const [usersName, setUserName] = useState("");
  const [usersEmail, setUserEmail] = useState("");
  const [usersLogin, setUserLogin] = useState("");
  const [usersPassword, setUsersPassword] = useState("");
  const [usersLevel, setUsersLevel] = useState(0);
  console.log(usersName, usersEmail, usersLogin, usersPassword, usersLevel )
  const onSubmit = async (e) => {
    e.preventDefault();
   var lvlAccess = 0;

    if (usersLevel === 'funcionario') { lvlAccess = 10 }
    if (usersLevel === 'gerente') { lvlAccess = 30 }
    
    let data = await axios.post(`/api/users/insertUsers`, {
      name: usersName,
      email: usersEmail,
      user: usersLogin,
      password: usersPassword,
      userlevel: lvlAccess,
      active: 1,

    });
    toast('Usuário sendo adicionado!', {
      position: "top-right",
      });
    mutate(`/api/users`);
    if (data.data) router.push("/b2b/access");
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Acesso</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Nome
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              E-mail
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="email"
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Login
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title"
                type="text"
                onChange={(e) => setUserLogin(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Senha
            </label>
            <div className="col-12">
              <input
                id="password"
                name="password"
                className="form-control here slug-title"
                onChange={(e) => setUsersPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Level
            </label>
            <div className="col-12">
              <select
                id="color"
                name="color"
                className="form-control here slug-title"
                onChange={(e) => setUsersLevel(e.target.value)}
              >
              
              <option value="">Escolha o acesso</option>
              <option value="funcionario">Funcionario</option>
              <option value="gerente">Gerente</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Adicionar Acesso
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
