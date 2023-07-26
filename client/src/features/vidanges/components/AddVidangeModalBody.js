import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewVidange } from "../vidangeSlice";
import axios from "axios";

const INITIAL_VIDANGE_OBJ = {
  car: "",
  mileage: "",
  date: "",
  oilType: "",
  notes: "",
  cost: "",
};

function AddVidangeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [vidangeObj, setVidangeObj] = useState(INITIAL_VIDANGE_OBJ);
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

  const saveNewVidange = async () => {
    let newVidangeObj = {
      car: vidangeObj.car,
      cost: vidangeObj.cost,
      oilType: vidangeObj.oilType,
      notes: vidangeObj.notes,
      mileage: vidangeObj.mileage,
      date: vidangeObj.date,
    };
    try {
      await axios.post("http://localhost:3001/api/vidanges", newVidangeObj, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
        // refetch: true,
      });

      dispatch(showNotification({ message: "New vidange Added!", status: 1 }));
      extraObject.refetch();
    } catch (error) {
      dispatch(showNotification({ message: "Can't add vidange!", status: 0 })); //error
      console.log(error);
    }

    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setVidangeObj({ ...vidangeObj, [updateType]: value });
  };

  return (
    <>
      <select
        value={vidangeObj.car}
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
        defaultValue={vidangeObj.mileage}
        updateType='mileage'
        containerStyle='mt-4'
        labelTitle='mileage'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='date'
        defaultValue={vidangeObj.date}
        updateType='date'
        containerStyle='mt-4'
        labelTitle='date'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='number'
        defaultValue={vidangeObj.cost}
        updateType='cost'
        containerStyle='mt-4'
        labelTitle='cost'
        updateFormValue={updateFormValue}
      />
      <InputText
        type='text'
        defaultValue={vidangeObj.oilType}
        updateType='oilType'
        containerStyle='mt-4'
        labelTitle='oilType'
        updateFormValue={updateFormValue}
      />
      <InputText
        type='text'
        defaultValue={vidangeObj.notes}
        updateType='notes'
        containerStyle='mt-4'
        labelTitle='notes'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button className='btn btn-primary px-6' onClick={() => saveNewVidange()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddVidangeModalBody;
