export const formatDate = (date) => {
  const splitGenericDate = new Date(date.split("-").join(","));
  return splitGenericDate.toLocaleDateString("pl-PL");
};

export const formatTrainingData = (item) => {
  const newObj = {
    id: item.id,
    trainerId: item.trainer_id,
    category: item.training_category,
    description: item.training_description,
    date: [
      formatDate(item.training_start_date.split("T")[0]),
      formatDate(item.training_end_date.split("T")[0]),
    ].join("-"),
    time: [
      item.training_start_time.slice(0, 5),
      item.training_end_time.slice(0, 5),
    ].join("-"),
    icon: item.training_icon,
    language: item.training_language,
    level: item.training_level,
    location: item.training_location,
    title: item.training_title,
  };
  return newObj;
};
