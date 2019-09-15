import React, { Fragment } from "react";
import { connect } from "react-redux";

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

interface IProps {
  rooms: Array<string>;
  room: any;
  objects:Array<string>;
  actions:Array<string>
   money :number;
  dispatch: Function;
}
/*
type IProps = {
	items:Array<any>;
	money:number;
}
*/




const Actions: React.SFC<IProps> =({objects, actions, room, rooms, money, dispatch}) => {
  /*
  static propTypes = {
    objects: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    room: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired
  };
  static defaultProps ={
    objects:[],
    actions:[],
    rooms:[],
    room:{},
    money:0,
  }
  */



   
  const handleAction = (action:string) => (e:any) => {
    e.preventDefault();

    //const { objects, actions, room, money } = this.props;

    const allowableActions = getAllowedActions(
      objects,
      actions,
      room,
      money
    ).map(action => {
      return action;
    });
    const results = allowableActions.filter(a => {
      return a.action === action;
    })[0].results;

    for (var key of Object.keys(results)) {
      dispatchResults(key, results[key]);
    }
  };
  const dispatchResults = (key:string, data:any)=> {
    
    switch (key) {
      case "createExitOnRollSuccess":
        const roll = Math.ceil(Math.random() * data.sides);

        console.log(roll, data.sides);
        if (roll === data.sides) {
          dispatch(resultSuccessRoll(roll === data.sides));

         dispatch(resultCreateExit(data));

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
        console.warn("WARNING result = [" + key + "] is not being processed!");
    }
  }
  

    //console.log('Actions rendered');
    //const { objects, actions, rooms, room, money } = this.props;
    //const currentRoomData = getRoomData(room, rooms);

    const allowableActions = getAllowedActions(
      objects,
      actions,
      room,
      money
    ).map(action => {
      return action.action;
    });

    return (
      <Fragment>
    
          {allowableActions.length > 0 &&
            allowableActions.map((action, index) => {
              return (
                <ActionButton  key={index} onClick={handleAction(action)}>
                  {action}
                </ActionButton >
              );
            })}
     
      </Fragment>
    );
  }



function mapStateToProps(state:any) {
  const { objects, actions, rooms, room, money } = state.gameData;

  //console.log(actions);
  return {
    objects,
    actions,
    rooms,
    room,
    money
  };
}
//mapDispatchToProps() is a utility which will help your component to fire an action event (dispatching action which may cause change of application state)
export default connect(mapStateToProps)(Actions);
