import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch,useSelector } from "react-redux";
import { chartDays } from "../config/data";
import { getHistoricalChart } from "../redux/services/coin.service";
import SelectButton from "./SelectButton";
import { setHistoricalData } from "../redux/actions/coinAction";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));
function CoinInfo({ coin }) {
  const dispatch = useDispatch();
  const historicData = useSelector((state) => state.historicData.data);
  console.log(historicData,"---");
  const currency = useSelector((state) => state.currency.Currency);
  const [days, setDays] = useState(1);
  // const { currency } = CryptoState();
  const fetchHistoricData = async () => {
    const { data } = await getHistoricalChart(coin.id, days, currency);
    dispatch(setHistoricalData(data));
  };
  // console.log(historicData);
  useEffect(() => {
    // eslint-disable-next-line
    fetchHistoricData();
    // eslint-disable-next-line
  }, [currency, days]);

  const classes = useStyles();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData?.market_caps ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          ></CircularProgress>
        ) : (
          <>
            <Line
              data={{
                labels: historicData?.market_caps.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData?.market_caps.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    // setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
