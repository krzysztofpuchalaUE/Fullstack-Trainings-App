import "./UserTrainingsComp.scss";
import { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/useHttp";
import { newTrainingItemContext } from "../../context/newTrainingItemContext";

import TrainingItem from "../TrainingItem/TrainingItem";
import NewTrainingForm from "../NewTraining/NewTrainingForm";
import { Link } from "react-router-dom";

import { formatTrainingData } from "../../utils/formatTrainingData";
import { authContext } from "../../context/authContext";
import { setConfig } from "../../utils/requestConfig";

export default function UserTrainingsComp({ isNewTraining, isEdited }) {
  const [userTrainings, setUserTrainings] = useState([]);
  const [watchedTraining, setWatchedTraining] = useState({});
  const newTrainingItemCtx = useContext(newTrainingItemContext);
  const authCtx = useContext(authContext);
  const [trainingId, setTrainingId] = useState("");

  const applyData = (data) => {
    const appliedData = data.map((item) => {
      console.log(item);
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
        setConfig("GET", null, true, authCtx.authToken)
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
        {isNewTraining && !isEdited && <NewTrainingForm />}
        {isNewTraining && isEdited && <NewTrainingForm isEdit={true} />}
        {!isNewTraining &&
          !isEdited &&
          userTrainings?.map((training) => {
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
      {!isNewTraining && !isEdited && (
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
            {Object.keys(watchedTraining).length === 0 && (
              <h3>Select training to see the description</h3>
            )}
            <h3>{watchedTraining?.title}</h3>
            <p>{watchedTraining?.description}</p>
            <div>
              {Object.keys(watchedTraining).length > 0 && (
                <div className={"item-features"}>
                  <Link
                    to={`${watchedTraining.id}/edit`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className={"update-training"}>
                      <i className={"bx bx-edit"}></i>
                      <p>Update</p>
                    </div>
                  </Link>
                  <div className={"delete-training"}>
                    <i className={"bx bx-trash"}></i>
                    <p>Delete</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isNewTraining && !isEdited && (
        <div className={"right training-item"}>
          <TrainingItem
            isCreate={true}
            item={newTrainingItemCtx.trainingItem}
          />
        </div>
      )}
      {isNewTraining && isEdited && (
        <div className={"right training-item"}>
          <TrainingItem
            isCreate={true}
            isEdit={true}
            item={newTrainingItemCtx.trainingItem}
          />
        </div>
      )}
    </div>
  );
}
