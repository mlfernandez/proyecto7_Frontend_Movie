import {ADMINMOVIE, ADMINUSER, DELETE, GETCOMINGSOON, GETTOPRATED, SEARCHBYGENRE, SEARCHBYTITLE, SEARCHBYID, GETSEARCH, LOGIN, LOGOUT, ORDER, PROFILE} from '../types';
const initialState = 
    'profile'
;
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return action.payload;
        case LOGOUT:
            return initialState;
        case PROFILE:
            return action.payload;
        case GETTOPRATED:
            return action.payload;   
        case GETCOMINGSOON:
            return action.payload;  
        case SEARCHBYGENRE:
            return action.payload;     
        case SEARCHBYTITLE:
            return action.payload;   
        case SEARCHBYID:
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