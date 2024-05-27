import React, { useState, useEffect } from "react";

export default function OptionsComponent({ options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([...options]);

  // 當 selectedOptions 改變時，使用 useEffect 來更新 displayOptions
  useEffect(() => {
    if (selectedOptions.length > 0) {
      const newDisplayOptions = options.filter((option) =>
        selectedOptions.includes(option.value)
      );
      setDisplayOptions(newDisplayOptions);
    } else {
      setDisplayOptions([...options]);
    }
  }, [selectedOptions, options]);

  // 處理選項改變的函數
  const handleOptionChange = (value) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };
  console.log("selectedOptions", selectedOptions);
//   console.log("displayOptions", displayOptions);''
  return (
    <div>
      {/* //* Available Options */}
      <div>
        <h3>Available Options</h3>
        {options.map((option) => (
          <div key={option.value}>
            <label>
              <input
                type="checkbox"
                value={option.value}
                onChange={() => handleOptionChange(option.value)}
                checked={selectedOptions.includes(option.value)}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {/* //* Selected Options */}
      <div>
        <h3>Selected Options</h3>
        {displayOptions.map((option) => (
          <p key={option.value}>{option.label}</p>
        ))}
      </div>
    </div>
  );
}
