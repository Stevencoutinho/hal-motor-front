import React from "react";
import styled from "styled-components";
import { Themes, Sizes, ButtonStyle } from "../../utils/theme";
/* types */
interface Props {
  className?: string;
  size: keyof typeof Sizes.button;
  color: keyof typeof Themes;
  value?: any;
  onClick?:any;
};
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  return <button className={cn} value={props.value} onClick={props.onClick}>{props.children}</button>;
};
/* styled */
const StyledComponent = styled(Component)<Props>`
  ${ButtonStyle}
  width: ${({ size }) => `${Sizes['button'][size]}`};
  height: ${({ size }) => `calc(${Sizes['button'][size]} * 0.3)`};
  background-color: ${({ color }) => `${Themes[color]['backgroundColor']}`};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  font-weight: normal;
  color: ${({ color }) => `${Themes[color]['color']}`};
  outline: none;
`;
/* container */
const Button = StyledComponent;

export default Button;