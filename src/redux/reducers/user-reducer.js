import { USER } from "../types";

const initialState = {
  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;