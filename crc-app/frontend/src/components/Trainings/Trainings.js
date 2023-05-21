import { useState, useEffect, useContext } from "react";
import { setConfig } from "../../utils/requestConfig.js";
import { formatTrainingData } from "../../utils/formatTrainingData.js";
import { authContext } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";

import TrainingItem from "../TrainingItem/TrainingItem";
import useHttp from "../../hooks/useHttp";

import "./Trainings.scss";
import Loader from "../Reusable/Loader.js";

const slideLeftHandler = () => {
  let trainingsSelector = document.querySelector(".trainings");
  let width = trainingsSelector.clientWidth;
  trainingsSelector.scrollLeft = trainingsSelector.scrollLeft - width;
};

const slideRightHandler = () => {
  let trainingsSelector = document.querySelector(".trainings");
  let width = trainingsSelector.clientWidth;
  trainingsSelector.scrollLeft = trainingsSelector.scrollLeft + width;
};

export default function Trainings({ trainingCategory }) {
  const [trainings, setTrainings] = useState([]);
  const [registerAction, setRegisterAction] = useState(false);
  const authCtx = useContext(authContext);
  const navigate = useNavigate();

  const applyData = (data) => {
    const { isRegistered, trainings } = data;
    const registeredTrainings = isRegistered.map(
      (training) => training.training_id
    );
    const appliedData = trainings.map((item) => {
      const fixedItem = formatTrainingData(item);
      const registered = registeredTrainings.some((id) => +fixedItem.id === id);
      if (registered) fixedItem.isRegistered = true;
      if (!registered) fixedItem.isRegistered = false;
      return fixedItem;
    });
    return appliedData;
  };

  const {
    requestForData: fetchTrainings,
    isLoading,
    isError,
  } = useHttp(applyData);

  useEffect(() => {
    async function getTrainings() {
      if (authCtx.authToken === null) {
        return navigate("/auth/login");
      }
      const getTrainings = await fetchTrainings(
        "http://localhost:8800/trainings",
        setConfig("GET", null, true, authCtx.authToken)
      );
      setTrainings(getTrainings);
    }
    getTrainings();
  }, [registerAction]);

  const onRegisterUser = () => setRegisterAction((prev) => !prev);

  return (
    <>
      {trainings?.length < 1 && !isLoading && (
        <div className={"trainings-container no-trainings"}>
          {" "}
          <h2>
            No trainings yet <i className="bx bx-message-error"></i>
          </h2>
        </div>
      )}
      {trainings?.length > 0 && (
        <div className={"trainings-container"}>
          <div className={"trainings"}>
            {trainings &&
              trainings?.map((training) => {
                if (training.category === trainingCategory)
                  return (
                    <TrainingItem
                      key={training.id}
                      item={training}
                      registerAction={onRegisterUser}
                    />
                  );
                if (trainingCategory === undefined)
                  return (
                    <TrainingItem
                      key={training.id}
                      item={training}
                      registerAction={onRegisterUser}
                    />
                  );
              })}
          </div>
          <button
            className={"slider-button btn-right"}
            onClick={slideRightHandler}
          >
            <i className={"bx bxs-chevron-right"}></i>
          </button>
          <button
            className={"slider-button btn-left"}
            onClick={slideLeftHandler}
          >
            <i className={"bx bxs-chevron-left"}></i>
          </button>
        </div>
      )}
      {isLoading && (
        <div className={"trainings-container loader-trainings"}>
          <Loader />
        </div>
      )}
      {isError && (
        <div className={"trainings-container no-trainings"}>
          <h2>Failed to fetch trainings </h2>
          <i className="bx bx-confused"></i>
        </div>
      )}
    </>
  );
}
