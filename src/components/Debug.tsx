import React from "react";

import styled from "styled-components";

const DebugDiv = styled.div``;

type Props = {
	data:any
}

const Debug = ({ data }:Props) => {
  const stringified = JSON.stringify(data);

  return <div className="debug">{stringified}</div>;
};

export default Debug;
