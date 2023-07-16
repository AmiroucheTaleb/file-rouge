import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
  mileage: "",
  date: "",
  cost: "",
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = () => {
    let newLeadObj = {
      id: 7,
      cost: leadObj.cost,
      mileage: leadObj.mileage,
      date: leadObj.date,
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    };
    dispatch(addNewLead({ newLeadObj }));
    dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type='number'
        defaultValue={leadObj.mileage}
        updateType='number'
        containerStyle='mt-4'
        labelTitle='mfeileage'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='date'
        defaultValue={leadObj.date}
        updateType='date'
        containerStyle='mt-4'
        labelTitle='date'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='number'
        defaultValue={leadObj.cost}
        updateType='number'
        containerStyle='mt-4'
        labelTitle='cost'
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass='mt-16'>{errorMessage}</ErrorText>
      <div className='modal-action'>
        <button className='btn btn-ghost' onClick={() => closeModal()}>
          Cancel
        </button>
        <button className='btn btn-primary px-6' onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
