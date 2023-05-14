import { useCallback, useState } from "react";

import "./TrainingItem.scss";

import pythonImage from "../../assets/python_icon.svg";

export default function TrainingItem({ item, isUserTraining, isEdit }) {
  const expandDescription = {
    chevron: "rotate-chevron-up",
    description: "show-desc",
  };

  const hideDescription = useCallback(
    {
      chevron: "rotate-chevron-down",
      description: "hide-desc",
    },
    []
  );

  const [showClass, setShowClass] = useState(hideDescription);

  const onShowDescription = () => {
    if (
      showClass.chevron === "rotate-chevron-down" &&
      showClass.description === "hide-desc"
    ) {
      return setShowClass(expandDescription);
    }
    setShowClass(hideDescription);
  };

  const onTrainingRegisterHandler = () => {
    const register = () => {
      postTraining(
        "http://localhost:8800/trainings",
        setConfig("POST", {
          trainingId: item.id,
          trainerId: item.trainerId,
        })
      );
      setUserRegistered(!userRegistered);
    };
  };

  return (
    <div
      className={`item-container ${
        isUserTraining ? "is-user-training" : isEdit ? "is-edit" : undefined
      }`}
    >
      <img src={item.image} alt={""} />
      <h2>{item.title}</h2>
      <div className={"trining-description"}>
        <div className={"item-description-label"}>
          <div>
            <i className="bx bx-calendar"></i>
            <p>Date</p>
          </div>
          <p>{item.date}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-time-five"}></i>
            <p>Time</p>
          </div>
          <p>{item.time}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i class={"bx bx-chat"}></i>
            <p>Language</p>
          </div>
          <p>{item.language}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-bar-chart-alt-2"}></i>
            <p>Level</p>
          </div>
          <p>{item.level}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-user-circle"}></i> <p>Trainer</p>
          </div>
          <div className={"trainer"}>
            <p>{item.trainerId}</p>
            <p>{item.trainerId}</p>
          </div>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i class={"bx bx-been-here"}></i> <p>Location</p>
          </div>
          <p>{item.location}</p>
        </div>
        <div className={`description ${showClass.description}`}>
          <p>{item.description}</p>
          <p></p>
        </div>
        <div className={`description-chevron ${showClass.chevron}`}>
          <i className={"bx bxs-chevron-down"} onClick={onShowDescription}></i>
        </div>
        {isUserTraining && (
          <div className={"item-description-label"}>
            <div className={"update-training"}>
              <i className={"bx bx-edit"}></i>
            </div>
            <div className={"delete-training"}>
              <i className={"bx bx-trash"}></i>
            </div>
          </div>
        )}
      </div>
      {!isUserTraining && !isEdit && (
        <div className={"register-btn"} onClick={onTrainingRegisterHandler}>
          Register
        </div>
      )}
    </div>
  );
}
