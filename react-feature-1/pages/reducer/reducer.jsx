import React, { useReducer } from "react";

//初始狀態設定
const initialState = {
  count: 0,
  text: "Initial text",
  isActive: false,
  data: [],
  color: "#3498db",
};

//所有狀態的操作handler集成，可以發現是使用switch來達成的
//當然，你也可以用if else，但我不會這麼做，做一次你就知道原因了。
//這邊入參的state跟action是必寫的內容，
//useReducer會自動把需要用到的資料丟state跟action，我們在這邊只要保留這兩個入口就好了。
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "TOGGLE_ACTIVE":
      return { ...state, isActive: !state.isActive };
    case "ADD_DATA":
      return { ...state, data: [...state.data, `New Item ${state.data.length + 1}`] };
    case "CHANGE_TEXT":
      return { ...state, text: action.payload };
    case "CHANGE_COLOR":
      return { ...state, color: state.color === "#3498db" ? "#e74c3c" : "#3498db" };
    default:
      return state;
  }
};

const MyComponent = () => {
  //只需要調用一次useReducer就可以了！
  //把上方作為操作機制的Reducer跟初始值initialState入參
  //使用解構賦值將Hook return的兩個東西：當前值state，跟操作機制dispatch抓出。
  //有關dispatch跟state的用法見下方
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("reducer component render");
  return (
    <div>
      <p>Count: {state.count}</p>
      {/*dispatch的使用方式是以一個object入參，這邊使用的type key值是對應到reducer入參的action內容，
            reducer中的switch的參照點是action.type，當然你也可以改成其他的，但就是要對應到reducer的switch寫法*/}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      {/*state直接對應到initialState的key值，但當前值會隨著使用dispatch變化*/}
      <p>Text: {state.text}</p>
      <input
        type="text"
        value={state.text}
        onChange={(e) => dispatch({ type: "CHANGE_TEXT", payload: e.target.value })}
      />

      <p>Active: {state.isActive ? "Yes" : "No"}</p>
      <button onClick={() => dispatch({ type: "TOGGLE_ACTIVE" })}>Toggle Active</button>

      <ul>
        {state.data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: "ADD_DATA" })}>Add Data</button>

      <div style={{ backgroundColor: state.color, width: "100px", height: "100px" }}>
        {/* Your content here */}
      </div>
      <button onClick={() => dispatch({ type: "CHANGE_COLOR" })}>Change Color</button>
    </div>
  );
};

export default MyComponent;
