/* import */
import React from "react";
import styled from "styled-components";
import { Themes, Sizes, ButtonStyle } from "../../utils/theme";
/* type */
interface Props {
  className?: string;
  name?: string;
  options: {
    value: string;
    label: string;
  }[]
}
/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  return (
    <select
      name={props.name}
      className={cn}
      defaultValue="disabled"
    >
      <option disabled value="disabled">選択してください</option>
    {props.options.map((e, key) => (
      <option key={key} value={e.value}>{e.label}</option>
    ))}
    </select>
  );
};
/* style */
const StyledComponent = styled(Component)<Props>`
  border: solid gray 1px;
`;
/* container */
const SelectBox = StyledComponent;

export default SelectBox;
