import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts'; // Make sure this module is installed properly

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: {
        text: "Quarterly Sales by Country",
      },
      axisY: {
        prefix: "$",
        tickLength: 0,
        suffix: "K",
        title: "Sales in USD",
        includeZero: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: function (e) {
          if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "column",
          name: "Germany",
          showInLegend: true,
          color: "#118AB2",
          yValueFormatString: "$##,###K",
          dataPoints: [
            { label: "Q1", y: 50 },
            { label: "Q2", y: 100 },
            { label: "Q3", y: 120 },
            { label: "Q4", y: 140 },
          ],
        },
        {
          type: "column",
          name: "India",
          color: "#06D6A0",
          showInLegend: true,
          yValueFormatString: "$##,###K",
          dataPoints: [
            { label: "Q1", y: 75 },
            { label: "Q2", y: 115 },
            { label: "Q3", y: 150 },
            { label: "Q4", y: 160 },
          ],
        },
        {
          type: "column",
          name: "China",
          color: "#FFD166",
          showInLegend: true,
          yValueFormatString: "$##,###K",
          dataPoints: [
            { label: "Q1", y: 110 },
            { label: "Q2", y: 120 },
            { label: "Q3", y: 160 },
            { label: "Q4", y: 170 },
          ],
        },
        {
          type: "column",
          name: "United States of America",
          color: "#EF476F",
          showInLegend: true,
          yValueFormatString: "$##,###K",
          dataPoints: [
            { label: "Q1", y: 140 },
            { label: "Q2", y: 150 },
            { label: "Q3", y: 170 },
            { label: "Q4", y: 180 },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default App;
