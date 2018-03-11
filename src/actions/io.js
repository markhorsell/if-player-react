
//export * from './actions_reddit';
import fetch from 'isomorphic-fetch'
export const INIT_DATA = 'INIT_DATA'

export function initData(data){
    console.log('action ');
    console.log(data);
    //Think it should return the reducer and the data
    return {
        type:INIT_DATA,
        data: data,
    }

}