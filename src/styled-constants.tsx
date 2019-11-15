import styled from "styled-components/macro";
import { theme } from "./theme";



export const ActionButton = styled.button`
display: inline-block;
padding: 3px 4px 2px 4px;
/*margin: 3px 5.9px 3px 0px;*/
min-width: 52px;
min-height:40px;
border: none;
border-radius: 2px;
background-color: ${props => theme.BUTTON_ENABLED};
font-weight: bold;
font-size: inherit;
letter-spacing: inherit;
color: ${props => theme.BUTTON_TEXT_COLOR};
cursor: pointer;
&:disabled {
  background-color: ${props => theme.BUTTON_DISABLED};
  color: ${props => theme.BUTTON_DISABLED_TEXT_COLOR};
}
&:active {
  color: ${props => theme.BUTTON_ENABLED};
  background-color: ${props => theme.BUTTON_TEXT_COLOR};

}
`;
