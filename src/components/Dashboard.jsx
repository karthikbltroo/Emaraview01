import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TaxLiabilityChart from "../components/DashboardCharts/TaxLiabilityChart";
import BGutilizationChart from "../components/DashboardCharts/BGutilizationChart";
import HistoricTaxPositionChart from "./DashboardCharts/HistoricTaxPositionChart";
import TaxLiabilityChartCurrentMonth from "./DashboardCharts/TaxLiabilityChartCurrentMonth";

const Dashboard = () => {
  return (
    <Box>
      <Box>
        <Card
          style={{
            maxWidth: 1100,
            margin: "20px auto",
            display: "flex",
            height: "55px",
            boxShadow: "0px 0px 13px rgba(0, 0, 0, .1)",
            borderRadius: "11px",
          }}
        >
          <CardContent>
            <Typography variant="h6">Dashboard</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* first row */}
      <Box>
        <Box
          style={{
            display: "flex",
            margin: "20px auto",
            justifyContent: "space-between",
          }}
          maxWidth={1100}
        >
          <Box>
            <Card
              style={{
                maxWidth: 550,
                width: "540px",

                borderRadius: "10px",

                height: "300px",
                boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
              }}
            >
              <CardContent>
                <TaxLiabilityChartCurrentMonth />
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card
              style={{
                maxWidth: 550,
                width: "540px",

                borderRadius: "10px",

                height: "300px",
                boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
              }}
            >
              <CardContent>
                <TaxLiabilityChart />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box
          style={{
            display: "flex",
            margin: "20px auto",
            justifyContent: "space-between",
          }}
          maxWidth={1100}
        >
          <Box>
            <Card
              style={{
                maxWidth: 550,
                width: "540px",

                borderRadius: "10px",

                height: "300px",
                boxShadow: "0px 0px 11px rgba(0, 0, 0, .15)",
              }}
            >
              <CardContent>
                <HistoricTaxPositionChart />
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card
              style={{
                maxWidth: 550,
                width: "540px",

                borderRadius: "10px",

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
      </Box>
    </Box>
  );
};

export default Dashboard;
