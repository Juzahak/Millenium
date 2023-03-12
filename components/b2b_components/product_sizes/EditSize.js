import axios from "axios";
import router from 'next/router'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

export default function EditSize({ productSizesEditId, productSizes, setShowEditComponent }) {
  const [sizeName, setSizeName] = useState("");
  const [sizeActive, setSizeActive] = useState(0);
  const [id_, setId_] = useState(0);


  useEffect(() => {
    productSizes?.map(item => {
      if(item._id === productSizesEditId ) {
        setSizeName(item.name);
        setSizeActive(item.active);
        setId_(item._id);
      } 
    })
  }, [productSizesEditId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await axios.put(`/api/product_sizes/updateSizes?id=${id_}`, {
      name: sizeName,
      active: sizeActive,
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
        <div className="d-flex justify-content-between">
        <h4>Editar</h4>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              setShowEditComponent(false);
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
                value={sizeName}
                onChange={(e) => setSizeName(e.target.value)}
              />
            </div>
          </div>

          <div className="row align-items-center">
            <label className="form-label">Ativado</label>
            {sizeActive === '1' ?
              <>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
                    value={'1'}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setSizeActive(e.target.value)}
                  />
                  Sim
                </div>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    value={'0'}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setSizeActive(e.target.value)}
                  />
                  Não
                </div>
              </>
              :
              <>
              <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                <input
                  type="radio"
                  name="active"
                  value={'1'}
                  style={{ width: '20px', margin: '0 15px 0 0' }}
                  onChange={(e) => setSizeActive(e.target.value)}
                />
                Sim
              </div>
              <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                <input
                  type="radio"
                  name="active"
                  defaultChecked
                  value={'0'}
                  style={{ width: '20px', margin: '0 15px 0 0' }}
                  onChange={(e) => setSizeActive(e.target.value)}
                />
                Não
              </div>
            </>
            }

          </div>

          <div className="row">
            <div className="col-12">
            <button name="submit" type="submit" className="btn btn-primary">
            Editar Tamanho
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}