import $ from "jquery";
import { useRef, useState } from "react";

export default function PriceAndQuantity({
  sizeName,
  isActive,
  productPrice,
  productQuantity,
  setProductQuantity,
  setProductPrice,
}) {
  const inputPrice = useRef(null);
  const inputQuantity = useRef(null);

  const [inputPriceValue, setInputPriceValue] = useState("");
  const [inputQuantityValue, setInputQuantityValue] = useState("");

  function availbleInputs(isChecked) {
    if (isChecked) {
      inputPrice.current.removeAttribute("disabled");
      inputQuantity.current.removeAttribute("disabled");

      return;
    }

    if (!isChecked) {
      inputPrice.current.setAttribute("disabled", "");
      inputQuantity.current.setAttribute("disabled", "");

      setInputPriceValue("");
      setInputQuantityValue("");

      return;
    }
  }

  return (
    <div className="form-check col-12 p-0 form-check-inline">
      <input
        type="checkbox"
        className="mr-2"
        name={sizeName}
        value={sizeName}
        onChange={(e) => availbleInputs(e.target.checked)}
      />
      <label>{sizeName}</label>

      <div className="col-12 row mb-4 mt-0 m-0">
        <div className="col-6 p-0">
          <label className="form-label">
            Preço <span>( em R$ )</span>
          </label>
          <input
            type="number"
            disabled
            ref={inputPrice}
            className="form-control pl-2 p-0 priceInput"
            id="price1"
            value={inputPriceValue}
            onChange={(e) => {
              setProductPrice(e.target.value);
              setInputPriceValue(e.target.value);
            }}
            data-name={sizeName}
          />
        </div>
        <div className="col-6 p-0 pl-2">
          <label className="form-label">Quantidade</label>
          <input
            type="number"
            disabled
            ref={inputQuantity}
            className="form-control pl-2 p-0"
            id="quantity1"
            value={inputQuantityValue}
            onChange={(e) => {
              setProductQuantity(e.target.value);
              setInputQuantityValue(e.target.value);
            }}
            data-name={sizeName}
          />
        </div>
      </div>
    </div>
  );
}
