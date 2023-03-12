import axios from "axios";
import router from 'next/router'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

export default function EditUsers({ usersEditId, users }) {
  const [id_, setId_] = useState();
  const [usersName, setUserName] = useState("");
  const [usersLogin, setUserLogin] = useState("");
  const [usersEmail, setUserEmail] = useState("");
  const [usersPassword, setUsersPassword] = useState("");
  const [usersLevel, setUsersLevel] = useState();


  useEffect(() => {
    users?.map(item => {
      if(item.id === usersEditId ) {
        setUserName(item.name);
        setUserEmail(item.email);
        setUserLogin(item.login);
        setUsersPassword(item.password);
        setId_(item._id);
        if(item.level === 10) {setUsersLevel('Funcionario')}
        if(item.level === 30) {setUsersLevel('Gerente')}
        if(item.level === 50) {setUsersLevel('WebMaster')}
      }
    })
  }, [usersEditId]);



  const onSubmit = async (e) => {
    e.preventDefault();
    var lvlAccess = 0;
    if (usersLevel === 'funcionario') { lvlAccess = 10 }
    if (usersLevel === 'gerente') { lvlAccess = 30 }

    let data = await axios.put(`/api/users/updateUsers?id=${id_}`, {
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
        <h4>Editar</h4>

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
                value={usersName}
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
                value={usersEmail}
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
                value={usersLogin}
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
                value={usersPassword}
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
              
              <option value={usersLevel}>{usersLevel}</option>
              <option value="funcionario">Funcionario</option>
              <option value="gerente">Gerente</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Editar Categoria
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
