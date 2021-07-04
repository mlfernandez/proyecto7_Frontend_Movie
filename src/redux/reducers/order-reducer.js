import { ORDER } from "../types";

const initialState = {
  
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER:
      return action.payload;

    default:
      return state;
  }
};

export default orderReducer;