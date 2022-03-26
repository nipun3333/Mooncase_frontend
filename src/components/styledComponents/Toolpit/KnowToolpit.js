import React from "react";
import styled from "styled-components";
import { SmallWhiteCaution, WhiteCaution } from "../../../assets/icon";

const ToolpitContainer = styled.div`
  position: relative;
  display: inline-block;

  :hover div {
    visibility: visible;
  }
`;

const Toolpit = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: #000;
  line-height: 1rem;
  color: #fff;
  font-size: 12px;
  border: 1px solid #fff;

  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: -110%;
  margin-left: -60px;
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;

const KnowToolpit = (props) => {
  return (
    <ToolpitContainer>
      {
        props.variant === "small" ? <SmallWhiteCaution /> : <WhiteCaution />
      }
     
      <Toolpit>
        Unvetted auctions are indexed from the blockchain without any prior
        vetting and don’t represent an endorsement by copper
      </Toolpit>
    </ToolpitContainer>
  );
};

export default KnowToolpit;

export { Toolpit };