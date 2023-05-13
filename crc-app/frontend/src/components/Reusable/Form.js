import "./Form.scss";

export default function Form({ className, children }) {
  return (
    <>
      <form className={className}>{children}</form>
    </>
  );
}
