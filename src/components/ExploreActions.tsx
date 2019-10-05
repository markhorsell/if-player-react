import React, { } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { ActionButton } from "../styled-constants";
import { getRoomData, getAllowedExits } from "../utils/dataHelper";
import { resultMessage, resultLocation } from "../actions";
import { IState, IRoomData } from "../types"

const ActionsDiv = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const MoveButton = styled(ActionButton)`
  margin:5px;
`;
interface IExits {
  n: string;
  e: string;
  s: string;
  w: string;
  u: string;
  d: string;
}

const ExploreActions: React.SFC = () => {

  const dispatch = useDispatch();
  const roomID: number | string = useSelector((state: IState) => state.gameData.room);
  const rooms: Array<IRoomData> = useSelector((state: IState) => state.gameData.rooms);

  const handleMove = (selectedExit: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentRoomExits: IExits = getRoomData(roomID, rooms).exits;
    //console.log(currentRoomExits)
    e.preventDefault();
    switch (selectedExit) {
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
        console.warn("WARNING - EXIT = [" + selectedExit + "] is not being processed!");
    }
  };

  const currentRoomData: IRoomData = getRoomData(roomID, rooms);
  const exits = getAllowedExits(currentRoomData);
  return (
    <ActionsDiv>
      <div
        style={{
          width: "140px",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        <MoveButton disabled={!exits.includes("n")} onClick={handleMove("North")}>
          North
            </MoveButton>
        <div>
          <div style={{ display: "inline-block", width: "50%" }}>
            <MoveButton disabled={!exits.includes("w")} onClick={handleMove("West")}>
              West
            </MoveButton>
          </div>
          <div style={{ display: "inline-block", width: "50%" }}>
            <MoveButton disabled={!exits.includes("e")} onClick={handleMove("East")}>
              East
            </MoveButton>
          </div>
        </div>
        <MoveButton disabled={!exits.includes("s")} onClick={handleMove("South")}>
          South
            </MoveButton>
        <div>
          <div style={{ display: "inline-block", width: "50%" }}>
            <MoveButton disabled={!exits.includes("u")} onClick={handleMove("Up")}>
              Up
            </MoveButton>
          </div>
          <div style={{ display: "inline-block", width: "50%" }}>
            <MoveButton disabled={!exits.includes("d")} onClick={handleMove("Down")}>
              Down
            </MoveButton>
          </div>
        </div>
      </div>
    </ActionsDiv>
  );
};

export default ExploreActions;
