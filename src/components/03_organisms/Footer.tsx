/*========== import ==========*/
import React from "react";
import styled from "styled-components";
/* type */
interface Props {
  className?: string;
};

/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  return <footer className={cn}>footer</footer>;
};

/* style */
const StyledComponent = styled(Component)<Props>`
  color: red;
  border: solid red 1px;
`;

/* container */
const Footer = StyledComponent;

/* export */
export default Footer;