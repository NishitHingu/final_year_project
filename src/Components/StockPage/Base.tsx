import { Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import StockDetails from "./StockDetails";

export default function Base() {
  const loading = useAppSelector(
    (state) => state.autocompleteSearchBar?.status
  );
  console.log(loading);

  return (
    <Grid container>
      <Grid item xs={6}>
        {loading && <StockDetails />}
      </Grid>
    </Grid>
  );
}
