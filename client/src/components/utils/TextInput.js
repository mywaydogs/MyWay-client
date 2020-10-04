import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 16px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
`;

function TextInput({ label, ...props }) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <div>
        <Input {...props} />
      </div>
    </div>
  );
}

export default TextInput;
