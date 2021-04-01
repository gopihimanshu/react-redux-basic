/*  We should not mutate state direcly bcz in JS, Object is of reference type 
    So, direcly accessing "state" variable here, its better to create a clone or copy and then
    operate on that. For Ex:-
    
    const newState = state;
    newState.counter = counter + 1;
    return newState;

    In above example, many gets confuse that we copy state variable and operate on newState variable
    but technically you are operating on state object itself. Because you are just pointing to same Object
*/

/*
    In JS, there are two ways to create copy of that:-
    1. Object.assign({}, state);
    2. {...state} :- this is called Object Destructuring

    ***************
    Belowe I am doing in both ways, in increment I am using assign and decrement, I am using destructuring.
    One unique thing, one can notice in destructing way is that, we are updating counter with some value
    but now the question is what about existing counter property in state.So, in that case, while destructuring
    object, if property is same, it will just update the property and rest are same.
*/
import * as actionTypes from "./actions";

const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      const newState = Object.assign({}, state);
      newState.counter = state.counter + 1;
      return newState;
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value,
      };
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.value,
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: state.counter,
        }),
      };
    case actionTypes.DELETE_RESULT:
      /* Here also, we have an array and we can not mutate original array directly.
          So, we need to cretae new array and then delete the element and update array
          There are two ways:-
          1. Use splice method
          2. Use filter method:- filter method returns new array when condition is true.
        */
      //   const id = 2;
      //   const newArray = [...state.results];
      //   newArray.splice(id, 1);

      const updatedArray = state.results.filter(
        (result) => result.id !== action.resultElId
      );
      return {
        ...state,
        results: updatedArray,
      };
    default:
      return state;
  }
};

export default reducer;
