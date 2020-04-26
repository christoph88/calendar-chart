const { GoogleCharts } = require('google-charts');
const dscc = require('@google/dscc');
const local = require('./localMessage.js');

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;


const height = dscc.getHeight();
const width = dscc.getWidth();

document.body.innerHTML += `<div id="calendar_basic" style="width: ${width}px; height: ${height}px;"></div>`;


function getTable(data) {
  let { headers } = data.tables.DEFAULT;
  let { rows } = data.tables.DEFAULT;
  headers = headers.map((head) => head.name);
  rows = rows.map((row) => {
    const year = row[0].substring(0, 4);
    const month = row[0].substring(4, 6);
    const day = row[0].substring(6, 8);
    return [new Date(year, month, day), parseFloat(row[1])];
  });

  const table = [headers].concat(rows);

  return table;
}


async function drawChart(data) {
  // wait for the data to be processed in the proper format
  const table = await getTable(data);

  // wait for the chart library to properly load before drawing
  await GoogleCharts.load(draw, { packages: ['calendar'] });

  // start drawing with library and proper data
  function draw() {
    const dataTable = GoogleCharts.api.visualization.arrayToDataTable(table);

    const calendar = new GoogleCharts.api.visualization.Calendar(document.getElementById('calendar_basic'));

    console.log(width);
    const options = {
      // title: 'Red Sox Attendance',
      calendar: { cellSize: width / 58 },
      height,
      width,
    };

    calendar.draw(dataTable, options);
  }
}

// renders locally
// pass the information to the function
if (LOCAL) {
  drawChart(local.message);
} else {
  dscc.subscribeToData(drawChart, { transform: dscc.tableTransform });
}
