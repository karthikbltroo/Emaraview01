import React, { useState, useEffect, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import { PATHS } from "../../apiURL";
import {
  Box,
  Paper,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  LinearProgress,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  styled,
} from "@mui/material";

const baseURL = "http://43.204.209.147:81/Api";

const BGutilizationChart = () => {
  // let displayName = sessionStorage.getItem("displayName");
  const { displayName } = useAuth();
  const [data, setData] = useState([]);
  console.log("name is", displayName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/getBGUtilization?client_Name=${displayName}`
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayName]);

  return (
    <>
      <Box style={{ display: "flex" }}>
        <Typography ml={20} mt={2}>
          BG Utilization Chart
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          width={100}
          height={200}
          data={data}
          margin={{
            top: 6,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid stroke="none" />
          <XAxis type="number" />
          <YAxis dataKey="dzNumber" type="category" />
          <Tooltip />
          {/* <Legend /> */}
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="bgUtilization" fill="#BAE486" />
          <Bar dataKey="bgValue" fill="#8BECEF" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BGutilizationChart;
