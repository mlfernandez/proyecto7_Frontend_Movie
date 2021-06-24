import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import tipodatos from './tipodatos-reducer'
/* import getroomusers from './getroomuser-reducer';
;
import getroommonitor from './getroommonitor-reducer';
import editroom from './editroom-reducer'; */

const rootReducer = combineReducers({
    credentials,
    tipodatos,


   
});

export default rootReducer;