import TrainingItem from "../TrainingItem/TrainingItem";

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

const trainings = [];

export default function Trainings({ trainingCategory }) {
  return (
    <div className={"trainings-container"}>
      <div className={"trainings"}>
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        <TrainingItem />
        {trainings &&
          trainings?.map((training) => {
            if (training.category === trainingCategory) return <TrainingItem />;
            if (trainingCategory === undefined) return <TrainingItem />;
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
