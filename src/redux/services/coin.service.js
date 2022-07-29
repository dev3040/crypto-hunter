import axios from "axios";
import { CoinList, HistoricalChart, SingleCoin, TrendingCoins } from "../../config/api";
export const getAllCoin = async (currency) => {
    return await axios.get(CoinList(currency));
};

export const getCoin = async(id)=>{
    return await axios.get(SingleCoin(id))
}

export const getHistoricalChart = async(coin_id, days, currency)=>{
    return await axios.get(HistoricalChart(coin_id, days, currency))
}

export const getTrendingCoins = async(currency)=>{
    return await axios.get(TrendingCoins(currency))
}