import React, { useContext } from "react";
import { ReducerContext } from "../_app";

const Display = () => {
  console.log('render Display');
  const { state2, dispatch2 } = useContext(ReducerContext);
  return <div>{state2.count}</div>;
};

export default Display;
