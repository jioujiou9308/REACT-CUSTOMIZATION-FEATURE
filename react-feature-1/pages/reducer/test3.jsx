import React, { createContext, useState, useContext, useMemo, memo } from "react";

const MyContext = createContext();

const Parent = () => {
  const [count, setCount] = useState(0); // 與 Context 有關的狀態
  const [otherState, setOtherState] = useState(false); // 無關的狀態

  // 使用 useMemo 確保 value 的引用穩定
  const value = useMemo(() => ({ count, value: "test" }), [count]);

  console.log("Parent re-rendered");

  return (
    <MyContext.Provider value={value}>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <button onClick={() => setOtherState(!otherState)}>Toggle Other State</button>
        <Child1 />
        <Child2 />
      </div>
    </MyContext.Provider>
  );
};

export default Parent;
// 使用 React.memo 包裹 Child
const Child1 = React.memo(() => {
  const { count } = useContext(MyContext);
  console.log("Child re-rendered");
  return <p>Count: {count}</p>;
});

const Child2 = memo(() => {
  console.log("render Child2");
  const { value } = useContext(MyContext);
  return <div>{value}</div>;
});
