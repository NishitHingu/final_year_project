import { ApexOptions } from "apexcharts";
import { useMemo, useState } from "react";
import { getCandleStickData } from "../../app/hooks";
import Chart from "react-apexcharts";
import { Divider, Grid, Typography } from "@mui/material";
import { historicalStockData } from "../../features/searchBar/Stock";
import CustomCollapseComponent from "./CustomCollapseComponent";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import img from "../../media/candelStickInfoImg.jpg";

const CandleStickGraph = () => {
  const data: historicalStockData[] | null = getCandleStickData();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  let options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: "candleStickGraph",
        type: "candlestick",
        zoom: {
          autoScaleYaxis: true,
          enabled: true,
        },
      },
      tooltip: {
        enabled: true,
      },
      annotations: {
        xaxis: [
          {
            // Although x is a date object toLocalDateString was giving errors so we convert x to date obj again.
            x: data
              ? new Date(data[data.length - 1].x).toLocaleDateString()
              : 0,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              text: "Predicted Candelstick",
            },
          },
        ],
      },
      // title: {
      //   text: "Advance Graph",
      //   align: "left",
      // },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val) {
            let date = new Date(val);
            return `${date.toLocaleDateString()}`;
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    }),
    [data]
  );
  console.log(data ? new Date(data[data.length - 1].x).getTime() : "no data");

  return (
    <CustomCollapseComponent hide={true} title="Advance Graph">
      {/* <Box sx={{width: 500}}>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <Typography sx={{ p: 2 }}>
                  <img
                  width={500}
                  height={500}
                    src={img}
                    alt="Information regarding candleStick Pattern"
                  ></img>
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box> */}
      {/* <Button onClick={handleClick("bottom")}>bottom</Button> */}
      <Grid container justifyContent="center" style={{height:"70vh", width: "90vw"}}>
        <Chart
          options={options}
          series={[{ data: data }]}
          width="90%"
          height="100%"
          type="candlestick"
        ></Chart>

      </Grid>
        
    </CustomCollapseComponent>
  );
};

export default CandleStickGraph;
