import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Themes, Sizes, ButtonStyle } from "../../utils/theme";
/* types */
interface Props {
  className?: string;
  size: keyof typeof Sizes.button;
  color: keyof typeof Themes;
  referrer?: string;
  to?: string;
};
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  return <Link to={{pathname: props.to, state: {referrer: props.referrer}}} className={cn}>{props.children}</Link>;
};
/* styled */
const StyledComponent = styled(Component)<Props>`
  /* ${ButtonStyle} */
  text-align: center;
  width: ${({ size }) => `${Sizes['button'][size]}`};
  height: ${({ size }) => `calc(${Sizes['button'][size]} * 0.3)`};
  line-height: ${({ size }) => `calc(${Sizes['button'][size]} * 0.3)`};
  background-color: ${({ color }) => `${Themes[color]['backgroundColor']}`};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  font-weight: normal;
  color: ${({ color }) => `${Themes[color]['color']}`};
  outline: none;
  display: block;
`;
/* container */
const Anchor = StyledComponent;

export default Anchor;