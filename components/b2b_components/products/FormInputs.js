import { useState } from "react";

export default function FormInputs({
  productName,
  productCategory,
  shortProductDescription,
  fullProductDescription,
  setProductName,
  setFullProductDescription,
  setShortProductDescription,
  setProductCategory,
  setsubProductCategory,
  productsubCategory,
  subCategories,
  mainCategories,
}) {  

  const subcategories = (e) => {
    setsubProductCategory([...productsubCategory, e])
    for (let index = 0; index < productsubCategory.length; index++) {
      if(productsubCategory[index] === e){
        setsubProductCategory(
          productsubCategory.filter(a =>
            a !== e
          ));
      }
      
    }

  }

 
  return (
    <>
      <div className="col-md-12">
        <label htmlFor="inputEmail4" className="form-label">
          Nome do Produto
        </label>
        <input
          type="text"
          className="form-control slug-title"
          id="inputEmail4"
          defaultValue={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="col-md-12">
        <label className="form-label">Selecionar Categoria</label>
        <select
          name="categories"
          onChange={(e) => setProductCategory(e.target.value)}
          id="Categories"
          className="form-select"
        >
          <option value="">
            Escolha uma Categoria
          </option>
          {mainCategories?.map((mainCategory, index) => {
            return(
              <option key={index} value={mainCategory?.name}>
              {mainCategory?.name}
              </option>)
          })};
        </select>
      </div>

      <div className="col-md-12">
        <label className="form-label">Selecionar subCategoria</label>
        <div className="checkboxinputs">
          {subCategories?.map((subCategory, index) => {
            if (subCategory.main_category === productCategory) {
            return(
              <div className="row align-items-center" key={index}>
                <div className="col-auto d-flex" style={{ height: '50px'}}>
                <input
                  type="checkbox"
                  id="actived"
                  name="subcategory"
                  value={subCategory?.name}
                  style={{width: '20px'}}
                  onChange={(e) => subcategories( e.target.value)}
                />
              </div>
              {subCategory?.name}
            </div>
              )
          }})}
          </div>
      </div>

      <div className="col-md-12">
        <label className="form-label">Breve Descrição</label>
        <textarea
          className="form-control"
          defaultValue={shortProductDescription}
          onChange={(e) => setShortProductDescription(e.target.value)}
          rows="2"
        ></textarea>
      </div>

      <div className="col-md-12">
        <label className="form-label">Descrição Completa</label>
        <textarea
          className="form-control"
          defaultValue={fullProductDescription}
          onChange={(e) => setFullProductDescription(e.target.value)}
          rows="4"
        ></textarea>
      </div>
    </>
  );
}
