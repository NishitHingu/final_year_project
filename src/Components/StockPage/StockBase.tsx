import { Grid } from "@mui/material";
import { getStockInfoStatus } from "../../app/hooks";
import StockDetails from "./StockDetails";

export default function StockBase() {
  const loading = getStockInfoStatus();
  console.log(loading);

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={7}>
        {(loading === 'succeeded') ? <StockDetails /> : (loading)}
      </Grid>
      <Grid item xs={12} md={4}>
      </Grid>
    </Grid>
  );
}
