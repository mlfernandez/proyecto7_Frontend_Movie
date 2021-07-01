import {ADMINMOVIE, ADMINUSER, DELETE, GETCOMINGSOON, GETTOPRATED, GETSEARCH, LOGIN, LOGOUT, GETPROFILE, GETORDER, GETALLORDERS, GETALLUSERS, UPDATEORDERS, UPDATEUSERS, FAQ} from '../types';
const initialState = 
    'getprofile'
;
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
/*         case LOGIN :
            return action.payload;
        case LOGOUT:
            return initialState; */
        case GETPROFILE:
            return action.payload;
        case GETTOPRATED:
            return action.payload;   
        case GETCOMINGSOON:
            return action.payload;                                   
        case GETSEARCH:
            return action.payload;     
        case GETALLUSERS:
            return action.payload;  
        case UPDATEUSERS:
            return action.payload;  
        case GETALLORDERS:
            return action.payload;  
        case UPDATEORDERS:
            return action.payload;               
        case GETORDER:
            return action.payload; 
        case FAQ:
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