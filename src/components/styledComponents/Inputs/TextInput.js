/* eslint-disable no-lone-blocks */
import styled from "styled-components";


/*

    Usage:
   <TextInput placeholder='Enter the url' width="663px">

</TextInput>

*/


const TextInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder,
}))`
  ::placeholder {
    opacity: 0.7;
    color: white;
    /* font-size: 0.9rem; */
  }
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "52px")};
  background: inherit;
  border: 1px solid #656565;
  border-radius: 17px;
  color: white;
  outline: none;
  font-size: 1rem;
  padding: 12px 12px 12px 12px;
`;

export default TextInput;
