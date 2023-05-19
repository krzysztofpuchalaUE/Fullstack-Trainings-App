import { useState } from "react";
import { useParams } from "react-router-dom";

import Trainings from "../components/Trainings/Trainings";
import Categories from "../components/Categories/Categories";

export default function TrainingsPage() {
  const [trainingCategory, setTrainingCategory] = useState("");

  const filterByCategory = (category) => {
    setTrainingCategory(category);
  };

  let categoryURL = useParams();

  return (
    <>
      <Categories setTrainingCategory={filterByCategory} />
      <Trainings trainingCategory={categoryURL.category} />
    </>
  );
}
