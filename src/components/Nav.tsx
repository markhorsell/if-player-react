import { NavLink } from "react-router-dom";
import styled from "styled-components";

import React from "react";

const NavDiv = styled.div`
  position: absolute;
  top: 0px;
  right:24px;
  > ul {
    margin:8px 0px 0px 0px;
    text-align: right;
    width: 160px;
    > li {
      display: inline-block;

      margin-left: 10px;
      > a {
        color: darkgray;
        font-size: 14px;
        text-decoration: none;

        &:hover {
          color: white;
        }
      }
    }
  }
`;

const Nav = () => (
  <NavDiv>
    <ul>
      <li>
        <NavLink to="/shivers-react/game" activeStyle={{ color: "white" }}>
          Game
        </NavLink>
      </li>
      <li>
        <NavLink to="/shivers-react/about" activeStyle={{ color: "white" }}>
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