
//export * from './actions_reddit';
//import fetch from 'isomorphic-fetch'
export const INIT_DATA = 'INIT_DATA';
export const RESULT_MESSAGE ='RESULT_MESSAGE';
export const RESULT_SCORE ='RESULT_SCORE';

export function initData(data){
    return {
        type:INIT_DATA,
        data: data,
    }
}

export function resultMessage(data){
    console.log('TODO parse the message update ['+data+']');
    return {
        type:RESULT_MESSAGE,
        data:data,
    }
}
export function resultScore(data){
    console.log('resultScore action');
    return {
        type:RESULT_SCORE,
        data:data,
    }

}