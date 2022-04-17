import { Grid } from "@mui/material";
import { getHistoricalStockDataStatus, getStockInfoStatus, getStockNewsStatus } from "../../app/hooks";
import AboutBase from "../About/AboutBase";
import CandleStickGraph from "./CandleStickGraph";
import CustomCollapseComponent from "./CustomCollapseComponent";
import DisplayStockNews from "./DisplayStockNews";
import MiniAreaGraph from "./MiniAreaGraph";
import StockDetails from "./StockDetails";

export default function StockBase() {
  const stockInfoStatus = getStockInfoStatus();
  const historicalStockDataStatus = getHistoricalStockDataStatus();
  const stockNewsStatus = getStockNewsStatus();

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={7}>
        {(stockInfoStatus === 'succeeded') ? <StockDetails /> : (stockInfoStatus)}
      </Grid>
      <Grid item xs={12} md={4}>
        {(historicalStockDataStatus === 'succeeded') ? <MiniAreaGraph /> : (historicalStockDataStatus)}
      </Grid>
      <Grid item xs={12}>
        {(historicalStockDataStatus === 'succeeded') ? <CandleStickGraph /> : (historicalStockDataStatus)}
      </Grid>
      <Grid item xs={12}>
        {(stockNewsStatus === 'succeeded') ? <DisplayStockNews /> : (historicalStockDataStatus)}
      </Grid>
      <Grid item xs={12}>
        <CustomCollapseComponent hide={true} title="About"><AboutBase/></CustomCollapseComponent>
      </Grid>
    </Grid>
  );
}
