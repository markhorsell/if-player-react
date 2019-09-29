
//export * from './actions_reddit';
//import fetch from 'isomorphic-fetch'

export const INIT_DATA = 'INIT_DATA';
export const RESULT_MESSAGE ='RESULT_MESSAGE';
export const RESULT_ROLL= 'RESULT_ROLL';
export const RESULT_SCORE ='RESULT_SCORE';
export const RESULT_TAKE ='RESULT_TAKE';
export const RESULT_DROP = 'RESULT_DROP';
export const RESULT_LOCATION ='RESULT_LOCATION';
export const RESULT_DESTROY = 'RESULT_DESTROY';
export const RESULT_MONEY ='RESULT_MONEY';
export const RESULT_ROOM_DESC='RESULT_ROOM_DESC';
export const RESULT_CREATE_EXIT='RESULT_CREATE_EXIT';
export const RESTART='RESTART';

export function restart(){
    return {
        type:RESTART,
        
    }
}

export function initData(data:string | number){
    console.log('is this just a room set?')
   
    return {
        type:INIT_DATA,
        data: data,
    }
}

export function resultSuccessRoll(data:boolean){
   
    return {
        type:RESULT_ROLL,
        
        data:data,
    }
}

export function resultMessage(data:string){
  
    return {
        type:RESULT_MESSAGE,
        data:data,
    }
}
export function resultScore(data:number){
   //shivers doesnt dispatch any "changeScore" events in json..
   //.. but other ganes could
   
    return {
        type:RESULT_SCORE,
        data:data,
    }
}
export function resultTake(data:Array<string>){
   
    return {
        type:RESULT_TAKE,
        data:data,
    }
}
export function resultDrop(data:Array<string>){
 
    return {
        type:RESULT_DROP,
        data:data,
    }
}


export function resultLocation(data:string | number){
 
    return {
        type:RESULT_LOCATION,
        data:data,
    }
}
export function resultDestroy(data:Array<string>){
   
    return {
        type:RESULT_DESTROY,
        data:data,
    }
}

export function resultMoney(data:number){
   
    return {
        type:RESULT_MONEY,
        data:data,
    }
}
export function resultRoomDesc(data:string){
    //called when desc changes, The miller, his wife and the babdy
    
    return {
        type:RESULT_ROOM_DESC,
        data:data,
    }
}
interface ICreateExit  {
    dir:string;
    toRoom:string;
}
export function resultCreateExit(data:ICreateExit){
   
    return {
        type:RESULT_CREATE_EXIT,
        data:data,
    }
}