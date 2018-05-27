import React from 'react';



const Debug = ({ data}) => {


	const stringified = JSON.stringify(data);
	

	return (
		<div className="debug">{stringified}</div>
	)
}

export default Debug;