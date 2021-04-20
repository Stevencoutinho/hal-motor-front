/*========== import ==========*/
import React from "react";
import styled from "styled-components";
import { GlobalStoreProvider, process } from "@/types";
import Image from "@/src/components/01_atoms/Image";
import { Store } from "@/src/Store";
import { Link, Route } from "react-router-dom";
/* type */
interface Props {
  className?: string;
};

/* DOM */
const Component: React.FC<Props> = (props): JSX.Element => {
  const cn = props.className;
  const { state, dispatch }: GlobalStoreProvider = React.useContext(Store);
  return (
    <header className={cn}>
      <p><Link to="/"><Image
        className="logo"
        src={`${process.env.IMG_PATH}/utils/logo.png`}
        alt="HAL MOTORのロゴマーク"
        width="200px"
      /></Link></p>
      <ul>
      {!state.user.id ? (
        <>
          <li><Link to="/login">ログイン</Link></li>
          <li><Image
            className="unknown"
            src={`${process.env.IMG_PATH}/utils/unknown.png`}
            alt="未ログインユーザー"
            width="30px"
          /></li>
        </>
      ) : (
        <>
          <li>{state.user.name}</li>
          <li><Image
            className="user-icon"
            src={`${process.env.IMG_PATH}/users/user${state.user.id}.png`}
            alt={`${state.user.name}さんのアイコン`}
            width="50px"
          /></li>
        </>
      )}
      </ul>
    </header>
  );
};

/* style */
const StyledComponent = styled(Component)<Props>`
  width: 100%;
  border-bottom: solid #C0C0C0 1px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  /* margin-bottom: 20px; */
  ul {
    display: flex;
    align-items: center;
    li {
      margin: 0 10px;
    }
  }
`;

/* container */
const Header = StyledComponent;

/* export */
export default Header;