import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewFuel } from "../fuelSlice";
import axios from "axios";

const INITIAL_FUEL_OBJ = {
  car: "",
  mileage: "",
  date: "",
  cost: "",
};

function AddLeadModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fuelObj, setFuelObj] = useState(INITIAL_FUEL_OBJ);
  const [carOptions, setCarOptions] = useState([]);

  // Effect pour charger les voitures de l'utilisateur
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Appel API pour récupérer les voitures de l'utilisateur
        const response = await axios.get("http://localhost:3001/api/car", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        const data = response.data;

        // Mettre à jour les options du select avec les voitures
        setCarOptions(data);
      } catch (error) {
        console.log("Erreur lors de la récupération des voitures de l'utilisateur :", error);
      }
    };

    fetchCars();
  }, []);

  const saveNewFuel = async () => {
    let newFuelObj = {
      car: fuelObj.car,
      cost: fuelObj.cost,
      mileage: fuelObj.mileage,
      date: fuelObj.date,
    };
    try {
      await axios.post("http://localhost:3001/api/fuel", newFuelObj, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        // refetch: true,
      });

      dispatch(showNotification({ message: "New Fuel Added!", status: 1 }));
      extraObject.refetch();
    } catch (error) {
      dispatch(showNotification({ message: "Can't add Fuel!", status: 0 })); //error
      console.log(error);
    }

    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setFuelObj({ ...fuelObj, [updateType]: value });
  };

  return (
    <>
      <select
        value={fuelObj.car}
        onChange={(e) => updateFormValue({ updateType: "car", value: e.target.value })}
        className='mt-4 btn-outline'
      >
        <option value=''>Sélectionner une voiture</option>
        {carOptions.map((car) => (
          <option key={car._id} value={car._id}>
            {car.model}
          </option>
        ))}
      </select>
      <InputText
        type='number'
        defaultValue={fuelObj.mileage}
        updateType='mileage'
        containerStyle='mt-4'
        labelTitle='mileage'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='date'
        defaultValue={fuelObj.date}
        updateType='date'
        containerStyle='mt-4'
        labelTitle='date'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='number'
        defaultValue={fuelObj.cost}
        updateType='cost'
        containerStyle='mt-4'
        labelTitle='cost'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button className='btn btn-primary px-6' onClick={() => saveNewFuel()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
