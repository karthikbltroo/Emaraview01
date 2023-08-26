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
import axios from "axios";
import { PATHS } from "../../apiURL";

const baseURL = "http://43.204.209.147:81/Api";

// const ChartContainer = ({ children }) => (
//   <Box display="flex" flexDirection="row" gap="20px">
//     {children}
//   </Box>
// );
// const CustomCard = styled(Card)({
//   width: "30%",
//   padding: "10px",
//   marginBottom: "20px",
// });

const CustomizedLabel = ({ x, y, value }) => {
  if (value === 0) {
    return null; // Return null to hide the label when value is 0
  }

  return (
    <text
      x={x}
      y={y}
      dy={-5}
      fill="#000"
      textAnchor="start"
      style={{ fontSize: "10px", fontWeight: "bold" }}
    >
      {value.toLocaleString("en-US", {
        style: "decimal",
        maximumFractionDigits: 2,
      })}
    </text>
  );
};

const TaxLiabilityChartCurrentMonth = () => {
  const { displayName } = useAuth();
  const [data, setData] = useState([]);
  const [dataLeft, setDataLeft] = useState([]);
  const [dataRight, setDataRight] = useState([]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = currentDate.getFullYear();
  const correctedMonthFormat = monthNames[previousMonth];

  console.log("previous month", monthNames[previousMonth]);
  console.log("corrected month", correctedMonthFormat);
  console.log("current Year", currentYear);

  const [selectedMonth, setSelectedMonth] = useState(correctedMonthFormat);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // const [selectedMonth, setSelectedMonth] = useState("July");
  // const [selectedYear, setSelectedYear] = useState("2023");

  console.log("name is", displayName);

  // Fixed data current month
  useEffect(() => {
    const fetchDataFixed = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        // console.log("Fixed Current Month",currentMonth )
        const currentYear = currentDate.getFullYear();
        console.log("Fixed Current Year", currentYear);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const formattedMonth = monthNames[currentMonth];
        console.log("Fixed current Month", formattedMonth);

        const responseRight = await axios.get(
          `${baseURL}/getTaxLiability?client_Name=bombay hospital&duration=${formattedMonth} ${currentYear}`
        );
        setDataRight(responseRight.data.data);

        console.log("data right fixed", responseRight.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFixed();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box style={{ display: "flex" }}>
        <Typography mt={1} mb={1} ml={20}>
          Tax Liability Current
        </Typography>
      </Box>

      {/* <Typography
        style={{ fontSize: "11px", fontWeight: "bold" }}
        ml={102}
        mt={-2}
      >
        Download Excel for above period
      </Typography> */}

      {/* Fixed data for current Month */}
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          width={100}
          height={300}
          data={dataRight}
          margin={{
            top: 6,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="period" />
          <YAxis type="number" />
          <Tooltip />
          {/* <Legend /> */}
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="exciseTaxImport" name="Import" fill="#72627D" />
          <Bar dataKey="exciseTaxPoduction" name="Poduction" fill="#72627D" />
          <Bar
            dataKey="exciseTaxReleaseNoCustoms"
            name="Release No Customs"
            fill="#72627D"
          />
          <Bar
            dataKey="exciseTaxReleaseCustoms"
            name="Release Customs"
            fill="#72627D"
          />
          <Bar
            dataKey="exciseTaxStockpiling"
            name="Stock piling"
            fill="#72627D"
          />
          <Bar dataKey="exciseTaxDeductible" name="Deductible" fill="#72627D" />
          <Bar
            dataKey="totalExciseTaxdue"
            name="Total Tax due"
            fill="#72627D"
          />

          <Bar
            dataKey="netExciseTaxPayable"
            name="Net Tax Payable"
            label={<CustomizedLabel />}
            fill="#f7a20d"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TaxLiabilityChartCurrentMonth;
