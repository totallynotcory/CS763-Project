import "../App.css";
import React, { useState, useEffect } from "react"; 
import apiClient from "../services/apiClient.js";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; 
import { Typography, Grid2, Box } from "@mui/material";
import { bigTitle, dashboardLineChartContainer } from "./style/styles.js";
import { authenticated } from "../utils/authenticate.js";

import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import OpacityIcon from "@mui/icons-material/Opacity";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// Register the required components for Chart.js
Chart.register(...registerables);

// Factory function to create chart configuration
const createChartConfig = (label, data, goal, icon, color, unit) => {
  const minBuffer = 0.8; // Local scope for minBuffer
  const maxBuffer = 1.2; // Local scope for maxBuffer

  const suggestedMin = Math.min(...data.filter(val => val !== null)) * minBuffer; // Filter out null values
  const suggestedMax = Math.max(...data.filter(val => val !== null)) * maxBuffer; // Filter out null values
  
  return {
    label,
    data,
    goal,
    icon,
    color,
    unit,
    suggestedMin,
    suggestedMax,
  };
};

// Reusable component for charts
const ChartBox = ({
  title,
  chartData,
  chartOptions,
  dashboardLineChartContainer,
  IconComponent,
}) => (
  <Grid2 xs={12} sm={6}>
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 2,
        padding: 2,
        boxShadow: 2,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        {IconComponent && <IconComponent sx={{ marginRight: 1 }} />}
        {title}
      </Typography>
      <div style={dashboardLineChartContainer}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Box>
  </Grid2>
);

function Home() {
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = authenticated();

    if (token) {
      apiClient
        .get("/api/users/manage-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { name } = res.data;
          setUserData({
            name: name || "",
            firstName: name.split(" ")[0] || "",
          });
        })
        .catch((err) => {
          setError("Error fetching profile data. Try refreshing.");
          console.log(err);
        });
    }
  }, []);

  const dayLabels = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];

  const dataConfig = [
    createChartConfig("Weight", [null, null, null, null, null, null, 144], 140, MonitorWeightIcon, "75,192,192", "lbs"),
    createChartConfig("Steps", [6000, 8000, 7500, 9000, 6500, 5000, 7000], 10000, DirectionsWalkIcon, "255,99,132", "steps"),
    createChartConfig("Sleep", [6, 7, 5, 8, 6, 7, 5], 7, BedtimeIcon, "255,160,86", "hours"),
    createChartConfig("Water Intake", [8, 6, 7, 5, 8, 7, 6], 8, OpacityIcon, "54,162,235", "glasses"),
    createChartConfig("Exercise", [30, 45, 60, 20, 40, 30, 50], 40, FitnessCenterIcon, "153,102,255", "minutes"),
  ];

  // General settings
  const borderWidth = 2;
  const pointRadius = 5;
  const pointBorderWidth = borderWidth;

  const setTransparency = (color, value) => {
    return `rgba(${color},${value})`;
  };

  const getChartData = (config) => ({
    labels: dayLabels,
    datasets: [
      {
        label: `Recorded ${config.label} (${config.unit})`,
        data: config.data,
        borderWidth: borderWidth,
        borderColor: setTransparency(config.color, 1),
        pointBackgroundColor: setTransparency(config.color, 1),
        pointBorderColor: "white",
        pointRadius: pointRadius,
        pointBorderWidth: pointBorderWidth,
        fill: false,
      },
      {
        label: "Goal",
        data: Array(7).fill(config.goal),
        borderColor: setTransparency(config.color, 0.25),
        pointRadius: 0,
        fill: 'start',
        backgroundColor: setTransparency(config.color, 0.1),
      },
    ],
  });

  const dynamicOptions = (suggestedMin, suggestedMax) => ({
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      y: {
        suggestedMin: suggestedMin,
        suggestedMax: suggestedMax,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: pointRadius + pointBorderWidth,
          boxHeight: pointRadius + pointBorderWidth,
        },
      },
    },
  });

  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Typography sx={{ ...bigTitle, paddingLeft: 5, paddingTop: 2 }}>
        {userData.firstName
          ? `Welcome, ${userData.firstName}!`
          : `Welcome, ${userData.name}`}{" "}
        <br />
      </Typography>
      <Grid2 container justifyContent="center" spacing={2}>
        {dataConfig.map((config) => (
          <ChartBox
            key={config.label}
            title={config.label}
            chartData={getChartData(config)}
            chartOptions={dynamicOptions(config.suggestedMin, config.suggestedMax)}
            dashboardLineChartContainer={dashboardLineChartContainer}
            IconComponent={config.icon}
          />
        ))}
      </Grid2>
    </Box>
  );
}

export default Home;
