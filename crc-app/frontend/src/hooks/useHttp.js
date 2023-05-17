import { useState } from "react";

export default function useHttp(applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, requestConfig) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: requestConfig?.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: requestConfig?.body,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const appliedData = applyData(data);

      setIsLoading(false);
      return appliedData;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  return {
    requestForData: request,
    isLoading,
    isError: error,
  };
}
