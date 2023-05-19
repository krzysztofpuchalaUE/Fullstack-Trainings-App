import "./Loader.scss";

export default function Loader() {
  return (
    <div className={"loader-box"}>
      <div className={"loader loader-outer"}>
        <div className={"loader loader-inner"}></div>
      </div>
    </div>
  );
}
