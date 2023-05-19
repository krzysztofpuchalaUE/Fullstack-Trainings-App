import { useRouteError } from "react-router-dom";
import Error from "../components/Error/Error";

export default function ErrorPage() {
  const error = useRouteError();

  let status = error.status;

  return (
    <>
      <Error status={status} />
    </>
  );
}
