import { Grid } from "@mui/material";
import { getHistoricalStockDataStatus, getStockInfoStatus } from "../../app/hooks";
import MiniAreaGraph from "./MiniAreaGraph";
import StockDetails from "./StockDetails";

export default function StockBase() {
  const stockInfoStatus = getStockInfoStatus();
  const historicalStockDataStatus = getHistoricalStockDataStatus();
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={7}>
        {(stockInfoStatus === 'succeeded') ? <StockDetails /> : (stockInfoStatus)}
      </Grid>
      <Grid item xs={12} md={4}>
        {(historicalStockDataStatus === 'succeeded') ? <MiniAreaGraph /> : (historicalStockDataStatus)}
      </Grid>
    </Grid>
  );
}
