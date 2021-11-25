import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import DayHighLowSlider from "./DayHighLowSlider";

function StockDetails() {
  const stockInfo = useAppSelector(
    (state) => state.autocompleteSearchBar.stockInfo
  );

	function DisplayPercentageChange ()
	{
		if (stockInfo?.percentageChange && stockInfo.percentageChange >= 0) {
			return <Typography variant="body1" color="green">{stockInfo.percentageChange}%</Typography>
		} else if (stockInfo?.percentageChange) {
			return <Typography variant="body1" color="red">{stockInfo.percentageChange}%</Typography>
		}
		return null
	}
  return (
    <Grid container margin={2}>
      <Grid item xs={6}>
        <Typography variant="h4">{stockInfo?.stockName}</Typography>
        <Typography variant="h2">{stockInfo?.price}</Typography>
				<DisplayPercentageChange />
      </Grid>
			<Grid item xs={6} marginTop={2}>
				<DayHighLowSlider />
			</Grid>
    </Grid>
  );
}

export default StockDetails;
