import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Top from "./components/05_pages/Top";
import Login from "./components/05_pages/Login";
import CarDetail from "./components/05_pages/CarDetail";
import Auction from "./components/05_pages/Auction";
import Result from "./components/05_pages/Result";
import NotFound from "./components/05_pages/NotFound";
/* component */
const App: React.FC = (): JSX.Element => {
  return (
    <GlobalStyle>
    <Router>
      <Switch>
        {/* top */}
        <Route exact path="/" component={Top} />
        {/* login */}
        <Route exact path="/login" component={Login} />
        {/* Car detail */}
        <Route exact path="/car/:carId" component={CarDetail} />
        {/* Auction */}
        <Route exact path="/auction/:carId" component={Auction} />
        {/* Result */}
        <Route exact path="/result/:carId" component={Result} />
        {/* not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
    </GlobalStyle>
  );
};
/* global styled */
const GlobalStyle = styled.div`
  .none {
    display: none;
  }
  button {
    text-align: center;
  }
`;

export default App;