import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TrainingItem from "./TrainingItem";

test("should render TraininItem component", () => {
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

  render(<TrainingItem item={item} />);
  for (const entry in item) {
    console.log(entry);
  }
  expect(screen.getByText(title)).toBeInTheDocument();
});
