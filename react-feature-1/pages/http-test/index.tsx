import React from "react";
import httpService from "../../services/httpService";
export const getStaticProps = async () => {
  const response = await httpService.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log("response", response);

  return {
    props: {
      data: response.data || null,
    },
  };
};
const Index = ({ data }) => {
  console.log("data", data);

  return <div className="h-[500px] bg-blue-200">Index</div>;
};

export default Index;
