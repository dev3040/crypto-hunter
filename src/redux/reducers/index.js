import { combineReducers } from "redux";
import {
  coinsReducer,
  currency,
  historicDataReducer,
  selectedCoinReducer,
  trendingCoins,
} from "./coinReducer";
const reducers = combineReducers({
  allCoins: coinsReducer,
  coin: selectedCoinReducer,
  currency: currency,
  trendingCoins: trendingCoins,
  historicData:historicDataReducer
});
export default reducers;
