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
import { useAuth } from "../../utils/AuthContext";
import axios from "axios"
import { PATHS } from "../../apiURL";

const baseURL = "http://43.204.209.147:81/Api"

const TaxLiabilityChart = () => {
  // let displayName = sessionStorage.getItem("displayName");
  const { displayName } = useAuth();
  const [data, setData] = useState([]);
  console.log("name is", displayName);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/getTaxLiability?client_Name=${displayName}&duration=current`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayName]);

  // Split data into separate arrays for July and August
  const julyData = data.filter((item) => item.period === "July-2023");
  const augustData = data.filter((item) => item.period === "August-2023");

  return (
    <>
   
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={100}
          height={300}
          data={julyData}
          margin={{
            top: 6,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="exciseTaxImport" name="Tax Import" fill="#8884d8" />
          <Bar
            dataKey="exciseTaxPoduction"
            name="Tax Poduction"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxReleaseNoCustoms"
            name="Tax Release No Customs"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxReleaseCustoms"
            name="Tax Release Customs"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxStockpiling"
            name="TaxStock piling"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxDeductible"
            name="Tax Deductible"
            fill="#8884d8"
          />
          <Bar
            dataKey="totalExciseTaxdue"
            name="Total Tax due"
            fill="#8884d8"
          />
          <Bar
            dataKey="netExciseTaxPayable"
            name="Net Tax Payable"
            fill="#f7a20d"
          />
        </BarChart>
      </ResponsiveContainer>
    


      
      <ResponsiveContainer  width="100%" height={300}>
        <BarChart
          width={100}
          height={300}
          data={augustData}
          margin={{
            top: 6,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="exciseTaxImport" name="Tax Import" fill="#8884d8" />
          <Bar
            dataKey="exciseTaxPoduction"
            name="Tax Poduction"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxReleaseNoCustoms"
            name="Tax Release No Customs"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxReleaseCustoms"
            name="Tax Release Customs"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxStockpiling"
            name="TaxStock piling"
            fill="#8884d8"
          />
          <Bar
            dataKey="exciseTaxDeductible"
            name="Tax Deductible"
            fill="#8884d8"
          />
          <Bar
            dataKey="totalExciseTaxdue"
            name="Total Tax due"
            fill="#8884d8"
          />
          <Bar
            dataKey="netExciseTaxPayable"
            name="Net Tax Payable"
            fill="#f7a20d"
          />
        </BarChart>
      </ResponsiveContainer>
  
    
    </>
  );
};

export default TaxLiabilityChart;
