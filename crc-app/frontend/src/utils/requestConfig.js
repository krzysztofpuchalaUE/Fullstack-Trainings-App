export const setConfig = (method, data) => {
  const requestConfig = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return requestConfig;
};

export const requestGetConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const requestAuthorizationHeaders = {
  headers: { Authorization: "Bearer " },
};
