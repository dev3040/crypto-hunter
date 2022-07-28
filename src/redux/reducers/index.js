import { combineReducers } from "redux";
import { coinsReducer,currency,selectedCoinReducer } from "./coinReducer";
const reducers = combineReducers({
  allCoins: coinsReducer,
  coin: selectedCoinReducer,
  currency:currency
});
export default reducers;
