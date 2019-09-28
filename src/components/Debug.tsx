import React from "react";

import styled from "styled-components/macro";

const DebugDiv = styled.div`
  background:white;
  color:black;
`;
interface IDebug {
  debug:string;
}


const Debug: React.FC<IDebug>= ({debug}) => {
  return <DebugDiv>{debug}</DebugDiv>;
};

export default Debug;
