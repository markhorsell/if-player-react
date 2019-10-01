import { gameData, emptyState } from "./ioReducer";
import * as actions from '../actions/';
//import { UPDATE_POST_SUCCESS } from '../actions/posts/updatePost';
//import expect from 'expect';
//import getPostMock from '../mocks/getPostMock';



//console.log(actions);

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(gameData(undefined, {})).toEqual(emptyState);
  });

  it("should handle RESULT_DESTROY", () => {
    const action = {
      type: actions.RESULT_DESTROY,
      data: ["HOOK"]
    };
   
    expect(gameData({...emptyState,room:"MOCK ROOM",objects:[{ desc: "",loc: "",obj: "HOOK", show:false}]}, action))
    .toEqual({...emptyState,room:"MOCK ROOM",objects:[{ desc: "",loc: "",obj: "HOOK", show:false}]});
  });
});
