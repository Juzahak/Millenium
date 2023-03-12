export default function ColorsSelector() {
  return (
    <div className="col-12 row flex-wrap justify-content-between">
      <label className="form-label">Cores</label>
      <input
        type="color"
        className="form-control form-control-color"
        id="exampleColorInput1"
        value="#ff6191"
        title="Choose your color"
      />
      <input
        type="color"
        className="form-control form-control-color"
        id="exampleColorInput2"
        value="#33317d"
        title="Choose your color"
      />
      <input
        type="color"
        className="form-control form-control-color"
        id="exampleColorInput3"
        value="#56d4b7"
        title="Choose your color"
      />
      <input
        type="color"
        className="form-control form-control-color"
        id="exampleColorInput4"
        value="#009688"
        title="Choose your color"
      />
    </div>
  );
}
