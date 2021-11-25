import { Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import StockDetails from "./StockDetails";

export default function StockBase() {
  const loading = useAppSelector(
    (state) => state.autocompleteSearchBar?.status
  );
  console.log(loading);

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        {(loading === 'succeeded') ? <StockDetails /> : (loading)}
      </Grid>
      <Grid item xs={12} md={6}>
      </Grid>
    </Grid>
  );
}
