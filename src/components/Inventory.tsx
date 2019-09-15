import React from 'react';
import PropTypes from 'prop-types';
import styled  from "styled-components/macro"

const InventoryDiv= styled.div`
	margin-top:10px;
	margin-bottom:10px;
`;
type IProps = {
	items:Array<any>;
	money:number;
}

const Inventory: React.SFC<IProps>  = ({ items = [],money=0 }) => {
	const inventory = items.map((item:any)=>{
		return item.desc;
	}).join(", ")+' and '+money+' coins.';
	
	return (
	
		<InventoryDiv>
		<div>You are carrying :</div>
		<div>{inventory}</div>
		</InventoryDiv>
	
	)
}
Inventory.propTypes = {
	items: PropTypes.array.isRequired,
}

export default Inventory;

