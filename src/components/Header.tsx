import React from "react"
import styled  from "styled-components"

const HeaderDiv = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: inline-block;
  width: inherit;
  max-width: 1000px;

  margin: 0 auto;
  font-family: "Yesteryear", cursive;
  color: gold;
  text-align: left;
  top: 0px;

  height: 80px;
  font-size: 60px;
  line-height: 90px;
`;

interface IProps {
  title: string;
}

const Header: React.SFC<IProps> = props => {
  return <HeaderDiv>{props.title}</HeaderDiv>;
};

export default Header;
