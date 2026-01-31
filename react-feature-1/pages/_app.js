import "../styles/globals.css";
import Layout from "../component/Layout/layout";
import { GtmHead } from "../component/GtmHead";
import { GtmBody } from "../component/GtmBody";
import Head from "next/head";
import { createContext, useReducer, useMemo } from "react";

export const ReducerContext = createContext();
const initialState = {
  count: 0,
  isActive: true,
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

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducerPractice, initialState);
  const memoValue = useMemo(
    () => ({
      dispatch2: dispatch,
      state2: state,
      value: "fakeValue",
    }),
    [state, dispatch],
  );
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {GtmHead()}
      </Head>
      <ReducerContext.Provider value={{ memoValue }}>
        <GtmBody />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReducerContext.Provider>
    </div>
  );
}
