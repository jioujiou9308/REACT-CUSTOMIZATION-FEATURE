import React, { createContext, useContext, useReducer } from "react";

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

function Counter() {
  console.log("render counter");
  const { state, dispatch } = useContext(ContainerContext);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

function Tip() {
  console.log("render tip");
  return <span>计数器</span>;
}

function Container() {
  console.log("render Container");
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider>
      <Counter />
      <Tip />
    </Provider>
  );
}

export default Container;

function Provider(props) {
  console.log("render provider");
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContainerContext.Provider>
  );
}
