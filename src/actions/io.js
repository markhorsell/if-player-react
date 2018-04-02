
//export * from './actions_reddit';
//import fetch from 'isomorphic-fetch'
export const INIT_DATA = 'INIT_DATA';
export const DO_ACTION ='DO_ACTION';

export function initData(data){
    return {
        type:INIT_DATA,
        data: data,
    }
}

export function doAction(actionResults){
    console.log('TODO parse the action results');
    let updatedGame = actionResults;
    return {
        type:DO_ACTION,
        data:updatedGame,
    }

}