import { useCallback, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { newTrainingItemContext } from "../../context/newTrainingItemContext";
import { authContext } from "../../context/authContext";

import "./TrainingItem.scss";
import useHttp from "../../hooks/useHttp";
import { setConfig } from "../../utils/requestConfig";
export default function TrainingItem({
  item,
  isUserTraining,
  isCreate,
  isEdit,
  registerAction,
  onShowDetails,
  watchedTraining,
}) {
  const [userRegistered, setUserRegistered] = useState(
    item?.isRegistered || null
  );
  const [isUserTrainer, setIsUserTrainer] = useState(false);
  const newTrainingItemCtx = useContext(newTrainingItemContext);
  const authCtx = useContext(authContext);

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

  const applyPostData = (data) => {
    return data;
  };

  const {
    requestForData: postTraining,
    isLoading: postTrainingLoading,
    isError: postTrainingError,
  } = useHttp(applyPostData);

  const {
    requestForData: getUser,
    isLoading: getUserLoading,
    isError: getUserError,
  } = useHttp((value) => value);

  useEffect(() => {
    async function getUserId() {
      const data = await getUser(
        "http://localhost:8800/trainings",
        setConfig("GET", null, true, authCtx.authToken)
      );
      if (!data) return;
      const { userId } = data;
      const isTrainer = item?.trainerId !== userId[0].id;
      if (isTrainer === true) {
        setIsUserTrainer(true);
      }
    }
    getUserId();
  }, []);

  const onTrainingRegisterHandler = () => {
    const register = () => {
      postTraining(
        "http://localhost:8800/trainings",
        setConfig(
          "POST",
          {
            trainingId: item?.id,
            trainerId: item?.trainerId,
          },
          true,
          authCtx.authToken
        )
      );
      setUserRegistered(!userRegistered);
      registerAction();
    };

    const unregister = () => {
      postTraining(
        "http://localhost:8800/trainings",
        setConfig(
          "DELETE",
          {
            trainingId: item?.id,
          },
          true,
          authCtx.authToken
        )
      );
      setUserRegistered(!userRegistered);
    };

    if (item?.isRegistered === false) {
      register();
    }

    if (item?.isRegistered === true) {
      unregister();
    }
  };

  const onShowDetailshandler = () => {
    if (isUserTraining) {
      onShowDetails(item);
    }
  };

  const img = `http://localhost:8800/uploads/${encodeURIComponent(item?.icon)}`;

  return (
    <div
      className={`item-container ${
        isUserTraining
          ? "is-user-training"
          : isCreate && isEdit
          ? "is-edited"
          : isCreate
          ? "is-created"
          : undefined
      } ${watchedTraining?.id === item?.id ? "select" : undefined}`}
      onClick={onShowDetailshandler}
    >
      <img
        className={isCreate ? "edited-image" : ""}
        src={
          isCreate && newTrainingItemCtx.image !== null
            ? URL.createObjectURL(newTrainingItemCtx.image)
            : item?.icon !== null
            ? img
            : ""
        }
        alt={""}
      />
      <h2>{item?.title}</h2>
      <div className={"trining-description"}>
        <div className={"item-description-label"}>
          <div>
            <i className="bx bx-calendar"></i>
            <p>Date</p>
          </div>
          <p>{item?.date}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-time-five"}></i>
            <p>Time</p>
          </div>
          <p>{item?.time}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-chat"}></i>
            <p>Language</p>
          </div>
          <p>{item?.language}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-bar-chart-alt-2"}></i>
            <p>Level</p>
          </div>
          <p>{item?.level}</p>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-user-circle"}></i> <p>Trainer</p>
          </div>
          <div className={"trainer"}>
            <p>{item?.trainerFirstName}</p>
            <p>{item?.trainerLastName}</p>
          </div>
        </div>
        <div className={"item-description-label"}>
          <div>
            <i className={"bx bx-been-here"}></i> <p>Location</p>
          </div>
          <p>{item?.location}</p>
        </div>
        <div className={`description ${showClass.description}`}>
          <p>{item?.description}</p>
          <p></p>
        </div>
        <div className={`description-chevron ${showClass.chevron}`}>
          <i className={"bx bxs-chevron-down"} onClick={onShowDescription}></i>
        </div>
        {isUserTraining && item.createdByUser && (
          <div className={"item-description-label"}>
            <Link
              to={`${item.id}/edit`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={"update-training"}>
                <i className={"bx bx-edit"}></i>
              </div>
            </Link>
            <Link
              to={`${item.id}/delete`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={"delete-training"}>
                <i className={"bx bx-trash"}></i>
              </div>
            </Link>
          </div>
        )}
      </div>
      {!isUserTraining && !isCreate && (
        <button
          className={`register-btn ${
            !userRegistered ? undefined : "unregsiter"
          }`}
          onClick={onTrainingRegisterHandler}
          disabled={!isUserTrainer}
        >
          {!isUserTrainer
            ? "You are a trainer"
            : postTrainingLoading
            ? "Processing..."
            : userRegistered
            ? "Unregister"
            : "Register"}
          {postTrainingError && " failed"}
        </button>
      )}
    </div>
  );
}
