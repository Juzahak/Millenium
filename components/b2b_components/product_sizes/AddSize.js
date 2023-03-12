import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

export default function AddSize() {
  const [sizeName, setSizeName] = useState("");
  const [active, setActive] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(`/api/product_sizes/insertSizes`, {
      name: sizeName,
      active: active,
    });
    toast('Tamanho sendo adicionado!', {
      position: "top-right",
      });
    mutate(`/api/product_sizes/getAllSizes`);
    if (data.data) router.push("/b2b/productSizes");
  };


  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Tamanho</h4>
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
                onChange={(e) => setSizeName(e.target.value)}
              />
            </div>
          </div>

          <div className="row align-items-center mb-4">
            <label className="form-label">Ativado</label>
            <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
              <input
                type="radio"
                name="active"
                value={1}
                style={{ width: '20px', margin: '0 15px 0 0' }}
                onChange={(e) => setActive(e.target.value)}
              />
              Sim
            </div>
            <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
              <input
                type="radio"
                name="active"
                value={0}
                style={{ width: '20px', margin: '0 15px 0 0' }}
                onChange={(e) => setActive(e.target.value)}
              />
              Não
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Adicionar Tamanho
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}