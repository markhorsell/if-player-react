import React, { FunctionComponent , Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { ActionButton } from "../styled-constants";
import {
  //getRoomData,
  getAllowedActions,
} from "../utils/dataHelper";
import {
  resultSuccessRoll,
  resultMessage,
  resultScore,
  resultTake,
  resultDrop,
  resultLocation,
  resultDestroy,
  resultMoney,
  resultRoomDesc,
  resultCreateExit,
  restart
} from "../actions";

import { IState, IItem, IAction } from "../types";

const GameActionButton= styled(ActionButton)`
  margin:5px;
`;

const Actions: FunctionComponent  = () => {

  const dispatch = useDispatch();

  const objects: Array<IItem> = useSelector((state: IState) => state.gameData.objects);
  const actions: Array<IAction> = useSelector((state: IState) => state.gameData.actions);
  const room: number | string = useSelector((state: IState) => state.gameData.room);
  const money: number = useSelector((state: IState) => state.gameData.money);


  const handleAction = (gameActionName: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    //console.log(gameActionName)
    e.preventDefault();
    const allowableActions: Array<IAction> = getAllowedActions(
      objects,
      actions,
      room,
      money
    )
   
    const results = allowableActions.filter((a:IAction) => {
      return a.action === gameActionName;
    });
    if(results.length!==1){
      console.log("More than one action was matched: you should combine results instead")
    }
 

    for (let key of Object.keys(results[0].results)) {
      //console.log("Dispatch 1 or more Results from handle Action")
      dispatchResults(key, results[0].results[key]);
    }
  };

  const dispatchResults = (gameActionName: string, data: any) => {
    //console.log("action data is different for each action response - so any is fine for now");
    switch (gameActionName) {
      case "createExitOnRollSuccess":
        const roll:number = Math.ceil(Math.random() * data.sides);

        //console.log(roll, data.sides);
        if (roll === data.sides) {
          dispatch(resultSuccessRoll(roll === data.sides));

          dispatch(resultCreateExit({ dir: data.dir, toRoom: data.toRoom }));

          //rollmMssage
          dispatch(
            resultMessage(
              "You rolled a " +
              roll +
              " from a " +
              data.sides +
              " sided dice. " +
              data.rollMessage
            )
          );
        } else {
          dispatch(
            resultMessage(
              "You rolled a " + roll + " from a " + data.sides + " sided dice. "
            )
          );
        }

        break;

      case "message":
        dispatch(resultMessage(data));
        break;
      case "take":
        dispatch(resultTake(data));
        break;
      case "drop":
        dispatch(resultDrop(data));
        break;
      case "changeScore":
        dispatch(resultScore(data));
        break;
      case "changeLocation":
        dispatch(resultLocation(data));
        break;
      case "destroys":
        dispatch(resultDestroy(data));
        break;
      case "addMoney":
        dispatch(resultMoney(data));
        break;
      case "removeMoney":
        dispatch(resultMoney(-data));
        break;
      case "changeRoomDesc":
        dispatch(resultRoomDesc(data));
        break;
      case "createExit":
        dispatch(resultCreateExit(data));
        break;
      case "restart":
        dispatch(restart());

        break;
      default:
        console.warn("WARNING result = [" + gameActionName + "] is not being processed!");
    }
  }

  const allowableActions: Array<IAction> = getAllowedActions(
    objects,
    actions,
    room,
    money
  )


  return (
    <Fragment>

      {allowableActions.length > 0 &&
        allowableActions.map((action, index) => {
          return (
            <GameActionButton key={index} onClick={handleAction(action.action)}>
              {action.action}
            </GameActionButton >
          );
        })}

    </Fragment>
  );
}

export default Actions;
