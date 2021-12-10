import { Grid, Typography } from "@mui/material";
import { getStockInfo } from "../../app/hooks";
import HighLowSlider from "./HighLowSlider";

function StockDetails() {
  const stockInfo = getStockInfo();

  function DisplayPercentageChange() {
    if (stockInfo?.percentageChange && stockInfo.percentageChange >= 0) {
      return (
        <Typography variant="body1" color="green">
          {stockInfo.percentageChange}%
        </Typography>
      );
    } else if (stockInfo?.percentageChange) {
      return (
        <Typography variant="body1" color="red">
          {stockInfo.percentageChange}%
        </Typography>
      );
    }
    return null;
  }

  return (
    <Grid container margin={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" marginBottom={2}>{stockInfo?.stockName}</Typography>
        <Typography variant="h2">${stockInfo?.price}</Typography>
        <DisplayPercentageChange />
		<Typography variant="body2">As on {new Date().toDateString()} | {new Date().toLocaleTimeString()}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} marginTop={4}>
        <HighLowSlider />
      </Grid>
    </Grid>
  );
}

export default StockDetails;