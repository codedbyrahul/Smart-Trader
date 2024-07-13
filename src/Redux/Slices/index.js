import {combineReducers} from 'redux';
import nseReducer from './nseSlices';
import chartReducer from './chartSlices';
import stockInfoReducer from './stockInfoSlices';
import indexReducer from './IndexSlices';
const rootReducer = combineReducers({
  nse: nseReducer,
  chart: chartReducer,
  stockInfo: stockInfoReducer,
  index: indexReducer,
});

export default rootReducer;
