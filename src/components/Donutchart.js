import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, DoughnutController, Tooltip } from 'chart.js'; // Include Tooltip from Chart.js
import sourceData from "../data/sourceData.json";

// Register DoughnutController, ArcElement, CategoryScale, and Tooltip
ChartJS.register(DoughnutController, ArcElement, CategoryScale, Tooltip);

const processedData = sourceData.map(data => ({
  label: `${data.label} Total`, // Add " Total" to the existing label
  value: data.value, // Add 5 to all values
  color: data.label === "Male" ? "#016eff" :  "#e2eefe" 
}));

const Statistic = () => {
 

 

  return (
    <div className="containerchart">
      <div className="dataCard categoryCard">
        <Doughnut

  data={{
    labels:processedData.map(data => data.label),
    datasets: [
      {
        label:"                  Total",
        data: processedData.map(data => data.value),
        hoverBackgroundColor: "#ffffff",
        hoverBorderWidth: 1,
        backgroundColor: processedData.map(data => data.color),
        borderColor: "#f8f9ff", // Set border color to black
        borderWidth: 5, // Set border width to 8px
      },
    ],
  }}
  options={{
    
    plugins: {
      legend: {
        display: false, // Add this line to hide the legend
      },
    },
    elements: {
      arc: {
        borderWidth: 8,
      },
    },
    cutout: "73%",
    radius: "60%",
    borderWidth: 4,
    borderAlign: "center",
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    borderRadius: 8,
    hover: {
      mode: 'nearest',
      intersect: false,
      includeInvisible: false,
    },
  }}
/>

      </div>
    </div>
  );
};

export default Statistic;
