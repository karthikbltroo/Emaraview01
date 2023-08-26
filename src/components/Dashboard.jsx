import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import TaxLiabilityChart from "../components/DashboardCharts/TaxLiabilityChart";
import BGutilizationChart from "../components/DashboardCharts/BGutilizationChart";
import HistoricTaxPositionChart from "./DashboardCharts/HistoricTaxPositionChart";
import TaxLiabilityChartCurrentMonth from "./DashboardCharts/TaxLiabilityChartCurrentMonth";

const Dashboard = () => {
  return (
    <Box   >
      <Card
        style={{
          maxWidth: 1100,
          margin: "20px auto",
          display: "flex",
          height: "55px",
          boxShadow: "0px 0px 13px rgba(0, 0, 0, .1)",
          borderRadius: "11px"
        }}
      >
        <CardContent>
          <Typography variant="h6">Dashboard</Typography>
        </CardContent>
      </Card>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            maxWidth: 500,
            width: "48%",
            margin: "0 10px 0 50px",
            borderRadius: "10px",

            height: "300px",
            boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
          }}
        >
          <CardContent>
            <TaxLiabilityChartCurrentMonth />
          </CardContent>
        </Card>

        <Card
          style={{
            maxWidth: 500,
            width: "48%",
            margin: "auto",
            height: "300px",
            boxShadow: "0px 0px 13px rgba(0, 0, 0, .15)",
          }}
        >
          <CardContent>
            <TaxLiabilityChart />
          </CardContent>
        </Card>
      </Box>

<Box style={{marginTop:'20px'}} ></Box>


      {/* second row of cards */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            maxWidth: 500,
            width: "48%",
            margin: "0 10px 0 50px",
            borderRadius: "10px",

            height: "300px",
            boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
          }}
        >
          <CardContent>
            <HistoricTaxPositionChart />
          </CardContent>
        </Card>

        <Card
          style={{
            maxWidth: 500,
            width: "48%",
            margin: "auto",
            height: "300px",
            boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
          }}
        >
          <CardContent>
            <BGutilizationChart />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
