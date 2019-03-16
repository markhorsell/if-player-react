import React from 'react';

import styled  from "styled-components"

const DebugDiv= styled.div`


`;



const Debug = ({ data}) => {


	const stringified = JSON.stringify(data);
	

	return (
		<div className="debug">{stringified}</div>
	)
}

export default Debug;