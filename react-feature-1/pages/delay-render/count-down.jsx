import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef } from "react";
import DeepComponent from "../../component/delayRender/deepComponent";
const CountDown = () => {
  const initState = {
    count: 0,
    start: false,
    times: 1,
  };

  const [count, setCount] = useState(initState.count);
  const [start, setStart] = useState(initState.start);
  const [times, setTimes] = useState(initState.times);
  const inc = () => {
    setCount(count + 1);
  };
  const desc = () => {
    setCount(count - 1);
  };
  const timerStart = () => {
    setStart(true);
  };
  const timerStop = () => {
    setStart(false);
  };
  const handleTwoTimes = () => (times === 2 ? setTimes(1) : setTimes(2));
  const reset = () => {
    setCount(initState.count);
    setStart(initState.start);
    setTimes(initState.times);
  };

  useEffect(() => {
    if (!start) return;

    let id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000 / times);
    return () => {
      clearInterval(id);
    };
  }, [start, times]);
  return (
    <div>
      <div className="">{count}</div>
      <button onClick={inc}>Increment</button>
      <button onClick={desc}>Decrement</button>
      <button onClick={timerStart}>Start</button>
      <button onClick={timerStop}>Stop</button>
      <button onClick={handleTwoTimes}>Change Speed</button>
      <button onClick={reset}>Reset</button>
      <DeepComponent />
    </div>
  );
};

export default CountDown;
