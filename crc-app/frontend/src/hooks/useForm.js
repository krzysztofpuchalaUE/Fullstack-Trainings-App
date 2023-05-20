import { useState, useContext } from "react";

export default function useForm(validateFn) {
  const [value, setValue] = useState("");
  const [activated, setIsActivated] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const setValueHandler = (e) => {
    setValue(e.target.value);

    activated && checkIsValid(validateFn);
  };

  const setInitialValue = (value) => {
    setIsActivated(true);
    setIsValid(true);
    setValue(value);
  };

  const checkIsValid = (validateFn) => {
    setIsValid(validateFn(value));
  };

  const onBlurHandler = () => {
    setIsActivated(true);
    checkIsValid(validateFn);
  };

  const reset = () => {
    setIsValid(false);
    setIsActivated(false);
    setValue("");
  };

  return {
    value,
    activated,
    isValid,
    setInitialValue,
    setValueHandler,
    onBlurHandler,
    reset,
  };
}
