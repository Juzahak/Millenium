import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryIsActive, setCategoryIsActive] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(`/api/category/insertCategory`, {
      name: categoryName,
      active: categoryIsActive,
    });
    toast('Categoria sendo adicionada!', {
      position: "top-right",
      });
    mutate(`/api/category/getAllCategory`);
    if (data.data) router.push("/b2b/category");
  };

  

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Categoria</h4>
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
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12">
            <h5 className="col-form-label">Ativado</h5>
          </div>

          <div className="row">
            <div className="col-auto form-group row align-items-center">
              <label htmlFor="actived" className="col-auto d-inline m-0">
                Sim
              </label>
              <div className="col-auto">
                <input
                  type="radio"
                  id="actived"
                  name="category"
                  value={1}
                  onClick={(e) => setCategoryIsActive(e.target.value)}
                />
              </div>
            </div>

            <div className="col-auto form-group row align-items-center">
              <label htmlFor="disabled" className="col-auto d-inline m-0">
                Não
              </label>
              <div className="col-auto">
                <input
                  type="radio"
                  id="disabled"
                  name="category"
                  value={0}
                  onClick={(e) => setCategoryIsActive(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Adicionar Categoria
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddCategory;