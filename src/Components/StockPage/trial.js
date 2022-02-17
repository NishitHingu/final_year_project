class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: "STOCK ABC",
          data: series.monthDataSeries1.prices
        }],
        options: {
          chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          
          title: {
            text: 'Fundamental Analysis of Stocks',
            align: 'left'
          },
          subtitle: {
            text: 'Price Movements',
            align: 'left'
          },
          labels: series.monthDataSeries1.dates,
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
        },
      
      
      };
    }
