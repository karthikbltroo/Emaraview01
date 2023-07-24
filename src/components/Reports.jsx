import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Divider, Grid, Typography, Box } from "@mui/material";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";

const iconsWithText = [
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 1" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 2" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 3" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 4" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 5" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 6" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 7" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "Report 8" },
  // Add more icons as needed
];

const ReportCard = () => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" , marginTop:'20px'}}>
      <Box>
    <Card style={{ width: "93vw" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Report
        </Typography>
        <Divider />
        <Grid container spacing={2} rowSpacing={6} style={{ marginTop: "16px" }}>
          {iconsWithText.map((item, index) => (
            <Grid item xs={3} key={index}>
              {/* <Link to={`/detailed-report/${index + 1}`} style={{ textDecoration: "none", color: "inherit" }}> */}
              <Link to={`/reports/${index}`} style={{ textDecoration: "none", color:"inherit" }}>
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                  {item.icon}
                  <Typography variant="body1">{item.text}</Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
    </Box>
    </Box>
  );
};

export default ReportCard;
