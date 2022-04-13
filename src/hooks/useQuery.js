import { useEffect, useState, useCallback } from 'react';

const useQuery = (apiHandler) => {
  const [response, setResponse] = useState({});
  const [pending, setPending] = useState(false);

  const fetchData = useCallback(() => {
    setPending(true);
    apiHandler()
      .then((result) => setResponse((oldResponse) => ({ ...oldResponse, ...result, error: '' })))
      .catch((errorResponse) => setResponse((oldResponse) => ({ ...oldResponse, ...errorResponse })))
      .finally(() => setPending(false));
  }, [apiHandler]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pending,
    data: response.data,
    error: response.error,
    response: response,
    refetch: fetchData,
  };
};

export default useQuery;
