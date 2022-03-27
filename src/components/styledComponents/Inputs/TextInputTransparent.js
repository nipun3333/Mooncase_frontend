/* eslint-disable no-lone-blocks */
import styled from "styled-components";


/*

    Usage:
   <TextInput placeholder='Enter the url' width="663px">

</TextInput>

*/


const TextInputTransparent = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder,
}))`
  ::placeholder {
    opacity: 0.7;
    color: white;
    font-weight: bold;
  }
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "auto")};
  background: inherit;
  color: white;
  outline: none;
  font-weight: bold;
  font-size: 1rem;
  text-align: right;
`;

export default TextInputTransparent;
