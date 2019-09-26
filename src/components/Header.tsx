import React from "react"
import styled  from "styled-components/macro"
import Nav from "./Nav";
import { theme } from "../theme";

const HeaderDiv = styled.div`

  position: fixed;
  top:0px;
  z-index: 1;
  background-color:  ${props => theme.BACKGROUND_COLOR};
  display: inline-block;
  width:100%;
  
 
  > div {
    position:relative;
    max-width: 600px;
    margin:0 auto;
    
    height:60px;
  }
 
 
`;
const TitleDiv = styled.div`
position:absolute;
top:30px;
left:10px;
font-family: "Yesteryear", cursive;
  color:${props => theme.HIGHLIGHT_COLOR};
  text-align: left;
  font-size: 50px;
  /*line-height: 90px;*/
`;

interface IProps {
  title: string;
}

const Header: React.SFC<IProps> = props => {
  return <HeaderDiv>
    <div>
    <TitleDiv>{props.title}</TitleDiv>
    <Nav/>
    </div>
    </HeaderDiv>;
};

export default Header;
