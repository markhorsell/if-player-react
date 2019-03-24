import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import theme from "../theme";
import { ActionButton } from "../styled-constants";
import { getRoomData, getAllowedExits } from "../utils/dataHelper";
import { resultMessage, resultLocation } from "../actions";



const ActionsDiv = styled.div`
  display: inline-block;
  vertical-align: top;
`;

class ExploreActions extends Component {
  constructor(props) {
    super(props);
    //this.handleAction = this.handleAction.bind(this);
    //this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {}
  handleMove = exit => e => {
    const { rooms, room } = this.props;

    const currentRoomExits = getRoomData(room, rooms).exits;
    e.preventDefault();
    switch (exit) {
      case "Up":
        this.props.dispatch(resultLocation(currentRoomExits.u));
        this.props.dispatch(resultMessage("You've travelled Up"));
        break;
      case "Down":
        this.props.dispatch(resultLocation(currentRoomExits.d));
        this.props.dispatch(resultMessage("You've travelled Down"));
        break;
      case "North":
        this.props.dispatch(resultLocation(currentRoomExits.n));
        this.props.dispatch(resultMessage("You've travelled North"));
        break;
      case "South":
        this.props.dispatch(resultLocation(currentRoomExits.s));
        this.props.dispatch(resultMessage("You've travelled South"));
        break;
      case "West":
        this.props.dispatch(resultLocation(currentRoomExits.w));
        this.props.dispatch(resultMessage("You've travelled West"));
        break;
      case "East":
        this.props.dispatch(resultLocation(currentRoomExits.e));
        this.props.dispatch(resultMessage("You've travelled East"));
        break;
      default:
        console.warn("WARNING - EXIT = [" + exit + "] is not being processed!");
    }
  };

  renderExits = currentRoomData => {
    console.log(currentRoomData);
    const unsortedExits = getAllowedExits(currentRoomData).map(exit => {
      if (exit === "n") return "North";
      if (exit === "e") return "East";
      if (exit === "s") return "South";
      if (exit === "w") return "West";

      if (exit === "u") return "Up";
      if (exit === "d") return "Down";
      return null;
    });
    //However the data arrive always show n,s,w,e,u,d
    const potentialExits = ["North", "East", "South", "West", "Up", "Down"];
    const allowableExits = unsortedExits.filter(e => {
      return potentialExits.includes(e);
    });

   
    return (
      <ActionsDiv>
        <div
          style={{
            width: "140px",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <div>
            {allowableExits.includes("North")
              ? this.renderOpenExit("North")
              : this.renderClosedExit("North")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("West")
              ? this.renderOpenExit("West")
              : this.renderClosedExit("West")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("East")
              ? this.renderOpenExit("East")
              : this.renderClosedExit("East")}
          </div>
          <div>
            {allowableExits.includes("South")
              ? this.renderOpenExit("South")
              : this.renderClosedExit("South")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("Up")
              ? this.renderOpenExit("Up")
              : this.renderClosedExit("Up")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("Down")
              ? this.renderOpenExit("Down")
              : this.renderClosedExit("Down")}
          </div>
        </div>
      </ActionsDiv>
    );
    //}
  };
  renderOpenExit = exit => {
    return (
      <ActionButton key={exit} onClick={this.handleMove(exit)}>
        {exit}
      </ActionButton>
    );
  };
  renderClosedExit = exit => {
    return (
      <ActionButton key={exit} disabled={true}>
        {exit}
      </ActionButton>
    );
  };

  render() {
    //console.log('Actions rendered');
    const {rooms, room } = this.props;
    const currentRoomData = getRoomData(room, rooms);

    return <>{this.renderExits(currentRoomData)}</>;
  }
}
ExploreActions.propTypes = {
  objects: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  rooms: PropTypes.array.isRequired,
  room: PropTypes.string.isRequired,
  money: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  const { objects, actions, rooms, room, money } = state.gameData;

  return {
    objects,
    actions,
    rooms,
    room,
    money
  };
}
export default connect(mapStateToProps)(ExploreActions);