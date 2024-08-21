import { combineReducers } from 'redux';

import PartnerRegisterReducer from './PartnerRegisterReducer.js';

const allReducers = combineReducers({
  partner_register:PartnerRegisterReducer,
  
});

export default allReducers;