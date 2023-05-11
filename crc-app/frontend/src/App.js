import RootLayout from "./pages/Root";

import ErrorPage from "./pages/Error";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import UserTrainingsPage from "./pages/UserTrainings";
import AuthenticationPage from "./pages/Authentication";
import NewTrainingPage from "./pages/NewTraining";
import TrainingsPage from "./pages/Trainings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "trainings",
        element: <TrainingsPage />,
      },
      {
        path: "user-trainings",
        element: <UserTrainingsPage />,
        children: [
          {
            path: "new-training",
            element: <NewTrainingPage />,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
