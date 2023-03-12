import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import router from 'next/router';
import useSwr, { mutate } from "swr";

export default function EditSubCategory({ subCategoryId, category, subCategory, setShowEditSubCategoryComponent }) {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryIsActive, setSubCategoryIsActive] = useState(0);
  const [mainCategorySelected, setMainCategorySelected] = useState("");
  const [mainCategorySelectedName, setMainCategorySelectedName] = useState("");
  const [id_, setId_] = useState(0);

  useEffect(() => {
    subCategory?.map(item => {
      if (item._id === subCategoryId) {
        setSubCategoryName(item.name);
        setSubCategoryIsActive(item.active);
        setMainCategorySelected(item.main_category);
        let catName = '';
        { category?.map(main => { if (item.main_category === main._id) { catName = main.name } }) }
        setMainCategorySelectedName(catName);
        setId_(item._id)
      }
    })
  }, [subCategoryId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(`/api/subcategory/updateSubCategory?id=${id_}`, {
      name: subCategoryName,
      mainCategory: mainCategorySelected,
      active: subCategoryIsActive,
    });
    toast('SubCategoria sendo adicionado!', {
      position: "top-right",
      });
    mutate(`/api/subcategory/getAllSubCategory`);
    if (data.data) router.push("/b2b/subCategory");
  };

  return (
    <div className="ec-cat-form">
      <div className="d-flex justify-content-between">
        <h4>Editar</h4>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            setShowEditSubCategoryComponent(false);
          }}
        > Nova </button>
      </div>

      <form onSubmit={onSubmit}>

        <div className="form-group row">
          <label className="col-12 col-form-label">
            Categoria Principal
          </label>
          <div className="col-12">
            <select className="form-control" id="main-categories" onChange={(e) => setMainCategorySelected(e.target.value)}>
              <option value={mainCategorySelected}>
                {mainCategorySelectedName}
              </option>

              {category?.map((item) => {
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
              value={subCategoryName}
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
              {subCategoryIsActive === '1' ? (
                <input
                  type="radio"
                  id="actived"
                  name="sub-category"
                  defaultChecked
                  value={1}
                  onClick={(e) => setSubCategoryIsActive(e.target.value)}
                />
              ) : (
                <input
                  type="radio"
                  id="actived"
                  name="sub-category"
                  value={1}
                  onClick={(e) => setSubCategoryIsActive(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="col-auto form-group row align-items-center">
            <label className="col-auto d-inline m-0">
              Não
            </label>
            <div className="col-auto">
              {subCategoryIsActive === '0' ? (
                <input
                  type="radio"
                  id="disabled"
                  name="sub-category"
                  defaultChecked
                  value={0}
                  onClick={(e) => setSubCategoryIsActive(e.target.value)}
                />
              ) : (
                <input
                  type="radio"
                  id="disabled"
                  name="sub-category"
                  value={0}
                  onClick={(e) => setSubCategoryIsActive(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
              Editar Sub Categoria
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
