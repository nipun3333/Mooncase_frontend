/* eslint-disable no-lone-blocks */
import styled from "styled-components";


/*

    Usage:
    
    // In the Auctions to view auction details
    <ViewButton> View </ViewButton>

*/

const Button = styled.button`
    height: fit-content;
    background: rgba(255, 242, 254, 0.24);
    border: 1px solid #FFA5F6;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 0.75rem;
  // Assumed as it is variable in the design
    padding: 5px 15px;
    width: ${(props) => (props.width ? props.width : "auto")};


`;

export default Button;
