import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import TaxLiabilityChart from "../components/DashboardCharts/TaxLiabilityChart";
import BGutilizationChart from "../components/DashboardCharts/BGutilizationChart";

const Dashboard = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "320px",
      }}
    >
      <Box>
        <Card style={{ width: "93vw" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Dashboard
            </Typography>
            <Divider />
            <Box style={{ width: "100%", height: "90vh" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "20px",
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  Tax Liability Chart
                </Typography>
              </Box>
              <TaxLiabilityChart />
            </Box>

            <Box style={{ width: "100%", height: "90vh" }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "20px", marginTop:'-40px'
                }}
              >
                <Typography style={{ fontWeight: "bold" }}>
                  BG Utilization Chart
                </Typography>
              </Box>
              <BGutilizationChart />
            </Box>

           
          </CardContent>
        </Card>
      </Box>
    </Box>

   
  );
};

export default Dashboard;
