import { Grid, Typography } from "@mui/material";
import { getStockInfo } from "../../app/hooks";
import HighLowSlider from "./HighLowSlider";
import countryCurrencyMap from "../../media/jsonData/Country_Currency_map.json";

function StockDetails() {
  const stockInfo = getStockInfo();

  function DisplayPercentageChange() {
    let percentageChange = stockInfo?.percentageChange
      ? stockInfo?.percentageChange.toPrecision(4)
      : 0;
    if (percentageChange >= 0) {
      return (
        <Typography variant="body1" color="green">
          {percentageChange}%
        </Typography>
      );
    } else if (percentageChange) {
      return (
        <Typography variant="body1" color="red">
          {percentageChange}%
        </Typography>
      );
    }
    return null;
  }

  function convertUnicode(input: string) {
    return input.replace(/\\u[0-9a-fA-F]{4}/g, function (a, b) {
      var charcode = parseInt(b, 16);
      return String.fromCharCode(charcode);
    });
  }

  const getCurrencySymbol = (
    country: string | undefined,
    map: { [key: string]: any }
  ) => {
    return country ? convertUnicode(map[country]) : "$";
  };

  return (
    <Grid container margin={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" marginBottom={2}>
          {stockInfo?.stockName}
        </Typography>
        <Typography variant="h2">
          <span
            dangerouslySetInnerHTML={{
              __html: getCurrencySymbol(
                stockInfo?.financialCurrency,
                countryCurrencyMap
              ),
            }}
          ></span>
          {stockInfo?.price}
        </Typography>
        <DisplayPercentageChange />
        <Typography variant="body2">
          As on {new Date().toDateString()} | {new Date().toLocaleTimeString()}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} marginTop={4}>
        <HighLowSlider />
      </Grid>
    </Grid>
  );
}

export default StockDetails;
