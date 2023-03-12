import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Link from 'next/link';
import Image from 'next/image';
import router from 'next/router';
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'

import Menu from "../../components/b2b_components/Menu";
import axios from "axios";

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());


import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase';

export default function EditProduct() {
  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);
  const { data: category } = useSwr(`/api/category/getAllCategory`, fetcher);
  const { data: subcategory } = useSwr(`/api/subcategory/getAllSubCategory`, fetcher);
  const { data: colors } = useSwr(`/api/colors/getAllColor`, fetcher);
  const { data: product_sizes } = useSwr(`/api/product_sizes/getAllSizes`, fetcher);

  const [productSize, setProductSize] = useState("");
  const [productSizes, setProductSizes] = useState([]);

  const [imagem, setImagem] = useState([]);
  const [imagemDelete, setImagemDelete] = useState([]);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState([]);

  const [downloadURL, setDownloadURL] = useState('');
  const [progressUpload, setProgressUpload] = useState(0);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productsubCategory, setsubProductCategory] = useState([]);
  const [fullProductDescription, setFullProductDescription] = useState("");
  const [shortProductDescription, setShortProductDescription] = useState("");

  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productColor, setProductColor] = useState("");

  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [peso, setPeso] = useState("");

  const [featured, setFeatured] = useState("");
  const [active, setActive] = useState("");

  const [imagePreview, setImagePreview] = useState(
    require("../../assets/img/b2b/default.png")
  );

  let arrSizes = JSON.stringify(productSizes);

  const imageInput = useRef();
  const miniImagePreview = useRef();

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    setProductSizes([]);
    setsubProductCategory([]);
    setImageToUpload([]);


    products?.forEach(item => {
      if (item._id === id) {
        JSON.parse(item.price).forEach((item2, index) => {
          setProductSizes((current) => [
            ...current,
            {
              id: Math.floor((1 + Math.random()) * 0x10000),
              size: item2.size,
              color: item2.color,
              price: item2.price,
              quantity: item2.quantity,
            },
          ]);
        })


        setsubProductCategory(item.subcategory);
        setProductName(item.name);
        setProductCategory(item.category);
        setShortProductDescription(item.short_description);
        setFullProductDescription(item.full_description);
        setLargura(item.largura)
        setAltura(item.altura)
        setComprimento(item.comprimento)
        setPeso(item.peso)
        setFeatured(item.featured)
        setActive(item.active)
        setImagem(JSON.parse(item.image));

      }
    })

  }, []);

  function saveSize() {
    setProductSizes((current) => [
      ...current,
      {
        id: Math.floor((1 + Math.random()) * 0x10000),
        size: productSize,
        color: productColor,
        price: productPrice,
        quantity: productQuantity,
      },
    ]);
  };

  const savesubcategories = (e) => {
    setsubProductCategory(e)
  };

  function deleteSize(id) {
    setProductSizes(
      productSizes.filter(a =>
        a.id !== id
      ));
  };

  function changeImageSrc(files) {
    const reader = new FileReader();

    reader.onload = function () {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let contador = 0;
    let contadorToast = 0;
    let imageArr = imagem;

    if (imagemDelete.length > 0) {
      imagemDelete.forEach(item => {
        const desertRef = ref(storage, `productImages/${item.delete.path}`);

        deleteObject(desertRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      })
    }

    imagem.forEach(async item => {
      if (item.blobs !== undefined) {
        if (item.image) {
          const name = item.path;
          const storageRef = ref(storage, `productImages/${name}`);
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

                const obj = [{ url: url, path: name }];
                imageArr = [...imageArr, ...obj];
              })
            },
          )
        } else {
          alert('File not found')
        }
        contador++

        if (contadorToast === 0) {
          contadorToast++
          toast('Aguarde produto sendo editado!', {
            position: "top-right",
          });
        }

        setTimeout(async () => {
          let filteredArr = imageArr.filter(a => a.url !== undefined);
          contador = 0;
          let data = await axios.put(`/api/products/updateProducts?id=${id}`, {
            name: productName,
            category: productCategory,
            subcategory: productsubCategory,
            full_description: fullProductDescription,
            short_description: shortProductDescription,
            price: arrSizes,
            image: JSON.stringify(filteredArr),
            largura: largura,
            altura: altura,
            comprimento: comprimento,
            peso: peso,
            featured: featured,
            active: active,
          });
          if (data.data) router.push("/b2b/ProductsList");
        }, 5000)
      } else {
        contador++
        {
          if (contador === imagem.length) {
            contador = 0;

            if (contadorToast === 0) {
              contadorToast++
              toast('Aguarde produto sendo editado!', {
                position: "top-right",
              });
            }

            let data = await axios.put(`/api/products/updateProducts?id=${id}`, {
              name: productName,
              category: productCategory,
              subcategory: productsubCategory,
              full_description: fullProductDescription,
              short_description: shortProductDescription,
              price: arrSizes,
              image: JSON.stringify(imagem),
              largura: largura,
              altura: altura,
              comprimento: comprimento,
              peso: peso,
              featured: featured,
              active: active,
            });
            if (data.data) router.push("/b2b/ProductsList");
          }
        }
      }
    })
  };

  const customImgLoader = ({ src }) => {
    return `${src}`;
  };

  const deleteImage = (e, imagem2) => {
    e.preventDefault();

    imagem.forEach(async item => {
      if (item.url === imagem2) {
        setImagemDelete((current) => [
          ...current,
          {
            delete: item
          },
        ]);
        setImagem(
          imagem.filter(a =>
            a.url !== imagem2
          ));
      }
    })
  };
  function saveImage(e) {
    e.preventDefault();
    if (imagem.length >= 5) {
      return alert('maximo de cinco imagens');
    } else {
      setImagem((current) => [
        ...current,
        {
          image: imagesUploaded,
          path: Math.floor(Math.random() * (1000000000 + 10)),
          blobs: imagePreview,
        },
      ]);

    }
  };

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div style={{ display: 'flex' }}>
        <Menu />
        <div className="ec-page-wrapper">
          <div className="ec-content-wrapper">
            <div className="content">
              <div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
                <div>
                  <h1>Editar Produto</h1>
                  <p className="breadcrumbs">
                    <span>
                      <Link href="/b2b">Dashboard</Link>
                    </span>
                    <span>
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                    Editar Produto
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card card-default">
                    <div className="card-body">
                      <div className="row ec-vendor-uploads">
                        <div className="col-lg-8">
                          <div className="ec-vendor-upload-detail">
                            <form
                              onSubmit={onSubmit}
                              className="row g-3"
                              encType="multipart/form-data"
                            >
                              {products?.map((item, index) => {
                                if (item._id === id) {
                                  return (
                                    <>
                                      <div className="col-md-12" key={index}>
                                        <label htmlFor="inputEmail4" className="form-label">
                                          Nome do Produto
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control slug-title"
                                          id="inputEmail4"
                                          defaultValue={item.name}
                                          onChange={(e) => setProductName(e.target.value)}
                                        />
                                      </div>
                                      <div className="col-md-12">
                                        <label className="form-label">Selecionar Categoria</label>
                                        <select
                                          name="categories"
                                          defaultValue={item.category}
                                          onChange={(e) => setProductCategory(e.target.value)}
                                          id="Categories"
                                          className="form-select"
                                        >
                                          {console.log(item.category)}
                                          <option value="">
                                            {category?.map((item2, index) => { if (item2._id === item.category) { return (item2.name) } })}
                                          </option>
                                          {category?.map((mainCategory, index) => {
                                            return (
                                              <option key={index} value={mainCategory?._id}>
                                                {mainCategory?.name}
                                              </option>)
                                          })};
                                        </select>
                                      </div>

                                      <div className="col-md-12 mb-3">
                                        <label className="form-label">Selecionar subCategoria</label>
                                        <div className="checkboxinputs">
                                          {subcategory?.map((subCategory, index) => {
                                            if (subCategory.main_category == productCategory) {
                                              return (
                                                <div className="row align-items-center" key={index}>
                                                  <div className="col-auto d-flex" style={{ height: '50px' }}>
                                                    {subCategory._id === item.subcategory ?
                                                      <input
                                                        type="radio"
                                                        name="subcategory"
                                                        defaultChecked
                                                        value={subCategory?._id}
                                                        style={{ width: '20px' }}
                                                        onChange={(e) => savesubcategories(e.target.value)}
                                                      />
                                                      :
                                                      <input
                                                        type="radio"
                                                        name="subcategory"
                                                        value={subCategory?._id}
                                                        style={{ width: '20px' }}
                                                        onChange={(e) => savesubcategories(e.target.value)}
                                                      />
                                                    }
                                                  </div>
                                                  {subCategory?.name}
                                                </div>)
                                            }
                                          })}
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <label className="form-label">Largura</label>
                                        <input
                                          type="text"
                                          className="form-control slug-title col-md-3"
                                          id="largura"
                                          defaultValue={item.largura}
                                          onChange={(e) => setLargura(e.target.value)}
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label className="form-label">Altura</label>
                                        <input
                                          type="text"
                                          className="form-control slug-title col-md-3"
                                          id="altura"
                                          defaultValue={item.altura}
                                          onChange={(e) => setAltura(e.target.value)}
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label className="form-label">Comprimento</label>
                                        <input
                                          type="text"
                                          className="form-control slug-title col-md-3"
                                          id="comprimento"
                                          defaultValue={item.comprimento}
                                          onChange={(e) => setComprimento(e.target.value)}
                                        />
                                      </div>
                                      <div className="col-md-3">
                                        <label className="form-label">Peso</label>
                                        <input
                                          type="text"
                                          className="form-control slug-title col-md-3"
                                          id="peso"
                                          defaultValue={item.peso}
                                          onChange={(e) => setPeso(e.target.value)}
                                        />
                                      </div>


                                      <div className="col-md-12">
                                        <label className="form-label">Breve Descrição</label>
                                        <textarea
                                          className="form-control"
                                          defaultValue={item.short_description}
                                          onChange={(e) => setShortProductDescription(e.target.value)}
                                          rows="2"
                                        ></textarea>
                                      </div>

                                      <div className="col-md-12">
                                        <label className="form-label">Descrição Completa</label>
                                        <textarea
                                          className="form-control"
                                          defaultValue={item.full_description}
                                          onChange={(e) => setFullProductDescription(e.target.value)}
                                          rows="4"
                                        ></textarea>
                                      </div>

                                      <div className="d-flex mb-3">
                                        <div className="row align-items-center">
                                          <label className="form-label">Ativado</label>
                                          <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                            {item.active === '1' ?
                                              <input
                                                type="radio"
                                                name="active"
                                                defaultChecked
                                                value={'1'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setActive(e.target.value)}
                                              />
                                              :
                                              <input
                                                type="radio"
                                                name="active"
                                                value={'1'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setActive(e.target.value)}
                                              />
                                            }
                                            Sim
                                          </div>
                                          <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                            {item.active === '0' ?
                                              <input
                                                type="radio"
                                                name="active"
                                                defaultChecked
                                                value={'0'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setActive(e.target.value)}
                                              />
                                              :
                                              <input
                                                type="radio"
                                                name="active"
                                                value={'0'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setActive(e.target.value)}
                                              />
                                            }Não
                                          </div>
                                        </div>

                                        <div className="row align-items-center">
                                          <label className="form-label">Destaque</label>
                                          <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                            {item.featured === '1' ?
                                              <input
                                                type="radio"
                                                name="featured"
                                                defaultChecked
                                                value={'1'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setFeatured(e.target.value)}
                                              />
                                              :
                                              <input
                                                type="radio"
                                                name="featured"
                                                value={'1'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setFeatured(e.target.value)}
                                              />
                                            }
                                            Sim
                                          </div>
                                          <div className="col-auto d-flex align-items-center" style={{ height: '50px' }}>
                                            {item.featured === '0' ?
                                              <input
                                                type="radio"
                                                name="featured"
                                                defaultChecked
                                                value={'0'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setFeatured(e.target.value)}
                                              />
                                              :
                                              <input
                                                type="radio"
                                                name="featured"
                                                value={'0'}
                                                style={{ width: '20px', margin: '0 15px 0 0' }}
                                                onChange={(e) => setFeatured(e.target.value)}
                                              />
                                            }
                                            Não
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )
                                }
                              })}


                              <div className="col-lg-12">
                                <div className="ec-vendor-img-upload">
                                  <div className="ec-vendor-main-img">
                                    <div className="avatar-upload">
                                      <div className="avatar-edit">
                                        <input
                                          type="file"
                                          id="imageUpload"
                                          className="ec-image-upload"
                                          accept="image/*"
                                          name="imagesUploaded"
                                          ref={imageInput}
                                          onChange={(e) => {
                                            setImagesUploaded(e.target.files[0]);
                                            changeImageSrc(e.target.files[0]);
                                          }}
                                        />
                                        <label htmlFor="imageUpload">
                                          <FaEdit size={20} />
                                        </label>
                                      </div>

                                      <div className="avatar-preview ec-preview">
                                        <div
                                          className="imagePreview ec-div-preview"
                                          style={{ height: "400px" }}
                                        >
                                          <Image
                                            className="ec-image-preview"
                                            src={imagePreview}
                                            alt="edit"
                                            width={150}
                                            height={150}
                                            style={{ maxHeight: "400px" }}
                                          />
                                        </div>
                                      </div>

                                      <div className="avatar-edit save-image">
                                        <button
                                          onClick={(e) => saveImage(e)}
                                          className="save-image-button btn btn-primary"
                                        >
                                          <FaCheck
                                            size={20}
                                            color={"#FFF"}
                                            className="ec-image-upload"
                                          />
                                        </button>
                                      </div>

                                      <div className="thumb-upload-set colo-md-12">
                                        {products?.map((item, index) => {
                                          if (item._id === id) {
                                            return (
                                              <div key={index}>
                                                {imagem?.map((item2, index) => {
                                                  if (item2.image === '') {
                                                    return;
                                                  } else {

                                                    return (
                                                      <div
                                                        key={index}
                                                        className="thumb-upload"
                                                      >

                                                        <div className="thumb-edit">
                                                          <button
                                                            onClick={(e) => deleteImage(e, item2.url)}
                                                            className="save-image-button btn p-2"
                                                          >
                                                            <FaTrash
                                                              size={20}
                                                              color={"#CC0000"}
                                                              className="ec-image-upload"
                                                            />
                                                          </button>
                                                        </div>
                                                        <div className="thumb-preview ec-preview">
                                                          <div className="image-thumb-preview">
                                                            <Image
                                                              loader={customImgLoader}
                                                              className="image-thumb-preview ec-image-preview"
                                                              src={item2.url || item2.blobs}
                                                              alt="Product Image"
                                                              width={500}
                                                              height={500}
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>)
                                                  }
                                                })}
                                              </div>
                                            );
                                          }
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  name="submit"
                                >
                                  Editar Produto
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="col-12 row mt-5">

                            <div className="form-checkbox-box">
                              <div className="d-flex">
                                <div className="col-6 mr-1">
                                  <label className="form-label">Tamanhos</label>
                                  <select
                                    name="categories"
                                    onChange={(e) => setProductSize(e.target.value)}
                                    id="Categories"
                                    className="form-select"
                                  >
                                    <option value="">
                                      Escolha um Tamanho
                                    </option>
                                    {product_sizes?.map((sizes) => {
                                      return (
                                        <option key={sizes._id} value={sizes?._id}>
                                          {sizes.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className="col-6 ml-1">
                                  <label className="form-label">Cores</label>
                                  <select
                                    name="colors"
                                    onChange={(e) => setProductColor(e.target.value)}
                                    id="colors"
                                    className="form-select col-12"
                                  >
                                    <option value="">
                                      Escolha uma cor
                                    </option>
                                    {colors?.map((colors) => {
                                      return (
                                        <option key={colors._id} value={colors?._id}>
                                          {colors.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>

                              <div className="d-flex mt-3">
                                <div className="col-md-6 mr-1">
                                  <label htmlFor="inputEmail4" className="form-label">
                                    Valor
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control slug-title"
                                    onChange={(e) => setProductPrice(e.target.value)}
                                  />
                                </div>

                                <div className="col-md-6 ml-1">
                                  <label htmlFor="inputEmail4" className="form-label">
                                    Estoque
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control slug-title"
                                    onChange={(e) => setProductQuantity(e.target.value)}
                                  />
                                </div>
                              </div>

                              <button onClick={saveSize} className="btn btn-primary mt-3 w-100">
                                Adicionar Tamanho
                              </button>

                              <div>

                                {productSizes?.map((item, index) => {
                                  var colorName = "";
                                  var colorId = item.color;
                                  colors?.map((item2) => { if (item2._id === colorId) { colorName = item2.name } })

                                  var sizeName = "";
                                  var sizeId = item.size;
                                  product_sizes?.map((item2) => { if (item2._id === sizeId) { sizeName = item2.name } })

                                  return (
                                    <label key={index} className="m-0 sizeBox mt-2">
                                      Tamanho: {sizeName} <br/>
                                      Cor: {colorName} <br/>
                                      Estoque: {item.quantity}  <br/>
                                      Valor: {item.price} 
                                      <div className="thumb-edit">
                                        <button
                                          onClick={() => deleteSize(item.id)}
                                          className="ml-4 save-image-button btn p-2"
                                        >
                                          <FaTrash
                                            size={20}
                                            color={"#CC0000"}
                                            className="ec-image-upload"
                                          />
                                        </button>
                                      </div>
                                    </label>
                                  )
                                })}

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";

  if (myCookie.access_token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/b2b/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};