import "./userTrainings.scss";

import TrainingItem from "../TrainingItem/TrainingItem";

export default function userTrainings() {
  return (
    <div className={"Items-container"}>
      <div className={"left"}>
        <TrainingItem isUserTraining={true} />
        <TrainingItem isUserTraining={true} />
        <TrainingItem isUserTraining={true} />
        <TrainingItem isUserTraining={true} />
        <TrainingItem isUserTraining={true} />
      </div>
      <div className={"right"}></div>
    </div>
  );
}
