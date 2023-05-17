import React, { useState } from "react";

export const authContext = React.createContext({
  authToken: "",
  onSetToken: () => {},
});

const authTokenProvider = ({ chlidren }) => {
  const [authToken, setAuthToken] = useState(null);

  const onSetToken = (string) => {
    setAuthToken(string);
  };

  return (
    <authContext.Provider
      value={{
        authToken,
        onSetToken,
      }}
    >
      {chlidren}
    </authContext.Provider>
  );
};

export default authTokenProvider;
