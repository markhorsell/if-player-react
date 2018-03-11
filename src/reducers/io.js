
import {
  INIT_DATA,


} from '../actions'


export function gameData(state = {}, action) {

  console.log('io.js - categories');
  console.log(action.type);
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        gameTitle: action.data.gameTitle,
        score: action.data.score,
        money: action.data.money,
        room: action.data.room,
        discoveredPaths: action.data.discoveredPaths,
        move: action.data.move,
        rooms: action.data.rooms,
        actions: action.data.actions,
        objects: action.data.objects,
      }


    default:
      return state
  }
}

