import { useState } from "react";

export default function useForm(validateFn) {
  const [value, setValue] = useState("");
  const [activated, setIsActivated] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const setValueHandler = (e) => {
    setValue(e.target.value);

    checkIsValid(validateFn);
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
    setValueHandler,
    onBlurHandler,
    reset,
  };
}
