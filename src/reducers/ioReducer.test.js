import { gameData, emptyState } from "./ioReducer";
import * as actions from "../actions/";

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(gameData(undefined, {})).toEqual(emptyState);
  });

  it("should handle RESULT_DESTROY", () => {
    const action = {
      type: actions.RESULT_DESTROY,
      data: ["HOOK"]
    };
    expect(
      gameData(
        {
          ...emptyState,
          room: "MOCK ROOM",
          objects: [{ desc: "", loc: "", obj: "HOOK", show: false }]
        },
        action
      )
    ).toEqual({
      ...emptyState,
      room: "MOCK ROOM",
      objects: [{ desc: "", loc: "", obj: "HOOK", show: false }]
    });
  });
  it("should handle RESULT_TAKE", () => {
    const action = {
      type: actions.RESULT_TAKE,
      data: ["HOOK"]
    };
    expect(
      gameData(
        {
          ...emptyState,
          room: "MOCK ROOM",
          objects: [{ desc: "", loc: "MOCK ROOM", obj: "HOOK", show: false }]
        },
        action
      )
    ).toEqual({
      ...emptyState,
      room: "MOCK ROOM",
      objects: [{ desc: "", loc: "INV", obj: "HOOK", show: false }]
    });
  });
  it("should handle RESULT_DROP", () => {
    const action = {
      type: actions.RESULT_DROP,
      data: ["HOOK"]
    };
    expect(
      gameData(
        {
          ...emptyState,
          room: "MOCK ROOM",
          objects: [{ desc: "", loc: "INV", obj: "HOOK", show: false }]
        },
        action
      )
    ).toEqual({
      ...emptyState,
      room: "MOCK ROOM",
      objects: [{ desc: "", loc: "MOCK ROOM", obj: "HOOK", show: false }]
    });
  });
});
