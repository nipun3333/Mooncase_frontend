import React, { useState } from "react";
import styled from "styled-components";
import { BlackCircle, GreenTick } from "../../../assets/icon";

const Label = styled.label`
  font-size: 1rem;
  font-weight: 450;
  line-height: 25px;
  opacity: ${(props) => (props.value ? 1 : 0.5)};
`;

const Input = styled.input.attrs((props) => ({
  type: "checkbox",
}))`
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  height: 16px;
  width: 16px;
  margin: 0;
  border: 1px solid #656565;
  align-items: center;
  border-radius: 50%;
  &:checked {
    background-color: transparent;
    background-clip: content-box;
    border: none;
  }
  position: absolute;
  ::after {
    content: "";
    position: ${(props) => (props.value ? "relative" : "absolute")};
    right: ${(props) => (props.value ? "500px" : "20px")};
  }
`;

const Container = styled.div`
  border: 1px solid #656565;
  box-sizing: border-box;
  border-radius: 17px;
  height: fit-content;
  padding: 11px 15px;
  width: ${(props) => (props.width ? props.width : "100%")};
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const CheckBox = (props) => {
  // Should be passed form props
  const [value, setValue] = useState(false);

  return (
    <Container onClick={() => setValue(!value)}>
      <Input checked={value} value={value} onChange={() => setValue(!value)} />
      {value ? <GreenTick /> : <BlackCircle />}
      <Label value={value}>
        {props.label ? props.label : "Can Pause Trading"}
      </Label>
    </Container>
  );
};

export default CheckBox;
