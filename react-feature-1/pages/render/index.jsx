import React, { useState, useEffect } from "react";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? <Loading /> : <Component setLoading={setLoading} />}
    </div>
  );
};

export default Index;


const Loading = () => {
  return <div style={{ height: "500px", backgroundColor: "green" }}>Loading...</div>;
};

const Component = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // 清除定时器，以防止内存泄漏
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div>
      <div>Index</div>
    </div>
  );
};
