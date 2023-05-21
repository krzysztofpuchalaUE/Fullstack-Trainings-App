import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainingItem from "./TrainingItem";

const item = {
  id: 1,
  title: "Machne learining",
  date: "1.06.2023-22.07.2023",
  time: "16:00-19:00",
  language: "polish",
  level: "intermediate",
  trainerFirstName: "Krzysztof",
  trainerLastName: "Puchała",
  location: "remote",
  description: "",
  icon: "image.jpg",
  isRegistered: true,
  createdByUser: true,
  trainerId: 2,
};

test("should render TraininItem component", () => {
  render(<TrainingItem item={item} />);
  const trainingItem = screen.getByTestId("item-1");
  expect(trainingItem).toBeInTheDocument();
  expect(trainingItem).toHaveTextContent(item.title);
  expect(trainingItem).toHaveTextContent(item.date);
  expect(trainingItem).toHaveTextContent(item.time);
  expect(trainingItem).toHaveTextContent(item.trainerFirstName);
  expect(trainingItem).toContainHTML(`<i class="bx bx-calendar" />`);
});

test("check if button has text content is user trainer", () => {
  render(<TrainingItem item={item} />);
  const itemBtn = screen.getByTestId("button-test-1");
  expect(itemBtn).toHaveTextContent("You are a trainer");
});
