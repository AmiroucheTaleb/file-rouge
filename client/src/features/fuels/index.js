import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";

import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TopSideButtons = ({ refetch }) => {
  const dispatch = useDispatch();

  const openAddNewFuelModal = () => {
    dispatch(
      openModal({
        title: "ajouter une depense carburant",
        bodyType: MODAL_BODY_TYPES.FUEL_ADD_NEW,
        extraObject: {
          refetch,
        },
      })
    );
  };

  return (
    <div className='inline-block float-right'>
      <button
        className='btn px-6 btn-sm normal-case btn-primary'
        onClick={() => openAddNewFuelModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Fuels() {
  const dispatch = useDispatch();

  const [car, setCar] = useState("");
  const { data, isLoading, refetch } = useQuery([car], async () => {
    const response = await axios.get(`http://localhost:3001/api/fuel/user?userCar=${car}`, {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    });
    return response.data;
  });

  const {
    data: userCars,
    isLoading: carsisLoading,
    refetch: refetchCars,
  } = useQuery(["userCars"], async () => {
    const response = await axios.get("http://localhost:3001/api/car", {
      headers: {
        Authorization: "Bearer " + localStorage.token,
      },
    });

    return response.data;
  });

  const deleteCurrentFuel = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this fuel?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.FUEL_DELETE,
          index,
          refetch,
        },
      })
    );
  };

  return (
    <>
      <div className='tabs tabs-boxed'>
        <button
          className={`tab-md tab ${"" === car ? "tab-active" : ""} `}
          onClick={() => setCar("")}
        >
          Toute les voitures
        </button>

        {userCars?.map((userCar) => {
          return (
            <button
              className={`tab-md tab ${userCar._id === car ? "tab-active" : ""} `}
              key={userCar._id}
              onClick={() => setCar(userCar._id)}
            >
              {userCar.model.toUpperCase()}
            </button>
          );
        })}
      </div>

      <TitleCard
        title='Current Fuels'
        topMargin='mt-2'
        TopSideButtons={<TopSideButtons refetch={refetch} />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className='overflow-x-auto w-full'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>Car</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Mileage</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className='flex items-center space-x-3'>
                        <div className='inline'>
                          <div className='rounded w-24'>
                            {/* <img src={l.avatar} alt='Avatar' /> */}
                            {l.car.model.toUpperCase() === "SYMBOL" && (
                              <img src='/tipo.png' alt='fiat' />
                            )}
                            {l.car.model.toUpperCase() === "GOLF" && (
                              <img src='/duster.png' alt='golf' />
                            )}
                            {l.car.model.toUpperCase() === "POLO" && (
                              <img src='/500.png' alt='polo' />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className='font-bold'>{l.car.model.toUpperCase()}</div>
                          <div className='text-sm opacity-50'>{l.car.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className='badge badge-primary badge-outline px-4 py-4 text-lg'>
                        {l.cost.toLocaleString()} DA
                      </span>
                    </td>
                    <td>{moment(new Date(l.date)).add("days").format("DD MMM YY")}</td>
                    <td>
                      {" "}
                      <span className='badge badge-primary px-4 py-4 text-lg'>
                        {l.mileage.toLocaleString()} KM
                      </span>
                    </td>
                    <td> {moment(new Date(l.createdAt)).add("days").format("DD MMM YY")}</td>
                    <td>
                      <button
                        className='btn btn-square btn-ghost'
                        onClick={() => deleteCurrentFuel(l._id)}
                      >
                        <TrashIcon className='w-5' />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Fuels;
