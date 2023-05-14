import { useState, useEffect } from "react";
import { requestGetConfig } from "../../utils/requestConfig.js";
import { formatTrainingData } from "../../utils/formatTrainingData.js";

import TrainingItem from "../TrainingItem/TrainingItem";
import useHttp from "../../hooks/useHttp";

import "./Trainings.scss";

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
      const getTrainings = await fetchTrainings(
        "http://localhost:8800/trainings",
        requestGetConfig
      );
      console.log(getTrainings);
      setTrainings(getTrainings);
    }
    getTrainings();
  }, [registerAction]);

  const onRegisterUser = () => setRegisterAction((prev) => !prev);

  return (
    <div className={"trainings-container"}>
      <div className={"trainings"}>
        {trainings &&
          trainings?.map((training) => {
            if (training.category === trainingCategory)
              return (
                <TrainingItem item={training} registerAction={onRegisterUser} />
              );
            if (trainingCategory === undefined)
              return (
                <TrainingItem item={training} registerAction={onRegisterUser} />
              );
          })}
      </div>
      <button className={"slider-button btn-right"} onClick={slideRightHandler}>
        <i className={"bx bxs-chevron-right"}></i>
      </button>
      <button className={"slider-button btn-left"} onClick={slideLeftHandler}>
        <i className={"bx bxs-chevron-left"}></i>
      </button>
    </div>
  );
}
