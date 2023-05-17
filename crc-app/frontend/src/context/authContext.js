import React, { useState } from "react";

export const authContext = React.createContext({
  authToken: "",
  onSetToken: () => "",
});

const AuthTokenProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const onSetToken = (str) => {
    setAuthToken(str);
  };

  return (
    <authContext.Provider
      value={{
        authToken,
        onSetToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthTokenProvider;
