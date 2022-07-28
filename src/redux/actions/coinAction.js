import { ActionTypes } from "../constants/action-types";

export const setCoinss = (currency) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: currency,
  };
};

export const selectedCoin = (coin) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: coin,
  };
};

export const setCurrency = (currency) => {
  return {
    type: ActionTypes.CURRENCY,
    payload: currency,
  };
};
