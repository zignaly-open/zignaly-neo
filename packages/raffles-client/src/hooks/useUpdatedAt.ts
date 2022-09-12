import { useEffect, useState } from 'react';

const useUpdatedAt = (date: Date, delay = 0) => {
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const timeout = +new Date(date) - +new Date();
    const timeoutId = setTimeout(() => {
      if (timeout > 0) {
        setUpdatedAt(+new Date());
      }
    }, timeout + delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [date]);

  return updatedAt;
};
export default useUpdatedAt;
