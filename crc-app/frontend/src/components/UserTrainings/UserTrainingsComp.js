import "./UserTrainingsComp.scss";
import { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/useHttp";
import { newTrainingItemContext } from "../../context/newTrainingItemContext";

import TrainingItem from "../TrainingItem/TrainingItem";
import NewTrainingForm from "../NewTraining/NewTrainingForm";
import { Link } from "react-router-dom";

import { requestGetConfig } from "../../utils/requestConfig";
import { formatTrainingData } from "../../utils/formatTrainingData";

export default function UserTrainingsComp({ isNewTraining }) {
  const [userTrainings, setUserTrainings] = useState([]);
  const [watchedTraining, setWatchedTraining] = useState({});
  const newTrainingItemCtx = useContext(newTrainingItemContext);

  const applyData = (data) => {
    const appliedData = data.map((item) => {
      return formatTrainingData(item);
    });
    return appliedData;
  };

  const {
    requestForData: fetchMyTrainings,
    isLoading,
    isError,
  } = useHttp(applyData);

  useEffect(() => {
    async function getMyTrainings() {
      const myTrainings = await fetchMyTrainings(
        "http://localhost:8800/user-trainings",
        requestGetConfig
      );
      setUserTrainings(myTrainings);
    }
    getMyTrainings();
  }, []);

  const onShowDetails = (item) => {
    setWatchedTraining(item);
  };

  return (
    <div className={"Items-container"}>
      <div className={isNewTraining ? "left-new-training" : "left-trainings"}>
        {isNewTraining && <NewTrainingForm />}
        {userTrainings?.map((training) => {
          return (
            <TrainingItem
              item={training}
              isUserTraining={true}
              onShowDetails={onShowDetails}
              watchedTraining={watchedTraining}
            />
          );
        })}
      </div>
      {!isNewTraining && (
        <div className={"right"}>
          <Link
            to={"/user-trainings/new-training"}
            className={({ isActive }) => (isActive ? "link-active" : undefined)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={"create-training"}>
              <i class="bx bx-tennis-ball"></i>
              <h3>Create training</h3>
            </div>
          </Link>
          <div className={"item-description"}>
            <h3>{watchedTraining.title}</h3>
            <p>{watchedTraining.description}</p>
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
      )}
      {isNewTraining && (
        <div className={"right training-item"}>
          <TrainingItem isEdit={true} item={newTrainingItemCtx.trainingItem} />
        </div>
      )}
    </div>
  );
}
