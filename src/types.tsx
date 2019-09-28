export interface IState {
  gameData: {
    gameTitle: string;
    score: number;
    money: number;
    room: number | string;
    lastMessage: string;
    discoveredPaths: any;
    move: any;
    rooms: any;
    actions: any;
    objects: Array<IItem>;
  }
}
export interface IRoomData {
  desc: Array<string>;
  exits: Object;
  id: string;
  image: string;
  showOnMap: boolean;
}
export interface IItem {
  desc: string;
  loc: string;
  obj: string;
  show?:boolean;
}