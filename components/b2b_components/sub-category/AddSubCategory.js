import axios from "axios";
import router from 'next/router'
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useSwr, { mutate } from "swr";

export default function AddSubCategory({ subCategory, category }) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [mainCategorySelected, setMainCategorySelected] = useState("");
  const [subCategoryIsActive, setSubCategoryIsActive] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(`/api/subcategory/insertSubCategory`, {
      name: subCategoryName,
      mainCategory: mainCategorySelected,
      active: subCategoryIsActive,
    });
    toast('SubCategoria sendo adicionada!', {
      position: "top-right",
      });
    mutate(`/api/subcategory/getAllSubCategory`);
    if (data.data) router.push("/b2b/subCategory");
  };

  return (
    <div className="ec-cat-form">
      <h4>Adicionar Sub Categoria</h4>

      <form onSubmit={onSubmit}>

        <div className="form-group row">
          <label className="col-12 col-form-label">
            Categoria Principal
          </label>
          <div className="col-12">
            <select
              className="form-control"
              id="main-categories"
              onChange={(e) => setMainCategorySelected(e.target.value)}
            >
              <option>
                Selecione uma categoria principal
              </option>

              {category?.map(item => {
                return (
                  <option value={item._id} key={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-12 col-form-label">
            Nome
          </label>
          <div className="col-12">
            <input
              id="text"
              name="text"
              className="form-control here slug-title"
              type="text"
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12">
          <h5 className="col-form-label">Ativado</h5>
        </div>

        <div className="row">
          <div className="col-auto form-group row align-items-center">
            <label className="col-auto d-inline m-0">
              Sim
            </label>
            <div className="col-auto">
              <input
                type="radio"
                id="actived"
                name="sub-category"
                value={1}
                onClick={(e) => setSubCategoryIsActive(e.target.value)}
              />
            </div>
          </div>

          <div className="col-auto form-group row align-items-center">
            <label className="col-auto d-inline m-0">
              Não
            </label>
            <div className="col-auto">
              <input
                type="radio"
                id="disabled"
                name="sub-category"
                value={0}
                onClick={(e) => setSubCategoryIsActive(e.target.value)}
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
  );
}
