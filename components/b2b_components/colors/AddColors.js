import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";

export default function AddColor() {
  const [colorName, setColorName] = useState("");
  const [color, setColor] = useState("");
  const [colorIsActive, setColorIsActive] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.post(`/api/colors/insertColor`, {
      name: colorName,
      color: color,
    });
    toast('Cor sendo adicionada!', {
      position: "top-right",
      });
    mutate(`/api/colors/getAllColor`);
    router.push("/b2b/color");
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
                onChange={(e) => setColorName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Cor
            </label>
            <div className="col-12">
              <input
                id="color"
                name="color"
                className="form-control here slug-title"
                type="color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Adicionar Cor
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
