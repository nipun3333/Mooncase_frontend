/* eslint-disable no-lone-blocks */
import styled from "styled-components";


/*

    Usage:
    
    // Primary Button
    <Button> Hello </Button>

    // Outlined Button
      <Button variant='outline'> Hello </Button>

      // Change width
      <Button width='200px'> Hello </Button>
      <Button width='200px' variant='outline'> Hello </Button>

      // Disabled Button
      <Button width='200px'  disabled> Hello </Button>

*/

const Button = styled.button`
  // Assumed as it is variable in the design

  border: 1px Solid
    ${(props) => (props.variant === "outline" ? "#F70FE8" : "transparent")};
  border-radius: 15px;
  color: #ffffff;
  background-color: ${(props) =>
    props.variant === "outline" ? "transparent" : "#F70FE8"};
  // 16px
  font-size: 1rem;
  // Assumed as it is variable in the design
  padding: ${(props) => (props.padding ? props.padding : "10px")};;

  width: ${(props) => (props.width ? props.width : "auto")};

  box-shadow: ${(props) =>
    props.variant === "outline"
      ? "0px 5px 20px #000000"
      : "inset 0px 1px 20px #FFFFFF"};

  :hover {
    background-color: ${(props) =>
      props.variant === "outline" ? "#F70FE8" : "transparent"};
    border-color: ${(props) =>
      props.variant === "outline" ? "transparent" : "#F70FE8"};
    box-shadow: ${(props) =>
      props.variant === "outline"
        ? "inset 0px 1px 20px #FFFFFF"
        : "0px 5px 20px #000000"};
  }

  :disabled {
    border-color: #656565;
    background-color: #191E24;
    color: #909090;
    box-shadow: 0px 5px 20px #000000;
    cursor: not-allowed;
  }
`;

export default Button;
