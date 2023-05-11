import "./TrainingItem.scss";

import pythonImage from "../../assets/python_icon.svg";

export default function TrainingItem() {
  return (
    <div className={"item-container"}>
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
        <div className={"description-chevron"}>
          <i class={"bx bxs-chevron-up"}></i>
          {/* <i class="bx bxs-chevron-down"></i> */}
        </div>
        <div className={"item-description-label"}>
          <div className={"update-training"}>
            <i className={"bx bx-edit"}></i>
          </div>
          <div className={"delete-training"}>
            <i className={"bx bx-trash"}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
