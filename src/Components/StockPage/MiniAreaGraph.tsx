import { Button, ButtonGroup, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { ApexOptions } from "apexcharts";
import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { getHistoricalClosePriceData } from "../../app/hooks";
import { getDataSlice } from "./helperFunctions/getDataSlice";

const useStyles = makeStyles((theme: Theme) => ({
  activeBtn: {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    color: theme.palette.getContrastText(theme.palette.primary[theme.palette.mode]),
  }
}));

function MiniAreaGraph() {
  const closePrices = getHistoricalClosePriceData();
  const [dataPeriod, setDataPeriod] = useState("1Y");

  useEffect(() => {
    if (dataPeriod !== "") {
      let dataSlice;

      switch (dataPeriod) {
        case "1M":
          dataSlice = getDataSlice(closePrices, new Date().getTime() - 2629743000)
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateOptions", {
            fill: {
              color: "#444",
            }
          }, true);
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateSeries", [{data: dataSlice}])
          break;
        case "6M":
          dataSlice = getDataSlice(closePrices, (new Date().getTime()) - (2629743000 * 6))
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateSeries", [{data: dataSlice}])
          break;
        case "1Y":
          dataSlice = getDataSlice(closePrices, (new Date().getTime()) - 31556926000);
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateSeries", [{data: dataSlice}])
          break;
        case "5Y":
          dataSlice = getDataSlice(closePrices, (new Date().getTime()) - (31556926000 * 5));
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateSeries", [{data: dataSlice}])
          break;
        case "10Y":
          dataSlice = getDataSlice(closePrices, (new Date().getTime()) - (31556926000 * 10));
          ApexCharts.exec("HistoricalMiniAreaGraph", "updateSeries", [{data: dataSlice}])
          break;
        default:
      }
    }
  }, [dataPeriod]);

  let options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: "HistoricalMiniAreaGraph",
        zoom: {
          autoScaleYaxis: true,
          enabled: false
        },
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    }),
    [closePrices]
  );

  const updateDataPeriod = (time: string) => {
    setDataPeriod(time);
  };

  const series = [
    {
      name: "series-1",
      data: closePrices,
    },
  ];

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <ButtonGroup variant="outlined" size="small">
          <Button onClick={() => updateDataPeriod("1M")} className={dataPeriod === "1M" ? classes.activeBtn : undefined}>1M</Button>
          <Button onClick={() => updateDataPeriod("6M")} className={dataPeriod === "6M" ? classes.activeBtn : undefined}>6M</Button>
          <Button onClick={() => updateDataPeriod("1Y")} className={dataPeriod === "1Y" ? classes.activeBtn : undefined}>1Y</Button>
          <Button onClick={() => updateDataPeriod("5Y")} className={dataPeriod === "5Y" ? classes.activeBtn : undefined}>5Y</Button>
          <Button onClick={() => updateDataPeriod("10Y")} className={dataPeriod === "10Y" ? classes.activeBtn : undefined}>10Y</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <Chart options={options} series={series} type="area" width="100%" />
      </Grid>
    </Grid>
  );
}

export default MiniAreaGraph;