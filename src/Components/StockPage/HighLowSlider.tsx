import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

const CustomSlider = styled(Slider)(({min, max, theme }) => ({
	color: "green",
	'& .Mui-disabled': {
		color: theme.palette.text.primary,
	},
	'&::before': {
		content: `"${min}"`,
		fontSize: 12,
		position: "absolute",
		top: 20,
		color: theme.palette.text.secondary,
	},
	'&::after': {
		content: `"${max}"`,
		fontSize: 12,
		position: "absolute",
		top: 20,
		right: 0,
		color: theme.palette.text.secondary,
	}
}))

export default function HighLowSlider() {
  const stockInfo = useAppSelector(
    (state) => state.autocompleteSearchBar.stockInfo
  );
  const [price, setPrice] = useState(stockInfo?.price);

  useEffect(() => {
    if (stockInfo) {
      if (stockInfo.price !== price) {
        setPrice(stockInfo.price);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockInfo]);

  const CreateSlider = (
    currentValue: number = 0,
    min: number = 0,
    max: number = 0
  ) => {
    return (
        <CustomSlider
          defaultValue={currentValue}
          step={(max - min) / 100}
					onChange={() => {}}
          disabled
          valueLabelDisplay="auto"
          min={min}
          max={max}
        />
    );
  };

  return (
    <Box style={{maxWidth: '80%'}}>
			<Typography variant="body1">Day Range</Typography>
      {CreateSlider(price, stockInfo?.dayLow, stockInfo?.dayHigh)}

			<Typography marginTop={3} variant="body1">52 Weeks Range</Typography>
      {CreateSlider(price, stockInfo?.fiftyTwoWeekLow, stockInfo?.fiftyTwoWeekHigh)}
    </Box>
  );
}
