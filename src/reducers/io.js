
import {
  INIT_DATA,
  RESULT_MESSAGE,
  RESULT_SCORE,


} from '../actions'


export function gameData(state = {}, action) {
  console.log('find reduder for : ' + action.type);
  console.log('passed data ' + action.data);
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        gameTitle: action.data.gameTitle,
        score: action.data.score,
        money: action.data.money,
        room: action.data.room,
        lastMessage: action.data.lastMessage,
        discoveredPaths: action.data.discoveredPaths,
        move: action.data.move,
        rooms: action.data.rooms,
        actions: action.data.actions,
        objects: action.data.objects,
      }
    case RESULT_MESSAGE:
      return {
        ...state, lastMessage: action.data

      }
    case RESULT_SCORE:
      return {
        ...state, score: state.score + action.data
      }


    default:
      return state
  }
}

