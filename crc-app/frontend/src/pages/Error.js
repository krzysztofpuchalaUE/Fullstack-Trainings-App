import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorMessage = {};

  if (error.status === 500) {
    errorMessage.title = 500;
    errorMessage.message = "Something went wrong";
  }

  if (error.status === 404) {
    errorMessage.title = 404;
    errorMessage.message = "Not found";
  }

  return (
    <>
      <h1>{errorMessage.title}</h1>
      <h3>{errorMessage.message}</h3>
    </>
  );
}
