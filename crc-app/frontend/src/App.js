import RootLayout from "./pages/Root";

import ErrorPage from "./pages/Error";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import UserTrainingsPage from "./pages/UserTrainings";
import AuthenticationPage from "./pages/Authentication";
import NewTrainingPage from "./pages/NewTraining";
import TrainingsPage from "./pages/Trainings";
import UserTrainingsRoot from "./pages/UserTrainingsRoot";
import TrainingsRoot from "./pages/TrainingsRoot";
import EditTrainingPage from "./pages/EditTraining";
import DeletePage from "./pages/Delete";
import IdRoot from "./pages/IdRoot";
import AuthRoot from "./pages/AuthRoot";

import NewTrainingItemProvider from "./context/newTrainingItemContext";

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
        element: <TrainingsRoot />,
        children: [
          {
            index: true,
            element: <TrainingsPage />,
          },
          {
            path: ":category",
            element: <TrainingsPage />,
          },
        ],
      },
      {
        path: "user-trainings",
        element: <UserTrainingsRoot />,
        children: [
          {
            index: true,
            element: <UserTrainingsPage />,
          },
          {
            path: "new-training",
            element: <NewTrainingPage />,
          },
          {
            path: ":trainingId",
            element: <IdRoot />,
            children: [
              {
                path: "edit",
                element: <EditTrainingPage />,
              },
            ],
          },
          {
            path: ":trainingId",
            element: <IdRoot />,
            children: [
              {
                path: "delete",
                element: <DeletePage />,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthRoot />,
        children: [
          { path: "login", element: <AuthenticationPage /> },
          { path: "signup", element: <AuthenticationPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <NewTrainingItemProvider>
      <RouterProvider router={router} />
    </NewTrainingItemProvider>
  );
}
