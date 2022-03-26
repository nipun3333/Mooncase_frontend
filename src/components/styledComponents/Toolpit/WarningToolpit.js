import React from "react";
import styled from "styled-components";
import { WarningIcon } from "../../../assets/icon";

const ToolpitContainer = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  :hover div {
    visibility: visible;
  }
`;

const Toolpit = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: #ff4878;
  line-height: 1rem;
  color: #fff;
  font-size: 12px;

  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: -130%;
  margin-left: -60px;
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #ff4878 transparent transparent transparent;
  }
`;

const WarningToolpit = () => {
  return (
    <ToolpitContainer>
      <WarningIcon />
      <Toolpit>
        Unvetted auctions are indexed from the blockchain without any prior
        vetting and don’t represent an endorsement by copper
      </Toolpit>
    </ToolpitContainer>
  );
};

export default WarningToolpit;
