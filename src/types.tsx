export interface IState {
  gameData: {
    gameTitle: string;
    score: number;
    money: number;
    room: number | string;
    lastMessage: string;
    discoveredPaths: any;
    move: any;
    rooms: Array<IRoomData>;
    actions: any;
    objects: Array<IItem>;
  }
}
export interface IGameState {
 
    gameTitle: string;
    score: number;
    money: number;
    room: number | string;
    lastMessage: string;
    discoveredPaths: any;
    move: any;
    rooms: Array<IRoomData>;
    actions: any;
    objects: Array<IItem>;
 
}
export interface IRoomData {
  desc: Array<string>;
  exits: any;
  id: string;
  image: string;
  showOnMap: boolean;
}
export interface IItem {
  desc: string;
  loc: string | number;
  obj: string;
  show?:boolean;
}
export interface IAction {
  action: string;
  conditions: any;
 results:any;
}
