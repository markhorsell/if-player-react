import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ImageDiv = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 36.3%;
  background-repeat: no-repeat;
  background-size: cover;
`;
interface IProps {
  path: string;
  image: string;
}

const RoomImage: React.SFC<IProps> = ({ path, image }) => (
  //const styleVal= "x"; //"url("+path+image+")";
  <ImageDiv style={{ backgroundImage: "url(" + path + image + ")" }} />
);

RoomImage.propTypes = {
  path: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default RoomImage;
