import "./UserTrainingsComp.scss";

import TrainingItem from "../TrainingItem/TrainingItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserTrainingsComp() {
  const [newTraining, setNewTraining] = useState(false);
  const link = window.location.href.split("/").at(-1);

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
        <Link
          to={"new-training"}
          className={({ isActive }) => (isActive ? "link-active" : undefined)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={"create-training"}>
            <i class="bx bx-tennis-ball"></i>
            <h3>Create training</h3>
          </div>
        </Link>
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
