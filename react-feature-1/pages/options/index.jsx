import React, { useState, useEffect } from "react";

import OptionsComponent from "../../component/options/OptionsComponent";

const Index = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div>
      <OptionsComponent options={options} />
    </div>
  );
};

export default Index;
