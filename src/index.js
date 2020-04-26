const { GoogleCharts } = require('google-charts');
const dscc = require('@google/dscc');
const local = require('./localMessage.js');

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = true;

// Load the charts library with a callback
GoogleCharts.load(drawChart);
document.body.innerHTML += '<div id="chart1"></div>';

function drawChart(test) {
  console.log(GoogleCharts);

  const margin = {
    left: 20, right: 20, top: 20, bottom: 20,
  };
  const height = dscc.getHeight() - 10;
  const width = dscc.getWidth();

  console.log(height);

  const chartHeight = height - margin.top - margin.bottom;
  const chartWidth = width - margin.left - margin.right;
  // Standard google charts functionality is available as GoogleCharts.api after load
  const data = GoogleCharts.api.visualization.arrayToDataTable([
    ['Chart thing', 'Chart amount'],
    ['Lorem ipsum', 60],
    ['Dolor sit', 22],
    ['Sit amet', 18],
  ]);
  const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
  pie_1_chart.draw(data);
}

// const drawViz = (data) => {
// viz.readmeViz();
// viz.firstViz(data);
// };

// renders locally
if (LOCAL) {
  drawChart(local.message);
} else {
  dscc.subscribeToData(drawChart, { transform: dscc.objectTransform });
}
