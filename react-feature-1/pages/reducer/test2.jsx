import React, { createContext, useContext, useReducer, memo, useMemo, useState } from "react";

const ContainerContext = createContext({ count: 0 });
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Counter = memo(() => {
  console.log("render counter");
  const { state, dispatch } = useContext(ContainerContext);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
});

const Tip = memo(() => {
  console.log("render tip");
  return <span>计数器</span>;
});

function Container() {
  console.log("render container");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState(0);
  const [fatherValue, setFatherValue] = useState(0);
  const memoValue = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <div>
      <div>father value : {fatherValue}</div>
      <button onClick={() => setFatherValue((prev) => prev + 1)}>container 的 button +1</button>
      <br />
      <ContainerContext.Provider value={memoValue}>
        container的 value : {value}
        <button onClick={() => setValue((prev) => prev + 1)}>container 的 button +1</button>
        <br />
        <Counter />
        <Tip />
      </ContainerContext.Provider>
    </div>
  );
}

export default Container;
