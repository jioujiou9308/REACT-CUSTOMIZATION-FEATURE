import React, { useContext, memo } from "react";
import { ReducerContext } from "../_app";

const ContextRender = memo(() => {
  console.log("render ContextRender");
  return (
    <div>
      ContextRender
      <Child />
      <hr />
      <Child2 />
    </div>
  );
});

export default ContextRender;

const Child = memo(() => {
  const { memoValue } = useContext(ReducerContext);
  console.log("child render");
  return <div> Child component {memoValue.value}</div>;
});
const Child2 = () => {
  console.log("child2 render");
  const { state2, dispatch2, value } = useContext(ReducerContext).memoValue;

  return (
    <div>
      {" "}
      {state2.count}
      <button onClick={() => dispatch2({ type: "INCREMENT" })}>add one</button>
    </div>
  );
};
