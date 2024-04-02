/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const useWatch = (
  value: any,
  callBack = (previousValue: any, newValue: any) => {}
) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, []);
  useEffect(() => {
    const triggerCallback = async (newValue: any, previousValue: any) => {
      await callBack(newValue, previousValue);
      ref.current = value; // wait callback to execute first
    };
    triggerCallback(value, ref.current);
  }, [value]);
};

export default useWatch;
