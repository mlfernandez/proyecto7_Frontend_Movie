import {ADMINMOVIE, ADMINUSER, DELETE, GETCOMINGSOON, GETTOPRATED, GETSEARCH, LOGIN, LOGOUT, ORDER, PROFILE} from '../types';
const initialState = 
    'profile'
;
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
/*         case LOGIN :
            return action.payload;
        case LOGOUT:
            return initialState; */
        case PROFILE:
            return action.payload;
        case GETTOPRATED:
            return action.payload;   
        case GETCOMINGSOON:
            return action.payload;                                   
        case GETSEARCH:
            return action.payload;      
        case ORDER:
            return action.payload; 
        case ADMINMOVIE:
            return action.payload;    
        case ADMINUSER:
            return action.payload;           
        case DELETE:
            return initialState;
        default : 
            return state
    }
}
export default tipodatosReducer;