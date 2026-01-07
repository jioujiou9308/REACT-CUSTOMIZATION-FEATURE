import React, { useEffect } from "react";

import httpService from "../../services/httpService";
export const getStaticProps = async () => {
  // const response = await httpService.get("https://jsonplaceholder.typicode.com/todos/1", {
  //   headers: {
  //     test: "12323",
  //   },
  // });

  return {
    props: {},
  };
};
const Index = () => {
  useEffect(() => {
    httpService.get("api/ping").then((res) => {

    });
  }, []);

  return <div className="h-[500px] bg-blue-200">Index</div>;
};

export default Index;
