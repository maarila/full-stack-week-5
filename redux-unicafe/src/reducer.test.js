import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  it("should return a proper initial state when called with undefined state", () => {
    const state = [];
    const action = {
      type: "DO_NOTHING"
    };

    deepFreeze(state);

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it("should return a proper state when called with action GOOD", () => {
    const state = initialState;
    const action = {
      type: "GOOD"
    };

    const targetState = {
      good: 1,
      ok: 0,
      bad: 0
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual(targetState);
  });

  it("should return a proper state when called with action OK", () => {
    const state = initialState;
    const action = {
      type: "OK"
    };

    const targetState = {
      good: 0,
      ok: 1,
      bad: 0
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual(targetState);
  });

  it("should return a proper state when called with action BAD", () => {
    const state = initialState;
    const action = {
      type: "BAD"
    };

    const targetState = {
      good: 0,
      ok: 0,
      bad: 1
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual(targetState);
  });

  it("should return a proper state when a more complex state is called with action GOOD", () => {
    const state = {
      good: 8,
      ok: 3,
      bad: 9
    };

    const action = {
      type: "GOOD"
    };

    const targetState = {
      good: 9,
      ok: 3,
      bad: 9
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual(targetState);
  });

  it("should return a proper state when called with action ZERO", () => {
    const state = {
      good: 8,
      ok: 3,
      bad: 9
    };
    const action = {
      type: "ZERO"
    };

    const targetState = {
      good: 0,
      ok: 0,
      bad: 0
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual(targetState);
  });
});
