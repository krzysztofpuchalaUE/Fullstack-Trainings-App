import { useState } from "react";

import Form from "../Reusable/Form";
import "./NewTrainingForm.scss";

export default function NewTrainingForm({ isNew, isEdit }) {
  const [showDescription, setshowDescription] = useState(false);

  const onShowDescriptionHandler = () => {};

  return (
    <div className={"container"}>
      <h2>Create training</h2>
      <div className={"form-container"}>
        <Form className={"form"}>
          <div className={"form-left"}>
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
              <select
                id="custom_training_category"
                name="custom_training_category"
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
                    ></textarea>
                    <span>/250</span>
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
              <select id="training_language" name="training_language">
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
              />
            </div>
            <div className={`training-property`}>
              <label htmlFor="custom_training_level">Level</label>
              <select id="custom_training_level" name="custom_training_level">
                <option hidden>Level</option>
              </select>
            </div>
            <input
              type="file"
              id="file"
              accept="image/jpeg, image/png image/jpg"
              name="training_image"
            />
          </div>
        </Form>
        <div className="custom-training-form--image"></div>
        <button className="delete-image">
          <i class="bx bx-repost"></i>
        </button>
      </div>
    </div>
  );
}
