import { useCallback, useState } from "react";

import "./TrainingItem.scss";

import pythonImage from "../../assets/python_icon.svg";

export default function TrainingItem({ isUserTraining, isEdit }) {
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

  return (
    <div
      className={`item-container ${
        isUserTraining ? "is-user-training" : isEdit ? "is-edit" : undefined
      }`}
    >
      <img src={pythonImage} alt={`Hello`} />
      <h2>Training python</h2>
      <div className={"trining-description"}>
        <div className={"item-description-label"}>
          <div>
            <i className="bx bx-calendar"></i>
            <p>Date</p>
          </div>
          <p>date</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-time-five"}></i>
            <p>Time</p>
          </div>
          <p>time</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i class={"bx bx-chat"}></i>
            <p>Language</p>
          </div>
          <p>polish</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-bar-chart-alt-2"}></i>
            <p>Level</p>
          </div>
          <p>beginner</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-user-circle"}></i> <p>Trainer</p>
          </div>
          <div className={"trainer"}>
            <p>name</p>
            <p>last name</p>
          </div>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i class={"bx bx-been-here"}></i> <p>Location</p>
          </div>
          <p>location</p>
        </div>
        <div className={`description ${showClass.description}`}>
          <p>
            ndaiowda iowawoidmawimdoawm doawmdaowdma wodmawodm waoodawdmaowd
            anodnaodoawnooawnoadw fiaofmoaifnfa owimfoiawfoawnfaoif
            faionwfniwan9iof jfnfnaofawim awodmwao aniownadawonfaiofnwaon
          </p>
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
        <div className={"register-btn"}>Register</div>
      )}
    </div>
  );
}
