import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { PATHS } from "../../apiURL";
import { useAuth } from "../../utils/AuthContext";
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

const HistoricTaxPositionChart = () => {
  const [data, setData] = useState([]);
  const { displayName } = useAuth();

    // Function to sort data based on period
    const sortData = (data) => {
      return data.sort((a, b) => {
        const periodA = new Date(a.period);
        const periodB = new Date(b.period);
        return periodA - periodB;
      });
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/getTaxLiability?client_Name=${displayName}&duration=all`
        );
        const sortedData = sortData(response.data.data);
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <>
      <Box style={{ display: "flex" }}>
        <Typography ml={20} mt={1}>
          Historic Tax Position
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={230}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 6,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="period" />
          <YAxis type="number" dataKey="netExciseTaxPayable" tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="netExciseTaxPayable" name="Net Tax Payable" fill="#f7a20d" /> */}

          <Line
            type="monotone"
            dataKey="netExciseTaxPayable"
            stroke="#f7a20d"
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
   
    </>
  );
};

export default HistoricTaxPositionChart;
