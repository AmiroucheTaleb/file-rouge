import { useState } from "react";
import data from "../../data/car-list.json";

function Car() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  return (
    <form>
      <select name='brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value={""} disabled hidden>
          Selet your brand
        </option>
        {data.map((d, i) => (
          <option key={i} value={d.brand}>
            {d.brand}
          </option>
        ))}
      </select>
      <select
        name='model'
        disabled={brand == ""}
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value={""} disabled hidden>
          Selet your model
        </option>
        {!!brand &&
          data
            .filter((d) => {
              return d.brand == brand;
            })[0]
            .models.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
      </select>
    </form>
  );
}

export default Car;
