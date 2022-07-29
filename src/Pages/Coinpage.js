import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { numberWithCommas } from "../config/utils";
import { useDispatch, useSelector } from "react-redux";
import { getCoin } from "../redux/services/coin.service";
import { selectedCoin } from "../redux/actions/coinAction";
const parse = require("html-react-parser");
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    paddingBottom: 0,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));
function Coinpage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const coin = useSelector((state) => state.coin);
  const currency = useSelector((state) => state.currency);
  const fetchCoins = async () => {
    const { data } = await getCoin(id);
    dispatch(selectedCoin(data));
  };
  useEffect(() => {
    // eslint-disable-next-line
    fetchCoins();
    // eslint-disable-next-line
  }, []);
  if (!coin.id) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  else
    return (
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {parse(`${coin?.description.en.split(". ")[0]}`)}.
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>
          </div>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {currency.Symbol + " "}
                {numberWithCommas(
                  coin?.market_data?.current_price[
                    currency.Currency.toLowerCase()
                  ].toFixed(2)
                )}
              </Typography>
            </span>
          </div>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {currency.Symbol + " "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.Currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </div>
        </div>
        {/* chart */}
        <CoinInfo coin={coin} />
      </div>
    );
}

export default Coinpage;
