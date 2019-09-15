import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import theme from "../theme";


import React from "react";

const NavDiv = styled.div`
  position: absolute;
  top: 0px;
  right:12px;
  > ul {
    margin:8px 0px 0px 0px;
    text-align: left;
    width: 60px;
    > li {
      display: inline-block;

      margin:0px 0px 4px 10px;
      > a {
        color: darkgray;
        font-size: 14px;
        text-decoration: none;

        &:hover {
          color: ${props => theme.HIGHLIGHT_COLOR};
        }
      }
    }
  }
`;

const Nav: React.SFC = () => (
  <NavDiv>
    <ul>
      <li>
        <NavLink to="/shivers-react/game" activeStyle={{ color: theme.HIGHLIGHT_COLOR }}>
          Game
        </NavLink>
      </li>
      <li>
        <NavLink to="/shivers-react/about" activeStyle={{ color: theme.HIGHLIGHT_COLOR }}>
          About
        </NavLink>
      </li>
      {/*
      <li>
        <NavLink to="/shivers-react/todo" activeStyle={{ color: "white" }}>
          Todo
        </NavLink>
      </li>
      */}
    </ul>
  </NavDiv>
);

export default Nav;
