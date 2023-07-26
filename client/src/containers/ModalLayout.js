import { useEffect } from "react";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import AddVidangeModalBody from "../features/vidanges/components/AddVidangeModalBody";
import AddFuelModalBody from "../features/fuels/components/AddFuelModalBody";
import AddCarModalBody from "../features/dashboard/components/AddCarModalBody";
import AddNew from "../components/Input/AddNew";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title, refetch } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button className='btn btn-sm btn-circle absolute right-2 top-2' onClick={() => close()}>
            ✕
          </button>
          <h3 className='font-semibold text-2xl pb-6 text-center'>{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.FUEL_ADD_NEW]: (
                <AddFuelModalBody closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.VIDANGE_ADD_NEW]: (
                <AddVidangeModalBody closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.CAR_ADD_NEW]: (
                <AddCarModalBody closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody extraObject={extraObject} closeModal={close} />
              ),
              [MODAL_BODY_TYPES.TEST_MODAL]: (
                <AddNew closeModal={close} extraObject={extraObject} />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
