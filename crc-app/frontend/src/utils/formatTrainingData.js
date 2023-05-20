export const formatDate = (date) => {
  const splitGenericDate = new Date(date.split("-").join(","));
  return splitGenericDate.toLocaleDateString("pl-PL");
};

export const formatTrainingData = (item) => {
  const addOneDay = (date) => {
    const initialDate = new Date(date);
    const modifiedDate = new Date(initialDate.getTime() + 24 * 60 * 60 * 1000);
    const formattedDate = modifiedDate.toISOString().slice(0, -5) + "000Z";
    return formattedDate;
  };
  const newObj = {
    id: item.id,
    trainerId: item.trainer_id,
    trainerFirstName: item.trainer?.split(" ")[0],
    trainerLastName: item.trainer?.split(" ")[1],
    category: item.training_category,
    description: item.training_description,
    date: [
      formatDate(addOneDay(item.training_start_date).split("T")[0]),
      formatDate(addOneDay(item.training_end_date).split("T")[0]),
    ].join("-"),
    time: [
      item.training_start_time?.slice(0, 5),
      item.training_end_time?.slice(0, 5),
    ].join("-"),
    icon: item.training_icon,
    language: item.training_language,
    level: item.training_level,
    location: item.training_location,
    title: item.training_title,
  };
  return newObj;
};
