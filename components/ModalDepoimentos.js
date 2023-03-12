import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import Image from 'next/image';

export default function ModalDepoimentos() {
    const [] = useState();
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [depoimento, setDepoimento] = useState('');

    const customImgLoader = ({ src }) => {
        return `${src}`;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let now = new Date

        toast('Depoimento adiconado com sucesso!', {
          position: "top-right",
          });
    
        let data = await axios.post(`/api/reviewList`, {
          name: nome,
          city: cidade,
          description: depoimento,
          date: `${now.getDate()}/` + `${now.getMonth()}/` + `${now.getFullYear()}`,
          active: 0,
        });
        mutate(`/api/reviewList`);
        if (data.data) router.push("/");
      };
    


    return (
        <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog d-flex justify-content-center align-items-center" style={{ marginTop: '0' }} role="document">
                <div className="modal-content modal-comentario">
                    <div className="modal-body">
                        <div className="row">
                            <div className="ec-vendor-block-img space-bottom-30">
                                <div className="ec-vendor-upload-detail">

                                    <form className="row g-3">
                                        <div className="">
                                            <div>
                                                <div>
                                                <div className="col-md-12 space-t-15 mt-3">
                                                    <label className="form-label">
                                                        Nome
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setNome(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-12 space-t-15 mt-3">
                                                    <label className="form-label">
                                                        Cidade
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        onChange={(e) => setCidade(e.target.value)}
                                                    />
                                                </div>
                                                </div>
                                                <div className="col-md-12 space-t-15 mt-3">
                                                    <label className="form-label">
                                                        Depoimento
                                                    </label>
                                                    <textarea
                                                        type="text"
                                                        rows={5}
                                                        className="form-control"
                                                        onChange={(e) => setDepoimento(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-12 space-t-15 mt-7 text-center d-flex justify-content-around">
                                                <button
                                                    className="btn btn-sm btn-secondary qty_close"
                                                    style={{ width: '250px' }}
                                                    onClick={(e) => onSubmit(e)}
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    Depoimento
                                                </button>

                                                <button
                                                    onClick={(e) => { e.preventDefault() }}
                                                    className="btn btn-sm btn-primary qty_close"
                                                    style={{ width: '250px' }}
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    Fechar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
