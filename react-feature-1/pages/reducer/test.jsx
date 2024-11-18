import React, { createContext, useContext, useReducer, useMemo } from "react";

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

const Counter = React.memo(({ number }) => {
  console.log("render counter");

  return (
    <>
      Count: {number}
      {/* <button onClick={() => dispatch({ type: "decrement" })}>-</button> */}
      {/* <button onClick={() => dispatch({ type: "increment" })}>+</button> */}
    </>
  );
});

const Tip = React.memo(() => {
  console.log("render 計數器");
  return <span>计数器</span>;
});

const Container = React.memo(() => {
  console.log("render container");
  const [value, setValue] = React.useState(0);
  const { count } = useContext(ContainerContext);
  return (
    <div>
      父層顯示 : {value}
      <Button handleClick={() => setValue(value + 1)} />
      <br />
      <Provider>
        <Counter number={count} />
        <Tip />
      </Provider>
    </div>
  );
});

export default Container;

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContainerContext.Provider>
  );
}

function Button(props) {
  return <button onClick={props.handleClick}>click</button>;
}
