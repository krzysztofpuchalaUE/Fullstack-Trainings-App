export const setConfig = (method, data, auth = false, token = null) => {
  const requestConfig = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth ? "Bearer " + token : null,
    },
    body: method === "GET" ? null : JSON.stringify(data),
  };
  return requestConfig;
};

export const requestGetConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
