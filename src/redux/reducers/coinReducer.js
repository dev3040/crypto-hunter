import { ActionTypes } from "../constants/action-types";
const intialState = {
  coins: [],
};

export const coinsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, coins: payload };
    default:
      return state;
  }
};

export const selectedCoinReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_PRODUCT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const currency = (
  state = { Currency: "INR", Symbol: "₹" },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.CURRENCY: {
      if (payload === "USD") {
        return { ...state, ...{ Currency: payload, Symbol: "$" } };
      } else if (payload === "INR")
        return { ...state, ...{ Currency: payload, Symbol: "₹" } };
      else return { ...state, ...payload };
    }

    default:
      return state;
  }
};
