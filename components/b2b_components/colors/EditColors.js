import axios from "axios";
import router from 'next/router'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

export default function EditColors({ colorId, colors, setShowEditCategoryComponent }) {
  const [colorName, setColorName] = useState("");
  const [color, setColor] = useState("");
  const [id_, setId_] = useState(0);


  useEffect(() => {
    colors?.map(item => {
      if (item._id === colorId) {
        setColorName(item.name);
        setColor(item.color);
        setId_(item._id)
      }
    })
  }, [colorId]);



  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(`/api/colors/updateColor?id=${id_}`, {
      name: colorName,
      color: color,
    });
    toast('Cor sendo editada!', {
      position: "top-right",
      });
    mutate(`/api/colors/getAllColor`);
    router.push("/b2b/color");
  };

  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <div className="d-flex justify-content-between">
          <h4>Editar</h4>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setShowEditCategoryComponent(false);
            }}
          > Nova </button>
        </div>

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
                value={colorName}
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
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
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
