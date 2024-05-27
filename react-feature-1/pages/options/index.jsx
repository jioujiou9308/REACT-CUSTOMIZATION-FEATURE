import React, { useState, useEffect } from "react";

// import OptionsComponent from "../../component/options/OptionsComponent";
const Index = () => {
  const [select, setSelect] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  useEffect(() => {
    select.length > 0
      ? setDisplayOptions(() => {
          return options.filter((option) => {
            return select.includes(option.value);
          });
        })
      : setDisplayOptions([]);
  }, [select]);


  function handleOptionChange(e) {
    const { value } = e.target;
    setSelect((preSelect) => {
      return preSelect.includes(value)
        ? preSelect.filter((item) => item !== value)
        : [...preSelect, value];
    });
  }
  return (
    <div>
      <br />
      <div>
        {options.map((option) => (
          <div key={option.value}>
            <label>
              <input
                type="checkbox"
                value={option.value}
                onChange={handleOptionChange}
                checked={select.includes(option.value)}
              />
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <br />
      <div>show select options</div>
      <div>
        {displayOptions.map((option) => (
          <p key={option.value}>{option.label}</p>
        ))}
      </div>
    </div>
  );
};

export default Index;

function OptionsComponent() {}
