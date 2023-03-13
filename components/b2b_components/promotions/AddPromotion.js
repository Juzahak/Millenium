import { useState } from "react";
import axios from "axios";
import useSwr, { mutate } from "swr";
import router from 'next/router'
import { toast } from "react-toastify";
import Image from 'next/image'
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';

export default function AddPromotion() {
  const [promotionsTitle, setPromotionTitle] = useState("");
  const [promotionsText, setPromotionText] = useState("");
  const [promotionsLink, setPromotionLink] = useState("");
  const [promotionsButton, setPromotionButton] = useState("");
  const [promotions, setPromotion] = useState("");
  const [imageInput, setImage] = useState([]);
  const [promotionsIsActive, setActive] = useState(1);

  const [imageFile, setImageFile] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let imageArr = [];
    imageInput.forEach(async item => {
      if (item.image) {
       const name = item.path;
       const storageRef = ref(storage, `bannerPromocoes/${name}`);
       const uploadTask = uploadBytesResumable(storageRef, item.image);
       uploadTask.on(
         'state_changed',
         (snapshot) => {
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
 
           setProgressUpload(progress)
         },
         (error) => {
           alert(error.message)
         },
 
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
             //url is download url of file
             setDownloadURL((current) => [
               ...current,
               {
                 url: url,
                 path: name,
               },
             ]);
             const obj = [{url: url, path: name}];
             imageArr = obj;
           })
         },
         )
       } else {
         alert('File not found')
       }
       
       contador++

       toast('Promoção adiconada com sucesso!', {
        position: "top-right",
        });

       setTimeout(async () => {
       if(imageInput.length === contador) {
         contador = 0;
       let data = await axios.post(`/api/promotions/insertPromotions`, {
        title: promotionsTitle,
        text: promotionsText,
        btnText: promotionsButton,
        btnLink: promotionsLink,
        image: JSON.stringify(imageArr),
        active: promotionsIsActive,
       });
       mutate(`/api/promotions/getAllPromotions`);
       router.push("/b2b/promotions");
     }
     }, 5000)
 })
  };

  function changeImageSrc(files) {
    const reader = new FileReader();
    setImage([
      {
        image: files,
        path: Math.floor(Math.random() * (1000000000 + 10)),
      },
    ]);

    reader.onload = function () {
      setPromotion(reader.result);
    };

    reader.readAsDataURL(files);
  };
  
  return (
    <div className="card-body">
      <div className="ec-cat-form">
        <h4>Adicionar Promoção</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Titulo
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Texto
            </label>
            <div className="col-12">
              <textarea
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                style={{borderRadius: '0px'}}
                rows="5"
                onChange={(e) => setPromotionText(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Escrita Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionButton(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="text" className="col-12 col-form-label">
              Link Botão
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setPromotionLink(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Imagem
            </label>
            <div style={{ height: '60px', display: 'flex' }}>
              <Image
                className="ec-brand-icon"
                style={{ minWidth: "300px", objectFit: 'cover' }}
                src={promotions || require('../../../assets/img/b2b/noimg.jpg')}
                alt=""
                width={150}
                height={150}
              /></div>
            <div className="col-12">
              <input
                id="color"
                name="color"
                className="form-control here slug-title p-0"
                style={{ paddingLeft: '10px !important', height: '30px' }}
                type="file"
                onChange={(e) => changeImageSrc(e.target.files[0])}
              />
            </div>
          </div>

          <div className="row align-items-center">
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
              <button name="submit" type="submit" className="btn btn-primary mt-4">
                Adicionar Promoção
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
