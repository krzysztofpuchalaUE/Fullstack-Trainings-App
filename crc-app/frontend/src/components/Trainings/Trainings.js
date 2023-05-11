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

export default function Trainings() {
  return (
    <div className={"trainings"}>
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
    </div>
  );
}
