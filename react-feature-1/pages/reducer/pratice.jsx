import React, { useReducer, useEffect } from "react";

const initialState = {
  count: 0,
  isActive: false,
  data: [],
};

const reducerPractice = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "TOGGLE":
      return { ...state, isActive: !state.isActive };
    case "ADD_DATA":
      return { ...state, data: [...state.data, `New Item ${state.data.length + 1}`] };
    default:
      return state;
  }
};

const Practice = () => {
  const [state, dispatch] = useReducer(reducerPractice, initialState);
  return (
    <div>
      {state.count}
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
        }}
      >
        add one
      </button>
      {state.isActive ? "active" : "inactive"}
      <button onClick={()=>dispatch({type:"TOGGLE"})}>toggle</button>
    </div>
  );
};

export default Practice;
