import React, { useState } from "react";

function useInput() {
  const [value, setvalue] = useState("");

  const onChange = (e) => {
    setvalue(e.target.value);
  };
  return { value, onChange };
}

export default useInput;
