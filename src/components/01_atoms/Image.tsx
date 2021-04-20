/* import */
import React from "react";
import styled from "styled-components";

/* type */
interface Props {
  className?: string;
  src: string;
  alt: string;
  width?: string;
  height?: string;
};
/* component */
const Component: React.FC<Props> = (props): JSX.Element => {
  const { className: cn, src, alt} = props;
  return <img  className={cn} src={src} alt={alt} />;
};
/* style */
const StyleComponent = styled(Component)`
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
`;
/* container */
const Image = StyleComponent;
/* export */
export default Image;

