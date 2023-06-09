import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const connectionPool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const getAllTrainings = async () => {
  try {
    const [result] = await connectionPool.query("SELECT * FROM Trainings");
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const registerOnTraining = async (trainingId, trainerId, email) => {
  try {
    const [result] = await connectionPool.query(
      `INSERT INTO User_trainings (trainer_id, training_id, user_email) VALUES (?,?,?)`,
      [trainerId, trainingId, email]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const unregisterFromTraining = async (trainingId, email) => {
  try {
    const [result] = await connectionPool.query(
      "DELETE FROM User_trainings WHERE User_trainings.training_id = ? AND User_trainings.user_email = ?",
      [trainingId, email]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getIsRegistered = async (email) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT training_id FROM User_trainings INNER JOIN Trainings ON User_trainings.training_id = Trainings.id AND User_trainings.trainer_id = Trainings.trainer_id WHERE User_trainings.training_id = Trainings.id AND User_trainings.user_email = ?",
      [email]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getTrainingByProperties = async (
  trainingTitle,
  trainingCategory,
  trainerId
) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT Trainings.id FROM Trainings WHERE Trainings.training_title = ? AND Trainings.training_category = ? AND Trainings.trainer_id = ?",
      [trainingTitle, trainingCategory, trainerId]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUserTrainings = async (userEmail) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT Trainings.id, Trainings.training_title, Trainings.training_start_date, Trainings.training_end_date, Trainings.training_start_time, Trainings.training_end_time, Trainings.training_language, Trainings.training_description,Trainings.training_level, Trainings.training_category,Trainings.training_location, Trainings.trainer, Trainings.trainer_id,Trainings.training_icon FROM Trainings INNER JOIN User_trainings ON Trainings.trainer_id = User_trainings.trainer_id AND Trainings.id = User_trainings.training_id WHERE User_trainings.user_email = ?",
      [userEmail]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTrainingsByCategory = async (category) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT trainig FROM Trainings WHERE category = ?",
      [category]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getTrainingByID = async (id) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT * FROM Trainings WHERE id = ?",
      [id]
    );
    return result[0];
  } catch (err) {
    console.log(err);
  }
};

export const createTraining = async (
  title,
  category,
  startDate,
  endDate,
  startTime,
  endTime,
  language,
  location,
  description,
  level,
  trainer,
  trainer_id,
  file
) => {
  try {
    const [result] = await connectionPool.query(
      `INSERT INTO Trainings (
      training_title,
      training_start_date,
      training_end_date,
      training_start_time,
      training_end_time,
      training_language,
      training_description,
      training_level,
      training_category,
      training_location,
      trainer,
      trainer_id,
      training_icon) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        language,
        description,
        level,
        category,
        location,
        trainer,
        trainer_id,
        file,
      ]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const updateTraining = async (
  id,
  title,
  startDate,
  endDate,
  startTime,
  endTime,
  language,
  description,
  level,
  category,
  location,
  trainer,
  trainer_id,
  file
) => {
  try {
    const [result] = await connectionPool.query(
      `UPDATE Trainings SET training_title = ?, training_start_date = ?, training_end_date = ?, training_start_time = ?, training_end_time = ?, training_language = ?, training_description = ?,training_level = ?, training_category = ?,training_location = ?, trainer = ?, trainer_id = ?,training_icon = ? WHERE id = ?`,
      [
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        language,
        description,
        level,
        category,
        location,
        trainer,
        trainer_id,
        file,
        id,
      ]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCustomTraining = async (id) => {
  try {
    const [result] = await connectionPool.query(
      "DELETE User_trainings, Trainings FROM User_trainings INNER JOIN Trainings ON User_trainings.training_id = Trainings.id AND User_trainings.trainer_id = Trainings.trainer_id WHERE Trainings.id = ?",
      [id]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const [result] = await connectionPool.query(
      `INSERT INTO Users (user_first_name, user_last_name, user_email, user_password) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, password]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (userEmail) => {
  try {
    const [result] = await connectionPool.query(
      `SELECT user_password FROM Users WHERE user_email = ?`,
      [userEmail]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getUserByEmail = async (userEmail) => {
  try {
    const [result] = await connectionPool.query(
      "SELECT id, user_first_name, user_last_name FROM Users WHERE user_email = ?",
      [userEmail]
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCategories = async () => {
  try {
    const [result] = await connectionPool.query(
      "SELECT DISTINCT Trainings.training_category FROM Trainings"
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};
