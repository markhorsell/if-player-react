import React, {  } from "react";
import { connect, useDispatch} from "react-redux";

import styled from "styled-components/macro";

import { ActionButton } from "../styled-constants";
import { getRoomData, getAllowedExits } from "../utils/dataHelper";
import { resultMessage, resultLocation } from "../actions";

const ActionsDiv = styled.div`
  display: inline-block;
  vertical-align: top;
`;
interface IProps {
  rooms: Array<string>;
  room: any;
  dispatch: Function;
}

const ExploreActions: React.SFC<IProps> = ({ room, rooms }) => {

  const dispatch = useDispatch();

  const handleMove = (exit: string) => (e: any) => {
    //const { rooms, room } = this.props;

    const currentRoomExits = getRoomData(room, rooms).exits;
    e.preventDefault();
    switch (exit) {
      case "Up":
        dispatch(resultLocation(currentRoomExits.u));
        dispatch(resultMessage("You've travelled Up"));
        break;
      case "Down":
        dispatch(resultLocation(currentRoomExits.d));
        dispatch(resultMessage("You've travelled Down"));
        break;
      case "North":
        dispatch(resultLocation(currentRoomExits.n));
        dispatch(resultMessage("You've travelled North"));
        break;
      case "South":
        dispatch(resultLocation(currentRoomExits.s));
        dispatch(resultMessage("You've travelled South"));
        break;
      case "West":
        dispatch(resultLocation(currentRoomExits.w));
        dispatch(resultMessage("You've travelled West"));
        break;
      case "East":
        dispatch(resultLocation(currentRoomExits.e));
        dispatch(resultMessage("You've travelled East"));
        break;
      default:
        console.warn("WARNING - EXIT = [" + exit + "] is not being processed!");
    }
  };

  const renderExits = (currentRoomData: any) => {
    //console.log(currentRoomData);
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
    const allowableExits = unsortedExits.filter((exit: any) => {
      return potentialExits.includes(exit);
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
              ? renderOpenExit("North")
              : renderClosedExit("North")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("West")
              ? renderOpenExit("West")
              : renderClosedExit("West")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("East")
              ? renderOpenExit("East")
              : renderClosedExit("East")}
          </div>
          <div>
            {allowableExits.includes("South")
              ? renderOpenExit("South")
              : renderClosedExit("South")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("Up")
              ? renderOpenExit("Up")
              : renderClosedExit("Up")}
          </div>
          <div style={{ display: "inline-block", width: "40%" }}>
            {allowableExits.includes("Down")
              ? renderOpenExit("Down")
              : renderClosedExit("Down")}
          </div>
        </div>
      </ActionsDiv>
    );
    //}
  };
  const renderOpenExit = (exit: string) => {
    return (
      <ActionButton key={exit} onClick={handleMove(exit)}>
        {exit}
      </ActionButton>
    );
  };
  const renderClosedExit = (exit: string) => {
    return (
      <ActionButton key={exit} disabled={true}>
        {exit}
      </ActionButton>
    );
  };


  const currentRoomData = getRoomData(room, rooms);

  return (
    <>{renderExits(currentRoomData)}</>
    )
  }


function mapStateToProps(state: any) {
  const { rooms, room } = state.gameData;
  return {
    rooms,
    room
  };
}
export default connect(mapStateToProps)(ExploreActions);
