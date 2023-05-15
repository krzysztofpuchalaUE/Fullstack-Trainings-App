import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import { useParams, useNavigate } from "react-router-dom";

import { setConfig } from "../../utils/requestConfig";

import Form from "../Reusable/Form";
import "./NewTrainingForm.scss";

export default function NewTrainingForm({ isNew, isEdit }) {
  const [image, setImage] = useState(null);
  const [showDescription, setshowDescription] = useState(false);
  const link = window.location.href.split("/");
  const createLink = link.length === 4;
  const editLink = link.length === 6;
  const { trainingId } = useParams();
  const navigate = useNavigate();

  const {
    requestForData: postCustomTraining,
    isLoading: postCustomTrainingLoading,
    isError: postCustomTrainingError,
  } = useHttp((value) => value);

  const {
    value: title,
    activated: titleInputActivated,
    isValid: titleIsValid,
    setValueHandler: setTitleValue,
    onBlurHandler: titleInputOnBlur,
    reset: resetTitleInputField,
  } = useForm((value) => value.length > 4);

  const {
    value: category,
    activated: categoryInputActivated,
    isValid: categoryIsValid,
    setValueHandler: setCategoryValue,
    onBlurHandler: categoryInputOnBlur,
    reset: resetCategoryInputField,
  } = useForm((value) => value !== null);

  const {
    value: startDate,
    activated: startDateInputActivated,
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
    isValid: startTimeIsValid,
    setValueHandler: setStartTimeValue,
    onBlurHandler: startTimeInputOnBlur,
    reset: resetStartTimeInputField,
  } = useForm((value) => value.length > 0);

  const {
    value: endTime,
    activated: endTimeInputActivated,
    isValid: endTimeIsValid,
    setValueHandler: setEndTimeValue,
    onBlurHandler: endTimeInputOnBlur,
    reset: resetEndTimeInputField,
  } = useForm((value) => value.length > 0);

  const {
    value: language,
    activated: languageInputActivated,
    isValid: languageIsValid,
    setValueHandler: setLanguageValue,
    onBlurHandler: languageInputOnBlur,
    reset: resetLanguageInputField,
  } = useForm((value) => value !== "");

  const {
    value: location,
    activated: locationInputActivated,
    isValid: locationIsValid,
    setValueHandler: setLocationValue,
    onBlurHandler: locationInputOnBlur,
    reset: resetLocationInputField,
  } = useForm((value) => value.length > 4);

  const {
    value: level,
    activated: levelInputActivated,
    isValid: levelIsValid,
    setValueHandler: setLevelValue,
    onBlurHandler: levelInputOnBlur,
    reset: resetLevelInputField,
  } = useForm((value) => value !== "");

  const {
    value: description,
    activated: descriptionInputActivated,
    isValid: descriptionIsValid,
    setValueHandler: setDescriptionValue,
    onBlurHandler: descriptionInputOnBlur,
    reset: resetDescriptionInputField,
  } = useForm((value) => value.length < 250);

  const onShowDescriptionHandler = (e) => {
    e.preventDefault();
    setshowDescription((prev) => !prev);
  };

  let formIsValid = false;

  if (
    titleIsValid &&
    categoryIsValid &&
    startDateIsValid &&
    endDateIsValid &&
    startTimeIsValid &&
    endTimeIsValid &&
    languageIsValid &&
    locationIsValid &&
    levelIsValid
  )
    formIsValid = true;

  const onTrainingFormHandler = (e) => {
    e.preventDefault();
    let img = null;
    const trainerId = 1;
    if (image !== null) {
      img = URL.createObjectURL(image);
    }

    if (formIsValid) {
      const data = {
        title,
        category,
        startDate,
        endDate,
        startTime,
        endTime,
        language,
        location,
        level,
        description,
        trainerId, // user id
        img,
      };

      if (createLink) {
        const addCustomTraining = () => {
          postCustomTraining(
            "http://localhost:8800/user-trainings/new-training",
            setConfig("POST", {
              data,
            })
          );
        };
        addCustomTraining();
      }

      if (editLink) {
        const updateTraining = () => {
          postCustomTraining(
            `http://localhost:8800/user-trainings/${trainingId}/edit`,
            setConfig("PATCH", {
              trainingId,
              data,
            })
          );
        };
        updateTraining();
      }

      // resetTitleInputField();
      // resetCategoryInputField();
      // resetStartDateInputField();
      // resetEndDateInputField();
      // resetStartTimeInputField();
      // resetEndTimeInputField();
      // resetLanguageInputField();
      // resetLevelInputField();
      // resetLocationInputField();
      // resetDescriptionInputField();
      // setImage(null);
    }
    setTimeout(() => navigate("/my-trainings"), 3000);
  };

  return (
    <div className={"container"}>
      <h2>Create training</h2>
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
                <p className="invalid-info">Date must be greater than today</p>
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
                  Date must be greater than today and training start date
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
                  <i class="bx bx-comment-minus"></i>
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
                    <span>{description.length}/250</span>
                  </div>
                )}
              </label>
            </div>
            <button type="submit" className="submit-button">
              Send <i class="bx bxs-send"></i>
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
                <option>english</option>
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
              </select>
            </div>
            <div className={"image-div"}>
              {!image && (
                <input
                  type="file"
                  id="file"
                  accept="image/jpeg, image/png image/jpg"
                  name="training_image"
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
            <i class="bx bx-repost"></i>
          </button>
        )}
      </div>
    </div>
  );
}
