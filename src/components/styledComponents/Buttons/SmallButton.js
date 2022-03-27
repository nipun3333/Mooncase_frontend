import { useState } from "react";
import styled from "styled-components";

/*

    Usage:
    // For Accordion (pass arrow icons)
<SmallButton variant='view' openIcon={viewUp} closeIcon={viewDown} width='70px'> View </SmallButton>

// Used In Create Aution Page
<SmallButton variant='max' width='70px'> Max </SmallButton>

// Used in the accordion
<SmallButton variant='view' width='57px'> Max </SmallButton> 

*/

const Container = styled.div`
  // Assumed as it is variable in the design
  height: ${(props) => (props.variant === "max" ? "29px" : "27px")};
  box-sizing: border-box;
  border: 1px Solid #f70fe8;
  border-radius: ${(props) => (props.variant === "max" ? "15px" : "10px")};
  color: #ffffff;
  background-color: ${(props) =>
    props.variant === "view" ? "rgba(255, 242, 254, 0.24)" : "transparent"};
  // 12px for view and 14px for max
  font-size: ${(props) => (props.variant === "max" ? "0.88rem" : "0.75rem")};
  // Assumed as it is variable in the design
  padding: 5px 10px 4px 10px;
  text-align: center;

  // Hardcoded from the view button in the auction page in the design
  line-height: ${(props) => (props.variant === "max" ? "18px" : "15px")};

  width: ${(props) => (props.width ? props.width : "auto")};
  display: ${(props) => (props.variant === "view" ? "flex" : "inline-block")};
  justify-content: ${(props) => (props.isIcon ? "space-between" : "center")};
  align-items: center;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => (props.variant === "max" ? "#FFA5F6" : "#FFFFFF")};
`;


const SmallButton = (props) => {
  // By Default the view arrow is down can be chnaged if we want to pass it through props
  const [open, setOpen] = useState(false);

  return (
    <Container
      variant={props.variant}
      width={props.width}
      onClick={() => {
        props.setisOpen ? props.setisOpen(!props.isOpen) : setOpen(!open);
      }}
      isIcon={props.openIcon ? true : false}
    >
      <Text variant={props.variant}>{props.children}</Text>
      {props.openIcon && props.isOpen ? (
        <img src={props.openIcon} alt='arrow' className='h-1.5 w-2.5'/>
      ) : props.closeIcon && !props.isOpen ? (
        <img src={props.closeIcon} className='h-1.5 w-2.5' alt='arrow' />
      ) : null}
    </Container>
  );
};

export default SmallButton;
