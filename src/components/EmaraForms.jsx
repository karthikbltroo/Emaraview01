import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Divider, Grid, Typography, Box } from "@mui/material";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";

const iconsWithText = [
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 1" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 2" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 3" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 4" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 5" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 6" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 7" },
  { icon: <BrandingWatermarkOutlinedIcon />, text: "EmaraForm 8" },
  // Add more icons as needed
];

const EmaraForms = () => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" , marginTop:'20px'}}>
      <Box>
    <Card style={{ width: "93vw" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Emara Forms
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

export default EmaraForms;
