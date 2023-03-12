export default function TopBar({ categorySelected, setSubCategorySelected, subCategory, initialid }) {

  return (
    <>
      {categorySelected !== "" && (
        <div className="col-12 row p-3 justify-content-center" style={{ minHeight: "66px" }}>
          {subCategory?.map((item) => {
            if (categorySelected === item.main_category || item.main_category === initialid) {
              return (
                <span
                  key={item._id}
                  className="col-auto px-4 py-2 sub-category-btn mt-2 cat-link"
                  onClick={() => setSubCategorySelected(item._id)}
                >
                  {item.name}
                </span>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
