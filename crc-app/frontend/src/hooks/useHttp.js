import { useState } from "react";

export default function useHttp(applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: requestConfig?.method,
        headers: requestConfig?.headers
          ? requestConfig.headers
          : {
              "Content-Type": "application/json",
            },

        body: requestConfig?.body,
      });

      if (!response.ok) {
        throw new Error("It looks like request failed");
      }

      const data = await response.json();

      const appliedData = applyData(data);

      setIsLoading(false);
      return appliedData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return {
    requestForData: request,
    isLoading,
    isError: error,
  };
}
