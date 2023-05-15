import React, { useState } from "react";
import { formatDate } from "../utils/formatTrainingData";

export const newTrainingItemContext = React.createContext({
  trainingItem: {},
  image: null,
  clearTrainingItem: () => {},
  setTrainingItemTitle: () => {},
  setTrainingItemDate: () => {},
  setTrainingItemTime: () => {},
  setTrainingItemLanguage: () => {},
  setTrainingItemLevel: () => {},
  setTrainingItemLocation: () => {},
  setTrainingItemDescription: () => {},
  setTrainingItemImage: () => {},
  setItemImage: () => {},
});

const NewTrainingItemProvider = ({ children }) => {
  const [trainingItem, setTrainingItem] = useState({});
  const [image, setImage] = useState(null);

  const setTrainingItemTitle = (title) => {
    setTrainingItem((prev) => {
      return {
        ...prev,
        title: title,
      };
    });
  };

  const setTrainingItemDate = (startDate, endDate) => {
    if (startDate !== "" && endDate !== "") {
      setTrainingItem((prev) => {
        return {
          ...prev,
          date: `${formatDate(startDate)}-${formatDate(endDate)}`,
        };
      });
    }
  };

  const setTrainingItemTime = (startTime, endTime) => {
    if (startTime !== "" && endTime !== "") {
      setTrainingItem((prev) => {
        return {
          ...prev,
          time: `${startTime}-${endTime}`,
        };
      });
    }
  };

  const setTrainingItemLanguage = (language) => {
    setTrainingItem((prev) => {
      return {
        ...prev,
        language: language,
      };
    });
  };

  const setTrainingItemLevel = (level) => {
    setTrainingItem((prev) => {
      return {
        ...prev,
        level: level,
      };
    });
  };

  const setTrainingItemLocation = (location) => {
    setTrainingItem((prev) => {
      return {
        ...prev,
        location: location,
      };
    });
  };

  const setTrainingItemDescription = (description) => {
    setTrainingItem((prev) => {
      return {
        ...prev,
        description: description,
      };
    });
  };

  const setItemImage = (img) => {
    setImage(img);
  };

  const clearTrainingItem = () => {
    setTrainingItem(() => {});
  };

  return (
    <newTrainingItemContext.Provider
      value={{
        trainingItem,
        clearTrainingItem,
        setTrainingItemTitle,
        setTrainingItemDate,
        setTrainingItemTime,
        setTrainingItemLanguage,
        setTrainingItemLevel,
        setTrainingItemLocation,
        setTrainingItemDescription,
        setItemImage,
        image,
      }}
    >
      {children}
    </newTrainingItemContext.Provider>
  );
};

export default NewTrainingItemProvider;
