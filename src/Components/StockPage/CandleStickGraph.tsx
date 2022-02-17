import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import { getCandleStickData } from "../../app/hooks";
import Chart from "react-apexcharts";
import { Divider, Typography } from "@mui/material";

const CandleStickGraph = () => {
  const data = getCandleStickData();

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
      title: {
        text: "Advance Graph",
        align: "left",
      },
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

  return (
    <>
      <Divider></Divider>
        <Typography style={{margin: "0.5rem 0"}} variant="h4">Advance Graph</Typography>
      <Divider></Divider>
      <Chart
        options={options}
        series={[{ data: data }]}
        width="90%"
        type="candlestick"
      ></Chart>
    </>
  );
};

export default CandleStickGraph;
