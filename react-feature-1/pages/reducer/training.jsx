import React, { useReducer } from "react";

const initialState = {
  count: 0,
  isLoading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const Training = () => {
  const [abc, dispatch] = useReducer(reducer, initialState);

  function increment() {
    dispatch({ type: "SET_LOADING", payload: true });
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 2000);
  }
  console.log("abc.isLoading", abc.isLoading);
  return (
    <div>
      <p>Count : {abc.isLoading ? "loading" : abc.count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>

    </div>
  );
};

export default Training;
