import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  plugins,
  PointElement,
  scales,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getlast7days } from "../../lib/feature";
ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);
const labels = getlast7days();
const LineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return <Line data={data} options={LineOptions} />;
};
const DoughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        // label: "Total Chats VS Group Chats",
        fill: true,
        backgroundColor: ["rgba(75,192,192,0.2)", "rgba(75,192,192,1)"],
        borderColor: ["rgba(75,192,192,0.2)", "rgba(75,192,192,1)"],
        offset: 20,
      },
    ],
  };
  return (
    <Doughnut style={{ zIndex: 10 }} data={data} options={DoughnutOptions} />
  );
};

export { DoughnutChart, LineChart };
