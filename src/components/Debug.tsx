import React from "react";

import styled from "styled-components/macro";

const DebugDiv = styled.div`
background:white;
color:black;
`;


const Debug: React.FC<any> = (props: any) => {
  const stringified = JSON.stringify(props.data);

  return <DebugDiv>{stringified}</DebugDiv>;
};

export default Debug;
