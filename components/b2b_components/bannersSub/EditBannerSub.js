import axios from "axios";
import router from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';

export default function EditBanner({ bannerSubEditId, bannersSub, setShowEditCategoryComponent }) {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerText, setBannerText] = useState("");
  const [bannerBtnText, setBannerBtnText] = useState("");
  const [bannerBtnLink, setBannerBtnLink] = useState("");
  const [bannerImage, setBannerImage] = useState();
  const [bannerActive, setBannerActive] = useState();
  const [imageInput, setImage] = useState([]);
  const [imageInputNew, setImageNew] = useState([]);
  const [id_, setId_] = useState(0);

  const [imageFile, setImageFile] = useState([]);
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  useEffect(() => {
    console.log(bannerSubEditId, bannersSub)
    bannersSub?.map(item => {
      if (item._id === bannerSubEditId) {
        setBannerTitle(item.title);
        setBannerText(item.text);
        setBannerBtnText(item.btnText);
        setBannerBtnLink(item.btnLink);
        setImage(JSON.parse(item.image));
        setBannerActive(item.active);
        setId_(item._id)
      }
    })
  }, [bannerSubEditId]);

  function changeImageSrc(files) {
    const reader = new FileReader();

    setImageNew([
      {
        image: files,
        path: Math.floor(Math.random() * (1000000000 + 10)),
      },
    ]);

    reader.onload = function () {
      setBannerImage(reader.result);
    };

    reader.readAsDataURL(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let imageArr = [];

    if (imageInputNew.length > 0) {
      imageInput.forEach(item => {
        const desertRef = ref(storage, `bannerSecundario/${item.path}`);

        deleteObject(desertRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      })
    }
    if (imageInputNew.length > 0) {
      imageInputNew.forEach(async item => {
        if (item.image) {
          const name = item.path;
          const storageRef = ref(storage, `bannerSecundario/${name}`)
          const uploadTask = uploadBytesResumable(storageRef, item.image)
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setProgressUpload(progress) // to show progress upload
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
                const obj = [{ url: url, path: name }];
                imageArr = obj;
              })
            },
          )
        } else {
          alert('File not found')
        }

        contador++

        toast('Aguarde Banner sendo editado!', {
          position: "top-right",
        });

        setTimeout(async () => {
          if (imageInput.length === contador) {
            contador = 0;
            let data = await axios.put(`/api/subBanners/updateSubBanner?id=${id_}`, {
              title: bannerTitle,
              text: bannerText,
              btnText: bannerBtnText,
              btnLink: bannerBtnLink,
              image: JSON.stringify(imageArr),
              active: bannerActive,
            });
            mutate(`/api/subBanners/getAllSubBanner`);
            router.push("/b2b/subBanners");
          }
        }, 5000)
      })
    } else {
      toast('Aguarde Banner sendo editado!', {
        position: "top-right",
      });

      setTimeout(async () => {
        let data = await axios.put(`/api/subBanners/updateSubBanner?id=${id_}`, {
          title: bannerTitle,
          text: bannerText,
          btnText: bannerBtnText,
          btnLink: bannerBtnLink,
          image: JSON.stringify(imageInput),
          active: bannerActive,
        });
        mutate(`/api/subBanners/getAllSubBanner`);
        router.push("/b2b/subBanners");
      }, 5000)
    }
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
              Titulo
            </label>
            <div className="col-12">
              <input
                id="text"
                name="text"
                defaultValue={bannerTitle}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerTitle(e.target.value)}
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
                defaultValue={bannerText}
                className="form-control here slug-title p-0"
                style={{ borderRadius: '0px' }}
                rows="5"
                onChange={(e) => setBannerText(e.target.value)}
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
                defaultValue={bannerBtnText}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerBtnText(e.target.value)}
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
                defaultValue={bannerBtnLink}
                className="form-control here slug-title p-0"
                type="text"
                onChange={(e) => setBannerBtnLink(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-12 col-form-label">
              Imagem
            </label>

            <div style={{ height: '60px', display: 'flex' }}>
              {imageInput?.map((item, index) => {
                return (
                  <Image
                    key={index}
                    className="ec-brand-icon"
                    style={{ minWidth: "300px", objectFit: 'cover' }}
                    src={bannerImage || item.url}
                    alt=""
                    width={150}
                    height={150}
                  />)
              })}
            </div>

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
            {bannerActive === 1 ?
              <>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
                    value={1}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setBannerActive(e.target.value)}
                  />
                  Sim
                </div>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    value={0}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setBannerActive(e.target.value)}
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
                    value={1}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setBannerActive(e.target.value)}
                  />
                  Sim
                </div>
                <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                  <input
                    type="radio"
                    name="active"
                    defaultChecked
                    value={0}
                    style={{ width: '20px', margin: '0 15px 0 0' }}
                    onChange={(e) => setBannerActive(e.target.value)}
                  />
                  Não
                </div>
              </>
            }

          </div>

          <div className="row">
            <div className="col-12">
              <button name="submit" type="submit" className="btn btn-primary">
                Editar Banner
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
