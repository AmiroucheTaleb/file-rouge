import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_CLOSE_TYPES,
} from "../../../utils/globalConstantUtil";

import { showNotification } from "../headerSlice";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index, refetch } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.FUEL_DELETE) {
      // positive response, call api or dispatch redux function
      // dispatch(deleteLead({index}))
      try {
        await axios.delete(`http://localhost:3001/api/fuel/${index}`, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        refetch();
        dispatch(showNotification({ message: "Fuel Deleted!", status: 1 }));
      } catch (error) {
        dispatch(showNotification({ message: "couldnt delete Fuel!", status: 0 }));
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=' text-xl mt-8 text-center'>{message}</p>

      <div className='modal-action mt-12'>
        <button className='btn btn-outline   ' onClick={() => closeModal()}>
          Cancel
        </button>

        <button className='btn btn-primary w-36' onClick={() => proceedWithYes()}>
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
