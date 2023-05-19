import "./Error.scss";

export default function Error({ status }) {
  const error = {};

  document.getElementById("root").classList.add("error");

  if (status === 404) {
    error.title = status;
    error.message = "Not found";
  }

  if (status === 500) {
    error.title = status;
    error.message = "Internal server error";
  }

  return (
    <div className={"error-box"}>
      <h1>{error.title}</h1>
      <div className={"error-message"}>
        <h3>{error.message}</h3>
        <i class="bx bx-sad"></i>
      </div>
    </div>
  );
}
