
import {
  //INIT_DATA,
  RESULT_MESSAGE,
  RESULT_SCORE,
  RESULT_TAKE,
  RESULT_DROP,
  RESULT_LOCATION,
  RESULT_DESTROY,
  RESULT_MONEY,
  RESULT_ROOM_DESC,
  RESULT_CREATE_EXIT,
  RESTART,


} from '../actions';

import initialData from '../assets/theshivers/data.json';

export function gameData(state ={}, action) {

  switch (action.type) {

    
    case RESTART:
    //RestartData needs to be a copy not a reference! 
    const restartData =JSON.parse(JSON.stringify(initialData));
    

    return {...state,
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
        ...state, lastMessage: action.data

      }
    case RESULT_SCORE:
      return {
        ...state, score: state.score + action.data
      }
    case RESULT_TAKE:
      const updatedObjects = state.objects.map((obj) => {
        action.data.forEach(element => {
          if (obj.obj === element) {
            obj.loc = 'INV'
          }
        });
        return obj;
      });
      return {
        ...state, objects: [...updatedObjects]
      }
    case RESULT_DROP:

      const droppedObjects = state.objects.map((obj) => {
        action.data.forEach(element => {
          if (obj.obj === element) {
            obj.loc = state.room;
          }
        });
        return obj;
      });
      return {
        ...state, objects: [...droppedObjects]
      }
    case RESULT_LOCATION:

    const paths = state.discoveredPaths.concat();
    if(paths.indexOf(action.data)===-1){ 
      paths.push(action.data);
    }
      return {
        ...state, 
        room: action.data,
        discoveredPaths:paths
      }
    case RESULT_DESTROY:
      const updatedDestroyObjects = state.objects.map((obj) => {
        action.data.forEach(element => {
         
          if (obj.obj === element || element==='ALL') {
            obj.loc = ''
          }
        });

        return obj;

      });
      return {
        ...state, objects: [...updatedDestroyObjects]
      }
    case RESULT_MONEY:

      return {
        ...state, money: state.money + action.data
      }
    case RESULT_ROOM_DESC:
      const rooms = state.rooms.map((r) => {
        if (r.id === state.room) {
          r.desc = action.data
        }
        return r;
      });
      return {
        ...state, rooms: [...rooms]
      }
    case RESULT_CREATE_EXIT:
     
      const roomExits = state.rooms.map((r) => {
        if (r.id === state.room) {

          if (action.data.dir === 'e') {
            r.exits.e = action.data.toRoom;
          }
        }
        return r;
      });
      return {
        ...state, rooms: [...roomExits]
      }
    case (action.type.match(/^@@redux/) || {}).input: 
    case (action.type.match(/^@@INIT/) || {}).input: 
     // console.log('BUILT IN '+action.type);
      return state;

    default:
    //  console.log('REDUCER DIDNT PROCESS [' + action.type + ']');
      return state
  }
}

