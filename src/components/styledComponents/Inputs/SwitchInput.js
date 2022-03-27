import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Contianer = styled.div`
  position: relative;
  width: 52px;
  height: 24px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  cursor: pointer;
`;
const Input = styled.input.attrs((props) => ({
  type: "checkbox",
  checked: props.isChecked,
}))`
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  height: 6px;
  width: 30px;
  margin: 0;
  border: 1px solid #ffa5f6;
  border-radius: 15px;
  cursor: pointer;
  :checked {
    background-color: #ffa5f6;
    -webkit-transition: background-color 1s linear;
    -moz-transition: background-color 1s linear;
    -o-transition: background-color 1s linear;
    -ms-transition: background-color 1s linear;
    transition: background-color 1s linear;
    background-clip: content-box;
  }
`;

const Dot = styled.div`
  position: absolute;
  left: ${(props) => (props.isChecked ? "27px" : "3px")};
  top: 2px;
  border: 1px solid #ffa5f6;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.isChecked ? "#FFA5F6" : "#2F3033")};
  transition: left 100ms linear;
`;

const SwitchInput = (props) => {
  return (
    <Contianer>
      <Input
        type="checkbox"
        value={props.value}
        isChecked={props.value}
        onChange={() => {
          props.onChange(!props.value);
        }}
      ></Input>
      <Dot isChecked={props.value}></Dot>
    </Contianer>
  );
};

export default SwitchInput;
