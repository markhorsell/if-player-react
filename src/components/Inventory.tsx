import React, {FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled  from "styled-components/macro";
import { IItem } from "../types"

const InventoryDiv= styled.div`
	margin-top:10px;
	margin-bottom:10px;
`;
type IProps = {
	items:Array<IItem>;
	money:number;
}

const Inventory: FunctionComponent<IProps>  = ({ items = [],money=0 }) => {
	const inventory = items.map((item:IItem)=>{
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

