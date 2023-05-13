import { useState } from "react";

import Form from "../Reusable/Form";
import "./NewTrainingForm.scss";

export default function NewTrainingForm({ isNew, isEdit }) {
  const [showDescription, setshowDescription] = useState(false);

  const onShowDescriptionHandler = () => {};

  return (
    <div className={"form-container"}>
      <h2>Create training</h2>
      <Form className={"form"}>
        <div className={`training-property`}>
          <label htmlFor="custom_training_title">Title</label>
          <input
            type="text"
            id="custom_training_title"
            name="custom_training_title"
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_category">Category</label>
          <select id="custom_training_category" name="custom_training_category">
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
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_end_date">End date</label>
          <input
            type="date"
            id="custom_training_end_date"
            name="custom_training_end_date"
            size="15"
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_start_time">Start time</label>
          <input
            type="time"
            id="custom_training_start_time"
            name="custom_training_start_time"
            size="15"
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_end_time">End time</label>
          <input
            type="time"
            id="custom_training_end_time"
            name="custom_training_end_time"
            size="15"
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="training_language">Language</label>
          <select id="training_language" name="training_language">
            <option hidden>Language</option>
          </select>
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_loaction">Location</label>
          <input
            type="text"
            id="custom_training_loaction"
            name="custom_training_loaction"
            size="15"
          />
        </div>
        <div className={`training-property`}>
          <label htmlFor="custom_training_level">Level</label>
          <select id="custom_training_level" name="custom_training_level">
            <option hidden>Level</option>
          </select>
        </div>
        <div className={"training-property-input-field"}>
          <label htmlFor="custom_training_description">
            <div onClick={onShowDescriptionHandler} className={`description`}>
              Set description
            </div>
            {showDescription && (
              <div>
                <textarea
                  type="text"
                  id="custom_training_description"
                  name="custom_training_description"
                  rows="4"
                  cols="50"
                ></textarea>
                <span>/250</span>
              </div>
            )}
          </label>
        </div>
        <button type="submit" className="submit-button standard-button--dark">
          Send
        </button>
      </Form>
      <div className="custom-training-form--image">
        <button className="delete-image">Change image</button>
      </div>
    </div>
  );
}
