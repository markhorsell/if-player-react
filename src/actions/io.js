
//export * from './actions_reddit';
//import fetch from 'isomorphic-fetch'
export const INIT_DATA = 'INIT_DATA';
export const RESULT_MESSAGE ='RESULT_MESSAGE';
export const RESULT_SCORE ='RESULT_SCORE';
export const RESULT_TAKE ='RESULT_TAKE';
export const RESULT_DROP = 'RESULT_DROP';
export const RESULT_LOCATION ='RESULT_LOCATION';
export const RESULT_DESTROY = 'RESULT_DESTROY';
export const RESULT_MONEY ='RESULT_MONEY';
export const RESULT_ROOM_DESC='RESULT_ROOM_DESC';
export const RESULT_CREATE_EXIT='RESULT_CREATE_EXIT';

export function initData(data){
    return {
        type:INIT_DATA,
        data: data,
    }
}

export function resultMessage(data){
    return {
        type:RESULT_MESSAGE,
        data:data,
    }
}
export function resultScore(data){
    return {
        type:RESULT_SCORE,
        data:data,
    }
}
export function resultTake(data){
    return {
        type:RESULT_TAKE,
        data:data,
    }
}
export function resultDrop(data){
    return {
        type:RESULT_DROP,
        data:data,
    }
}

resultDrop
export function resultLocation(data){
    return {
        type:RESULT_LOCATION,
        data:data,
    }
}
export function resultDestroy(data){
    return {
        type:RESULT_DESTROY,
        data:data,
    }
}

export function resultMoney(data){
    return {
        type:RESULT_MONEY,
        data:data,
    }
}
export function resultRoomDesc(data){
    return {
        type:RESULT_ROOM_DESC,
        data:data,
    }
}
export function resultCreateExit(data){
    return {
        type:RESULT_CREATE_EXIT,
        data:data,
    }
}