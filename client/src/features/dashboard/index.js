import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import CarDash from "./components/CarDash";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useEffect, useState } from "react";
import Car from "../../components/car/index";
import { getCars } from "../../api/axios";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const dispatch = useDispatch();
  const [numberOfCars, setNumberOfCars] = useState(0); // État pour stocker le nombre de voitures

  // Utilisez le useEffect pour récupérer le nombre de voitures à partir du localStorage
  useEffect(() => {
    const storedNumberOfCars = localStorage.getItem("numberOfCars");
    if (storedNumberOfCars) {
      setNumberOfCars(parseInt(storedNumberOfCars, 10));
    }
  }, []);

  const statsData = [
    {
      title: "nombre de voitures",
      value: numberOfCars,
      icon: (
        <button
          className='btn px-6 btn-sm btn-outline btn-primary'
          onClick={() => openAddNewCarModal()}
        >
          Add
        </button>
      ),
      description: "",
    },
    {
      title: "Depenses Total",
      value: "34 500",
      icon: <CreditCardIcon className='w-8 h-8' />,
      description: "",
    },
    {
      title: "Depenses de Carburant",
      value: "25 000",
      icon: <CircleStackIcon className='w-8 h-8' />,
      description: "",
    },
    {
      title: "Depenses Entretients",
      value: "8 500",
      icon: <UsersIcon className='w-8 h-8' />,
      description: "",
    },
  ];
  const openAddNewCarModal = () => {
    dispatch(
      openModal({
        title: "ajouter une voiture",
        bodyType: MODAL_BODY_TYPES.CAR_ADD_NEW,
      })
    );
  };

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/* * ---------------------- Different stats content 1 ------------------------- */}
      <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6'>
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className='grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6'>
        <CarDash  />
        <BarChart />
      </div>
      {/** ---------------------- Different stats content 2 ------------------------- */}
      <div className='grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6'>
        <AmountStats />
        <PageStats />
      </div>
      {/** ---------------------- User source channels table  ------------------------- */}
      <div className='grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6'>
        <UserChannels />
        <DoughnutChart />
      </div>
    </>
  );
}

export default Dashboard;
