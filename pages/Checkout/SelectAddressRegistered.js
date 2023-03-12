import InputMask from "react-input-mask";

export default function SelectAddressRegistered({ setCheckoutFormType }) {

  return (
    <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
      <div className="ec-checkout-content">
        <div className="ec-checkout-inner">
          <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
            <div className="ec-checkout-block ec-check-bill">
              <div className="ec-bl-block-content">
                <div className="ec-check-bill-form">
                  <div className="col-12 p-5" style={{ border: "1px solid #f1f1f1", borderRadius: "10px" }}>
                    <h4 className="" style={{ color: "inherit" }}>Endereço 1</h4>
                    <span className="pt-3 d-block">Avenida Santos Pinto</span>
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
