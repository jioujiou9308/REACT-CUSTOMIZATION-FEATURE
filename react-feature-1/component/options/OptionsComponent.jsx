import React, { useState, useEffect } from "react";

export default function OptionsComponent({ options }) {
  const [select, setSelect] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      select.length > 0
        ? setDisplayOptions(() =>
            options.filter((option) => select.includes(option.value))
          )
        : setDisplayOptions([...options]);
    }
    setFirstRender(false);
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
      {/* //* Available Options */}
      <div>
        <h3>Available Options</h3>
        {options.map((option) => (
          <div key={option.value}>
            <label>
              <input
                type="checkbox"
                value={option.value}
                onChange={(e) => handleOptionChange(e)}
                checked={select.includes(option.value)}
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
