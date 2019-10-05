import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { IItem } from "../types"
import styled from "styled-components/macro"

const LocationObjectsDiv = styled.div`
  margin-top:10px;
	margin-bottom:10px;
`;
type IProps = {
  items: Array<IItem>;
}

const LocationObjects: FunctionComponent<IProps> = ({ items = [] }) => {
  const locationObjects = items
    .filter((item: IItem) => {
      return item.show !== false;
    })
    .map((item: IItem) => {
      return item.desc;
    })
    .join(", ");
  return (
    <LocationObjectsDiv>
      <div>In this place :</div>
      {locationObjects.length > 0 ? (
        <div>{locationObjects}.</div>
      ) : (
          <div>Nothing of interest.</div>
        )}
    </LocationObjectsDiv>
  );
};
LocationObjects.propTypes = {
  items: PropTypes.array.isRequired
};

export default LocationObjects;
