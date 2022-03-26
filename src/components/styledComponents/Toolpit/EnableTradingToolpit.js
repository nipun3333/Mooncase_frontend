import styled from "styled-components";

const EnableTradingToolpit = styled.div`
    /* opacity: 1; */
  width: 200px;
  background-color: #f70fe8;
  line-height: 1rem;
  color: #fff;
  font-size: 12px;
  border: 1px solid #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: 18%;
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

export default EnableTradingToolpit;