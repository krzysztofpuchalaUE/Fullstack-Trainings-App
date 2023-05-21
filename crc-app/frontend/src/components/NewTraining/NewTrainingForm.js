import { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { useParams, useNavigate } from "react-router-dom";
import { categories, languages, levels } from "../../appConfig";
import { formatTrainingData } from "../../utils/formatTrainingData";
import axios from "axios";

import { setConfig, requestGetConfig } from "../../utils/requestConfig";
import { newTrainingItemContext } from "../../context/newTrainingItemContext";

import Form from "../Reusable/Form";
import "./NewTrainingForm.scss";
import { authContext } from "../../context/authContext";

export default function NewTrainingForm({ isEdit }) {
  const [image, setImage] = useState(null);
  const [showDescription, setshowDescription] = useState(false);
  const [send, setSend] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const link = window.location.href.split("/");
  const createLink = link.length === 5;
  const editLink = link.length === 6;
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const newTrainingCtx = useContext(newTrainingItemContext);
  const authCtx = useContext(authContext);

  const {
    requestForData: postCustomTraining,
    isLoading: postCustomTrainingLoading,
    isError: postCustomTrainingError,
  } = useHttp((value) => value);

  const {
    requestForData: getTrainingByID,
    isLoading: getTrainingByIDLoading,
    isError: getTrainingByIDError,
  } = useHttp((value) => value);

  const {
    value: title,
    activated: titleInputActivated,
    setInitialValue: setTitleInitialValue,
    isValid: titleIsValid,
    setValueHandler: setTitleValue,
    onBlurHandler: titleInputOnBlur,
    reset: resetTitleInputField,
  } = useForm((value) => value.length > 4);

  const {
    value: category,
    activated: categoryInputActivated,
    setInitialValue: setCategoryInitialValue,
    isValid: categoryIsValid,
    setValueHandler: setCategoryValue,
    onBlurHandler: categoryInputOnBlur,
    reset: resetCategoryInputField,
  } = useForm((value) => value !== null);

  const {
    value: startDate,
    activated: startDateInputActivated,
    setInitialValue: setStartDateInitialValue,
    isValid: startDateIsValid,
    setValueHandler: setStartDateValue,
    onBlurHandler: startDateInputOnBlur,
    reset: resetStartDateInputField,
  } = useForm((inputDate) => {
    if (endDate.length === 0) return Date.parse(inputDate) > Date.now();
    if (endDate.length > 0)
      return (
        Date.parse(inputDate) > Date.now() &&
        Date.parse(inputDate) < Date.parse(endDate)
      );
  });

  const {
    value: endDate,
    activated: endDateInputActivated,
    setInitialValue: setEndDateInitialValue,
    isValid: endDateIsValid,
    setValueHandler: setEndDateValue,
    onBlurHandler: endDateInputOnBlur,
    reset: resetEndDateInputField,
  } = useForm((inputDate) => {
    if (startDate.length === 0) {
      return Date.parse(inputDate) > Date.now();
    }
    if (startDate.length > 0) return Date.parse(inputDate) > Date.now() + 1;
  });

  const {
    value: startTime,
    activated: startTimeInputActivated,
    setInitialValue: setStartTimeInitialValue,
    isValid: startTimeIsValid,
    setValueHandler: setStartTimeValue,
    onBlurHandler: startTimeInputOnBlur,
    reset: resetStartTimeInputField,
  } = useForm((value) => value.length > 0);

  const {
    value: endTime,
    activated: endTimeInputActivated,
    setInitialValue: setEndTimeInitialValue,
    isValid: endTimeIsValid,
    setValueHandler: setEndTimeValue,
    onBlurHandler: endTimeInputOnBlur,
    reset: resetEndTimeInputField,
  } = useForm((value) => value.length > 0);

  const {
    value: language,
    activated: languageInputActivated,
    setInitialValue: setLanguageInitialValue,
    isValid: languageIsValid,
    setValueHandler: setLanguageValue,
    onBlurHandler: languageInputOnBlur,
    reset: resetLanguageInputField,
  } = useForm((value) => value !== "");

  const {
    value: location,
    activated: locationInputActivated,
    setInitialValue: setLocationInitialValue,
    isValid: locationIsValid,
    setValueHandler: setLocationValue,
    onBlurHandler: locationInputOnBlur,
    reset: resetLocationInputField,
  } = useForm((value) => value !== "");

  const {
    value: level,
    activated: levelInputActivated,
    setInitialValue: setLevelInitialValue,
    isValid: levelIsValid,
    setValueHandler: setLevelValue,
    onBlurHandler: levelInputOnBlur,
    reset: resetLevelInputField,
  } = useForm((value) => value !== "");

  const {
    value: description,
    activated: descriptionInputActivated,
    setInitialValue: setDescriptionInitialValue,
    setValueHandler: setDescriptionValue,
    onBlurHandler: descriptionInputOnBlur,
    reset: resetDescriptionInputField,
  } = useForm((value) => value.length < 250);

  const onShowDescriptionHandler = (e) => {
    e.preventDefault();
    setshowDescription((prev) => !prev);
  };

  let formIsValid = false;

  useEffect(() => {
    if (description.length > 250) {
      setDescriptionIsValid(false);
    }
  });

  if (
    titleIsValid &&
    categoryIsValid &&
    startDateIsValid &&
    endDateIsValid &&
    startTimeIsValid &&
    endTimeIsValid &&
    languageIsValid &&
    descriptionIsValid &&
    locationIsValid &&
    levelIsValid
  )
    formIsValid = true;

  const onTrainingFormHandler = (e) => {
    e.preventDefault();
    let img = null;
    const trainerId = 1;
    if (image !== null && image !== undefined) {
      img = image;
    }

    if (formIsValid) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("language", language);
      formData.append("location", location);
      formData.append("level", level);
      formData.append("description", description);
      formData.append("trainerId", trainerId);
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + authCtx.authToken,
        },
      };

      if (createLink) {
        const addCustomTraining = async () => {
          try {
            const res = await axios.post(
              "http://localhost:8800/user-trainings/new-training",
              formData,
              config,
              authCtx.authToken
            );
          } catch (err) {
            console.log(err);
          }
        };
        addCustomTraining();
      }

      if (editLink) {
        formData.append("trainingId", trainingId);

        const updateTraining = async () => {
          try {
            const res = await axios.patch(
              `http://localhost:8800/user-trainings/${trainingId}/edit`,
              formData,
              config,
              authCtx.authToken
            );
          } catch (err) {
            console.log(err);
          }
        };
        updateTraining();
      }

      resetTitleInputField();
      resetCategoryInputField();
      resetStartDateInputField();
      resetEndDateInputField();
      resetStartTimeInputField();
      resetEndTimeInputField();
      resetLanguageInputField();
      resetLevelInputField();
      resetLocationInputField();
      resetDescriptionInputField();
      setImage(null);
    }

    setSend(true);
    setTimeout(() => navigate("/user-trainings"), 3000);
  };

  useEffect(() => {
    newTrainingCtx.setTrainingItemTitle(title);
  }, [title]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemDate(startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemTime(startTime, endTime);
  }, [startTime, endTime]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemLanguage(language);
  }, [language]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemLevel(level);
  }, [level]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemLocation(location);
  }, [location]);

  useEffect(() => {
    newTrainingCtx.setTrainingItemDescription(description);
  }, [description]);

  useEffect(() => {
    newTrainingCtx.setItemImage(image);
  }, [image]);

  useEffect(() => {
    newTrainingCtx.clearTrainingItem();
    if (isEdit) {
      async function getTraining() {
        if (authCtx.authToken === null) {
          return navigate("/auth/login");
        }
        const getTrainingData = await getTrainingByID(
          `http://localhost:8800/user-trainings/${trainingId}/edit`,
          setConfig("GET", null, true, authCtx.authToken)
        );
        if (!getTrainingData) return;
        console.log(getTrainingData);
        const getTraining = await getTrainingData?.training;
        const formattedData = formatTrainingData(getTraining);
        setTitleInitialValue(formattedData?.title);
        setCategoryInitialValue(formattedData?.category);
        setStartTimeInitialValue(getTraining?.training_start_time);
        setEndTimeInitialValue(getTraining?.training_end_time);
        setLanguageInitialValue(formattedData?.language);
        setLocationInitialValue(formattedData?.location);
        setLevelInitialValue(formattedData?.level);
        setDescriptionInitialValue(formattedData?.description);
      }
      getTraining();
    }
  }, []);

  return (
    <div className={"container"}>
      <div className={"form-container"}>
        <Form className={"form"} onSubmit={onTrainingFormHandler}>
          <div className={"form-left"}>
            <div className={`training-property`}>
              <label htmlFor="custom_training_title">Title</label>
              <input
                type="text"
                id="custom_training_title"
                name="custom_training_title"
                value={title}
                onChange={setTitleValue}
                onBlur={titleInputOnBlur}
              />
              {!titleIsValid && titleInputActivated && (
                <p className="invalid-info">
                  Training title must have at least 4 characters
                </p>
              )}
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_category">Category</label>
              <select
                id="custom_training_category"
                name="custom_training_category"
                value={category}
                onChange={setCategoryValue}
                onBlur={categoryInputOnBlur}
              >
                <option hidden>Category</option>
                {categories.map((category) => {
                  return (
                    <option key={Math.random() * 1000} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_start_date">Start date</label>
              <input
                type="date"
                id="custom_training_start_date"
                name="custom_training_start_date"
                size="15"
                value={startDate}
                onChange={setStartDateValue}
                onBlur={startDateInputOnBlur}
              />
              {!startDateIsValid && startDateInputActivated && (
                <p className="invalid-info">
                  Date must be greater than today and before end date
                </p>
              )}
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_end_date">End date</label>
              <input
                type="date"
                id="custom_training_end_date"
                name="custom_training_end_date"
                size="15"
                value={endDate}
                onChange={setEndDateValue}
                onBlur={endDateInputOnBlur}
              />
              {!endDateIsValid && endDateInputActivated && (
                <p className="invalid-info">
                  Date must be greater than today and gerater or equal training
                  start date
                </p>
              )}
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_start_time">Start time</label>
              <input
                type="time"
                id="custom_training_start_time"
                name="custom_training_start_time"
                size="15"
                value={startTime}
                onChange={setStartTimeValue}
                onBlur={startTimeInputOnBlur}
              />
              {!startTimeIsValid && startTimeInputActivated && (
                <p className={"invalid-info"}>Start time must be defined</p>
              )}
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_end_time">End time</label>
              <input
                type="time"
                id="custom_training_end_time"
                name="custom_training_end_time"
                size="15"
                value={endTime}
                onChange={setEndTimeValue}
                onBlur={endTimeInputOnBlur}
              />
              {!endTimeIsValid && endTimeInputActivated && (
                <p className={"invalid-info"}>End Time must be defined</p>
              )}
            </div>
            <div className="custom_training_description">
              <label htmlFor="custom_training_description">
                <button
                  onClick={onShowDescriptionHandler}
                  className={`description-button`}
                >
                  Set description
                  <i className="bx bx-comment-minus"></i>
                </button>
                {showDescription && (
                  <div>
                    <textarea
                      type="text"
                      id="custom_training_description"
                      name="custom_training_description"
                      value={description}
                      onChange={setDescriptionValue}
                    ></textarea>
                    <span>
                      {!descriptionIsValid && descriptionInputActivated && (
                        <p className={"invalid-info"}>
                          Description must be no longer than 250 characters
                        </p>
                      )}
                      {descriptionIsValid && `${description.length}/250`}
                    </span>
                  </div>
                )}
              </label>
            </div>
            <button
              type="submit"
              disabled={!formIsValid || send}
              className="submit-button"
            >
              {!send && !postCustomTrainingError && createLink && "Create"}
              {!send && !postCustomTrainingError && editLink && "Edit"}
              {send && !postCustomTrainingError && "Success"}
              {postCustomTrainingError && "Failed to crate training"}
              <i className="bx bxs-send"></i>
            </button>
          </div>
          <div className={"form-right"}>
            <div className={`training-property`}>
              <label htmlFor="training_language">Language</label>
              <select
                id="training_language"
                name="training_language"
                value={language}
                onChange={setLanguageValue}
                onBlur={languageInputOnBlur}
              >
                <option hidden>Language</option>
                {languages.map((language) => (
                  <option key={Math.random() * 1000} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_loaction">Location</label>
              <input
                type="text"
                id="custom_training_loaction"
                name="custom_training_loaction"
                size="15"
                value={location}
                onChange={setLocationValue}
                onBlur={locationInputOnBlur}
              />
              {!locationIsValid && locationInputActivated && (
                <p className={"invalid-info"}>Location must be defined</p>
              )}
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_level">Level</label>
              <select
                id="custom_training_level"
                name="custom_training_level"
                value={level}
                onChange={setLevelValue}
                onBlur={levelInputOnBlur}
              >
                <option hidden>Level</option>
                {levels.map((level) => (
                  <option key={Math.random() * 1000} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className={"image-div"}>
              {!image && (
                <input
                  type="file"
                  id="file"
                  accept="image/jpeg, image/png image/jpg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              )}
              {image && <img src={URL.createObjectURL(image)} />}
            </div>
          </div>
        </Form>
        <div className="custom-training-form--image"></div>
        {image && (
          <button className="delete-image" onClick={() => setImage(null)}>
            <i className="bx bx-repost"></i>
          </button>
        )}
      </div>
    </div>
  );
}
