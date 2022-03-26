import styled from "styled-components";

const TextArea = styled.textarea.attrs((props) => ({
  placeholder: props.placeholder,
}))`
  ::placeholder {
    opacity: 0.7;
    color: white;
    font-size: 0.9rem;
  }
  box-sizing: border-box;
  width: 100%;

  background: inherit;
  border: 1px solid #656565;
  border-radius: 17px;
  color: white;
  outline: none;
  font-size: 1rem;
  padding: 15px 16px 15px 16px;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6 px rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 25px;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-resizer  {
    visibility: hidden;
  }
  resize: none;
`;

export default TextArea;
