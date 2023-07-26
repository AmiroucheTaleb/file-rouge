import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectBox from "../../../components/Input/SelectBox";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewCar } from "../carSlice";
import axios from "axios";
import data from "../../../data/car-list.json";
const INITIAL_CAR_OBJ = {
  brand: "",
  model: "",
  year: "",
  fuelType: "",
  mileage: "",
};

function AddCarModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [carObj, setCarObj] = useState(INITIAL_CAR_OBJ);
  const handleOnChange = (e) => {
    setCarObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveNewCar = async () => {
    let newCarObj = {
      brand: carObj.brand,
      model: carObj.model,
      year: carObj.year,
      fuelType: carObj.fuelType,
      mileage: carObj.mileage,
    };
    try {
      await axios.post("http://localhost:3001/api/car", newCarObj, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        // refetch: true,
      });

      dispatch(showNotification({ message: "New car Added!", status: 1 }));
    } catch (error) {
      dispatch(showNotification({ message: "Can't add car!", status: 0 })); //error
      console.log(error);
    }

    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCarObj({ ...carObj, [updateType]: value });
  };

  return (
    <>
      <select
        className='mt-4 btn-outline'
        name='brand'
        value={carObj.brand}
        onChange={handleOnChange}
      >
        <option value={""} disabled>
          Select your brand
        </option>
        {data.map((d, i) => (
          <option key={i} value={d.brand}>
            {d.brand}
          </option>
        ))}
      </select>
      <select
        name='model'
        className='mt-4 btn-outline'
        disabled={carObj.brand == ""}
        value={carObj.model}
        onChange={handleOnChange}
      >
        <option value={""} disabled hidden>
          Select your model
        </option>
        {!!carObj.brand &&
          data
            .filter((d) => {
              return d.brand == carObj.brand;
            })[0]
            .models.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
      </select>

      <InputText
        type='number'
        defaultValue={carObj.mileage}
        onChange={handleOnChange}
        updateType='mileage'
        containerStyle='mt-4'
        labelTitle='mileage'
        updateFormValue={updateFormValue}
      />
      <select
        name='fuelType'
        className='mt-4 btn-outline'
        value={carObj.fuelType}
        onChange={handleOnChange}
      >
        <option value={""} disabled>
          Select fuel type
        </option>
        <option value={"essence"}>essence</option>
        <option value={"diesel"}>diesel</option>
      </select>

      <InputText
        type='number'
        defaultValue={carObj.year}
        onChange={handleOnChange}
        updateType='year'
        containerStyle='mt-4'
        labelTitle='year'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button className='btn btn-primary px-6' onClick={() => saveNewCar()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddCarModalBody;
