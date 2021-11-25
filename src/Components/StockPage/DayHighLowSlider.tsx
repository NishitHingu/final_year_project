import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useAppSelector } from "../../app/hooks";

export default function DayHighLowSlider() {
  const stockInfo = useAppSelector(
    (state) => state.autocompleteSearchBar.stockInfo
  );
  const price: number = stockInfo?.price || 0;

  const marks = [
    {
      value: 0,
      label: `${stockInfo?.dayLow}`,
    },
    {
      value: 100,
      label: `${stockInfo?.dayHigh}`,
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        defaultValue={price}
        disabled
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
