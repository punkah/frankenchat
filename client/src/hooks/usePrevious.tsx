import { useEffect, useRef } from 'react';

export default (value: any) => {
  const prev = useRef();

  useEffect(() => {
    prev.current = value;
  });

  return prev.current;
};
