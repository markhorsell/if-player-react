

import {
  //INIT_DATA,
  RESULT_ROLL,
  RESULT_MESSAGE,
  RESULT_SCORE,
  RESULT_TAKE,
  RESULT_DROP,
  RESULT_LOCATION,
  RESULT_DESTROY,
  RESULT_MONEY,
  RESULT_ROOM_DESC,
  RESULT_CREATE_EXIT,
  RESTART
} from "../actions";

import { IRoomData, IItem, /*IAction, */ IGameState} from "../types";

import initialData from "../assets/theshivers/data.json";

interface IReduxAction {
 type:string;
 data:any;
}

export const emptyState = {

    gameTitle: "",
    score: 0,
    money: 0,
    room: 0,
    lastMessage: "",
    discoveredPaths: "",
    move: 0,
    rooms: [],
    actions: "",
    objects: []
  
}


export function gameData(state:IGameState = emptyState, action:IReduxAction) {
  //console.log(state)
  if(!action.type){
    //To satisfy testing.. needs work
    return emptyState
  }
  //any action is a move

 
  switch (action.type) {
    case RESTART:
      //RestartData needs to be a copy not a reference!
      const restartData = JSON.parse(JSON.stringify(initialData));
     
      return {
        ...state,
        gameTitle: restartData.gameTitle,
        score: restartData.score,
        money: restartData.money,
        room: restartData.room,
        lastMessage: restartData.lastMessage,
        discoveredPaths: restartData.discoveredPaths,
        move: restartData.move,
        rooms: restartData.rooms,
        actions: restartData.actions,
        objects: restartData.objects,
      };

    case RESULT_MESSAGE:
      return {
        ...state,
        lastMessage: action.data
      };
    case RESULT_ROLL: 
    //console.log('RESULT_ROLL'+action.data)
      return {
        ...state,
        roll: action.data
    }
    case RESULT_SCORE:
      return {
        ...state,
        score: state.score + action.data
      };
    case RESULT_TAKE:
      const updatedObjects = state.objects.map((obj:IItem)  => {
        action.data.forEach((itemID:string) => {
          if (obj.obj === itemID) {
            obj.loc = "INV";
          }
        });
        return obj;
      });
      return {
        ...state,
        objects: [...updatedObjects],
       
      };
    case RESULT_DROP:
      const droppedObjects = state.objects.map((obj:IItem) => {
        action.data.forEach((itemID:string) => {
          if (obj.obj === itemID) {
            obj.loc = state.room;
          }
        });
        return obj;
      });
      return {
        ...state,
        objects: [...droppedObjects],
       
      };
    case RESULT_LOCATION:
      const paths = state.discoveredPaths.concat();
      if (paths.indexOf(action.data) === -1) {
        paths.push(action.data);
      }
      return {
        ...state,
        room: action.data,
        discoveredPaths: paths,
        move:++state.move
      };
    case RESULT_DESTROY:
      const updatedDestroyObjects = state.objects.map((obj:IItem) => {
        action.data.forEach((itemID:string) => {
          if (obj.obj === itemID || itemID === "ALL") {
            obj.loc = "";
          }
        });

        return obj;
      });
      return {
        ...state,
        objects: [...updatedDestroyObjects]
      };
    case RESULT_MONEY:
      return {
        ...state,
        money: state.money + action.data
      };
    case RESULT_ROOM_DESC:
      const rooms = state.rooms.map((r:IRoomData) => {
        if (r.id === state.room) {
          r.desc = action.data;
        }
        return r;
      });
      return {
        ...state,
        rooms: [...rooms]
      };
    case RESULT_CREATE_EXIT:
      const roomExits = state.rooms.map((r:IRoomData) => {
        if (r.id === state.room) {
          if (action.data.dir === "e") {
            r.exits.e = action.data.toRoom;
          }
          if (action.data.dir === "w") {
            r.exits.w = action.data.toRoom;
          }
          if (action.data.dir === "n") {
            r.exits.n = action.data.toRoom;
          }
          if (action.data.dir === "s") {
            r.exits.s = action.data.toRoom;
          }
        }
        return r;
      });
      return {
        ...state,
        rooms: [...roomExits]
      };
      
    case (action.type.match(/^@@redux/) || {}).input:
    case (action.type.match(/^@@INIT/) || {}).input:
      // console.log('BUILT IN '+action.type);
      return state;

    default:
      //  console.log('REDUCER DIDNT PROCESS [' + action.type + ']');
      return state;
  }
}
