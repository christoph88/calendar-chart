const { GoogleCharts } = require('google-charts');
const dscc = require('@google/dscc');
const local = require('./localMessage.js');

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = true;

// Load the charts library with a callback
// GoogleCharts.load(drawChart);
GoogleCharts.load(drawChart, { packages: ['calendar'] });
console.log(GoogleCharts);
document.body.innerHTML += '<div id="chart1"></div>';

function drawChart(test) {
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
    ['date', 'won/los'],
    [new Date(2012, 3, 13), 37032],
    [new Date(2012, 3, 14), 38024],
    [new Date(2012, 3, 15), 38024],
    [new Date(2012, 3, 16), 38108],
    [new Date(2012, 3, 17), 38229],
    // Many rows omitted for brevity.
    [new Date(2013, 9, 4), 38177],
    [new Date(2013, 9, 5), 38705],
    [new Date(2013, 9, 12), 38210],
    [new Date(2013, 9, 13), 38029],
    [new Date(2013, 9, 19), 38823],
    [new Date(2013, 9, 23), 38345],
    [new Date(2013, 9, 24), 38436],
    [new Date(2013, 9, 30), 38447],
  ]);
  const pie_1_chart = new GoogleCharts.api.visualization.Calendar(document.getElementById('chart1'));
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
