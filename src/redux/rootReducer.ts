import { combineReducers } from 'redux';

import DataAltaReducer from './DatAlta/DataAltaReducer';




const rootReducer = combineReducers({
    
    dataAlta:DataAltaReducer,
})

export default rootReducer