import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TitleCard from "../../../components/Cards/TitleCard";

function CarDash() {
  const [car, setCar] = useState("");
  const [selectedCar, setSelectedCar] = useState("");

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
  // Utilisez le useEffect pour sauvegarder le nombre de voitures dans le localStorage
  useEffect(() => {
    if (userCars) {
      // Mettez à jour le localStorage avec le nombre de voitures
      localStorage.setItem("numberOfCars", userCars.length);
    }
  }, [userCars]);
  return (
    <TitleCard title={"tableau de bord "}>
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
              {userCar?.model.toUpperCase()}
            </button>
          );
        })}
      </div>
    </TitleCard>
  );
}

export default CarDash;
