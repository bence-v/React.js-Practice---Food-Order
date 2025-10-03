import { useState, useEffect, useCallback } from "react";

async function sendHttprequest(url, config) {
  const resposne = await fetch(url, config);

  const resData = await resposne.json();

  if (!resposne.ok) {
    throw new Error(
      resData.message || "Something went wrong,failed tos end request."
    );
  }

  return resData;
}

function clearData() {
    setData(initialData);
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const resData = await sendHttprequest(url, {...config, body: data});
      setData(resData);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [url. config]);

  useEffect(() => {
    if((config && (config.method === "GET" || !config.method)) || !config) {
        sendRequest();
    }
  }, [sendRequest]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
