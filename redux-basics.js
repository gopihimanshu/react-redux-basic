const redux = require("redux");

const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  if (action.type == "INC_COUNTER") {
    const newState = { ...state };
    newState.counter = newState.counter + 1;
    return newState;
  }
  if (action.type == "ADD_COUNTER") {
    const newState = { ...state };
    newState.counter = newState.counter + action.value;
    return newState;
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

// Dispatching Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
