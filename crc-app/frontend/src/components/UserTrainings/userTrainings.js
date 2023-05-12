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
      <div className={"right"}>
        <div className={"item-description"}>
          <p>
            asdpadawopdkopkawaw
            dawdwaawddwawahuaegsrrrrrrrrrrauiiiiiiiiiiiiiiiiiiiwado
          </p>
          <div>
            <div className={"item-features"}>
              <div className={"update-training"}>
                <i className={"bx bx-edit"}></i>
                <p>Update</p>
              </div>
              <div className={"delete-training"}>
                <i className={"bx bx-trash"}></i>
                <p>Delete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
