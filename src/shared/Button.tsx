import styled, { css } from "styled-components";

const Button = styled.button<{ secondary?: boolean }>`
  background-color: ${(props) => (props?.secondary ? css`#eee` : css`#000`)};
  color: ${(props) => (props?.secondary ? css`#000` : css`#fff`)};

  font-size: 1.1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 7px;
`;

export default Button;
