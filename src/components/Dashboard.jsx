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

const iconsWithText = [
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 1" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 2" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 3" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 4" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 5" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 6" },
];

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

            {/* <Grid container spacing={2} rowSpacing={6} style={{ marginTop: "16px" }}>
          {iconsWithText.map((item, index) => (
            <Grid item xs={3} sm={4} key={index}>
             
              <Link to={`/reports/${index}`} style={{ textDecoration: "none", color:"inherit" }}>
            
<Box style={{width:'200px',height:'200px', backgroundColor:'	#E0E0E0'}} >Dashboard</Box>

<TaxLiabilityChart/>

              </Link>
            </Grid>
          ))}
        </Grid> */}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
