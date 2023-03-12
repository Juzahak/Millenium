import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import useSwr, { mutate } from "swr";
import { useRouter } from "next/router";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllProducts() {
  const [categorySelected, setCategorySelected] = useState("");
  const [subCategorySelected, setSubCategorySelected] = useState();
  const [procura, setProcura] = useState("");

  const { data: products } = useSwr(`/api/products/getAllProducts`, fetcher);
  const { data: category } = useSwr(`/api/category/getAllCategory`, fetcher);
  const { data: subCategory } = useSwr(`/api/subcategory/getAllSubCategory`, fetcher);

  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    setCategorySelected(id)
  }, [])

  return (
    <>
      <Header />
    
      <section className="sec-cbb el-prod section-space-p">
        <div className="container">
          <div className="col-12 row pt-5 m-0 mob-footerLinks">
            <Sidebar
              setCategorySelected={setCategorySelected}
              setSubCategorySelected={setSubCategorySelected}
              categorySelected={categorySelected}
              category={category}
              initialid={categorySelected}
              procura={procura}
              setProcura={setProcura}
            />
            <div className="col-lg-9 col-12 row">
              <TopBar categorySelected={categorySelected} setSubCategorySelected={setSubCategorySelected} subCategory={subCategory} initialid={categorySelected}/>

              <ProductList 
              categorySelected={categorySelected} 
              setCategorySelected={setCategorySelected}
              subCategorySelected={subCategorySelected}
              setSubCategorySelected={setSubCategorySelected} 
              products={products} 
              initialid={categorySelected}
              procura={procura}
              setProcura={setProcura}/>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
