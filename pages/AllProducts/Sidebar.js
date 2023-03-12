
import { useRouter } from "next/router";
export default function Sidebar({ setCategorySelected, categorySelected, setSubCategorySelected, category, initialid, setProcura }) {
  const router = useRouter();
  
  return (
    <div className="col-lg-3">
      <ul className="ec-cat-tab-nav nav">
        <li
          onClick={() => {
            router.replace("/AllProducts", undefined, { shallow: true })
            setProcura("");
            setCategorySelected("Todos os Produtos")
          }}
          className="cat-item mt-2"
        >
          <a className="cat-link" data-bs-toggle="tab" href="#tab-cat-1">
            <div className="cat-desc">
              <span>Todos os Produtos</span>
            </div>
          </a>
        </li>

        {category?.map((item) => {
          if (item._id === initialid) {
            return (
              <li
                key={item._id}
                onClick={() => {
                  router.replace("/AllProducts", undefined, { shallow: true })
                  setProcura("");
                  setCategorySelected(item._id)
                  setSubCategorySelected('')
                }}
                className="cat-item mt-2"
              >
                <a className="cat-link active" data-bs-toggle="tab" href="#tab-cat-1">
                  <div className="cat-desc">
                    <span>{item.name}</span>
                  </div>
                </a>
              </li>
            );
          } else {
            return (
              <li
                key={item._id}
                onClick={() => {
                  router.replace("/AllProducts", undefined, { shallow: true })
                  setProcura("");
                  setCategorySelected(item._id)
                  setSubCategorySelected('')
                }}
                className="cat-item mt-2"
              >
                <a className="cat-link" data-bs-toggle="tab" href="#tab-cat-1">
                  <div className="cat-desc">
                    <span>{item.name}</span>
                  </div>
                </a>
              </li>
            );
          }

        })}
      </ul>

    </div>

  );
}
