import React from "react"
import styled  from "styled-components/macro"
import Nav from "./Nav";

const HeaderDiv = styled.div`

  position: fixed;
  top:0px;
  z-index: 1;
 
  display: inline-block;
  width:100%;
  
 
  > div {
    position:relative;
    max-width: 600px;
    margin:0 auto;
    background-color: rgba(0, 0, 0,1);
    height:60px;
  }
 
 
`;
const TitleDiv = styled.div`
position:absolute;
top:30px;
left:10px;
font-family: "Yesteryear", cursive;
  color: gold;
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
