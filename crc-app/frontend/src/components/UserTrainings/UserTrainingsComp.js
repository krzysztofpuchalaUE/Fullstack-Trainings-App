import "./UserTrainingsComp.scss";
import { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/useHttp";
import { newTrainingItemContext } from "../../context/newTrainingItemContext";

import TrainingItem from "../TrainingItem/TrainingItem";
import NewTrainingForm from "../NewTraining/NewTrainingForm";
import { Link, useNavigate } from "react-router-dom";

import { formatTrainingData } from "../../utils/formatTrainingData";
import { authContext } from "../../context/authContext";
import { setConfig } from "../../utils/requestConfig";
import Loader from "../Reusable/Loader";

export default function UserTrainingsComp({ isNewTraining, isEdited }) {
  const [userTrainings, setUserTrainings] = useState([]);
  const [watchedTraining, setWatchedTraining] = useState({});
  const navigate = useNavigate();
  const newTrainingItemCtx = useContext(newTrainingItemContext);
  const authCtx = useContext(authContext);

  const applyData = (data) => {
    const { userId, myTrainings } = data;
    const appliedData = myTrainings.map((item) => {
      const formattedItem = formatTrainingData(item);
      formattedItem.createdByUser = userId[0].id === item.trainer_id;
      return formattedItem;
    });
    return appliedData;
  };

  const {
    requestForData: fetchMyTrainings,
    isLoading,
    isError,
  } = useHttp(applyData);

  useEffect(() => {
    async function getUserTrainings() {
      if (authCtx.authToken === null) {
        return navigate("/auth/login");
      }
      const myTrainings = await fetchMyTrainings(
        "http://localhost:8800/user-trainings",
        setConfig("GET", null, true, authCtx.authToken)
      );
      setUserTrainings(myTrainings);
    }
    getUserTrainings();
  }, []);

  const onShowDetails = (item) => {
    setWatchedTraining(item);
  };

  return (
    <div className={"Items-container"}>
      <div className={isNewTraining ? "left-new-training" : "left-trainings"}>
        {isLoading && !isNewTraining && !isEdited && (
          <div className="user-no-trainings">
            <Loader />
          </div>
        )}
        {isNewTraining && !isEdited && <NewTrainingForm />}
        {isNewTraining && isEdited && <NewTrainingForm isEdit={true} />}
        {userTrainings?.length < 1 && !isLoading && (
          <div className="user-no-trainings">
            <h2>You have no trainings yet, create your first </h2>
            <i className="bx bx-wink-smile"></i>
          </div>
        )}
        {isError && (
          <div className={"user-no-trainings"}>
            <h2>Failed to fetch your trainings</h2>
            <i className="bx bx-confused"></i>
          </div>
        )}
        {!isNewTraining &&
          !isEdited &&
          userTrainings?.map((training) => {
            return (
              <TrainingItem
                key={training.id}
                item={training}
                isUserTraining={true}
                onShowDetails={onShowDetails}
                watchedTraining={watchedTraining}
              />
            );
          })}
      </div>
      {!isNewTraining && !isEdited && !isLoading && (
        <div className={"right"}>
          <Link
            to={isError ? "/user-trainings" : "/user-trainings/new-training"}
            className={({ isActive }) => (isActive ? "link-active" : undefined)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className={"create-training"}>
              <i className="bx bx-tennis-ball"></i>
              {!isLoading && <h3>Create training</h3>}
            </div>
          </Link>
          <div className={"item-description"}>
            {Object.keys(watchedTraining).length === 0 && (
              <h3>Select training to see the description</h3>
            )}
            <h3>{watchedTraining?.title}</h3>
            <p>{watchedTraining?.description}</p>
            <div>
              {Object.keys(watchedTraining).length > 0 &&
                watchedTraining.createdByUser && (
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
            key={Math.random() * 1000}
            isCreate={true}
            item={newTrainingItemCtx.trainingItem}
          />
        </div>
      )}
      {isNewTraining && isEdited && (
        <div className={"right training-item"}>
          <TrainingItem
            key={Math.random() * 1000}
            isCreate={true}
            isEdit={true}
            item={newTrainingItemCtx.trainingItem}
          />
        </div>
      )}
    </div>
  );
}
