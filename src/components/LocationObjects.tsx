import React from "react";
import PropTypes from "prop-types";

import styled  from "styled-components"

const LocationObjectsDiv = styled.div`
    	margin-top:10px;
	margin-bottom:10px;
`;

const LocationObjects = ({ items = [] }) => {
  const locationObjects = items
    .filter((item: any) => {
      return item.show !== false;
    })
    .map((item: any) => {
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
