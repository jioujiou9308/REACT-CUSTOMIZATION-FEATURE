import React, { useEffect, useState } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const CopyDebounce = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debounceValue) {
      setSearchCount((prev) => prev + 1);
    }
    return () => {};
  }, [debounceValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="border "
      />
      <p>searchCount: {searchCount}</p>
    </div>
  );
};

export default CopyDebounce;
