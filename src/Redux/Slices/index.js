import {combineReducers} from 'redux';
import nseReducer from './nseSlices';
import chartReducer from './chartSlices';
import stockInfoReducer from './stockInfoSlices';
const rootReducer = combineReducers({
  nse: nseReducer,
  chart: chartReducer,
  stockInfo: stockInfoReducer,
});

export default rootReducer;
