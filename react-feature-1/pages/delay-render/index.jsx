import React, { useEffect, useState } from "react";
import useDelayRender from "../../component/delayRender/useDelayRender";

const Index = () => {
  const { isLoading, result } = useDelayRender();

  if (isLoading) {
    console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
    return <div>Loading..................</div>;
  }
  return (
    <div>
      <div>{!result && <div>❌❌❌❌❌❌❌❌❌</div>}</div>
      <div>
        {result && (
          <div>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, labore magnam sequi
            reiciendis sapiente non id optio molestiae accusantium voluptate rem beatae, culpa odio
            sed excepturi harum recusandae. Tenetur, praesentium.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
