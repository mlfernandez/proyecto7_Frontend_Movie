import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import tipodatos from './tipodatos-reducer';
import movie from './movie-reducer';
import user from './user-reducer';



const rootReducer = combineReducers({
    credentials,
    tipodatos,
    movie,
    user,



   
});

export default rootReducer;