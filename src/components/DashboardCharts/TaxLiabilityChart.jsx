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

const ChartContainer = ({ children }) => (
  <Box display="flex" flexDirection="row" gap="20px">
    {children}
  </Box>
);
const CustomCard = styled(Card)({
  width: "30%",
  padding: "10px",
  marginBottom: "20px",
});

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

const TaxLiabilityChart = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLeft = await axios.get(
          `${baseURL}/getTaxLiability?client_Name=${displayName}&duration=${selectedMonth} ${selectedYear}`
        );
        setDataLeft(responseLeft.data.data);

        console.log("data left", responseLeft.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Network or Session timeout error, Login again");
        setSnackbarOpen(true);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* <Box style={{ display: 'flex' }}>
  <Typography ml={30} mr={2}>
    Tax Liability Current
  </Typography>
  <Typography >Tax Liability</Typography>
</Box> */}

      <Box style={{ display: "flex" }}>
        <Box style={{ display: "flex" }}>
          {/* <Typography  mt={1}>
                Tax Liability Current
              </Typography> */}

          <Typography ml={11} mr={2} mt={1}>
            Tax Liability
          </Typography>
        </Box>
        <Box sx={{ minWidth: 140 }}>
          <FormControl fullWidth>
            <InputLabel style={{ fontSize: "13px", fontWeight: "bold" }}>
              Month
            </InputLabel>
            <Select
              label="Select Month"
              size="medium"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              style={{ height: "45px" }}
            >
              <MenuItem value="">Select Month</MenuItem>
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="October">October</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="December">December</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 90 }}>
          <FormControl fullWidth>
            <InputLabel style={{ fontSize: "13px", fontWeight: "bold" }}>
              Year
            </InputLabel>
            <Select
              label="Select Year"
              size="medium"
              variant="outlined"
              // displayEmpty
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              style={{ height: "45px" }}
              // InputProps={{style: {  height: 35 }}}
            >
              <MenuItem value="">Select Year</MenuItem>
              <MenuItem value="2017">2017</MenuItem>
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* <Typography
        style={{ fontSize: "10px", fontWeight: "bold" }}
        ml={25}
        mt={1}
      >
        Download Excel for above period
      </Typography> */}
      <ChartContainer>
        {/* Fixed data for current Month */}

        <ResponsiveContainer width="100%" height={230}>
          <BarChart
            width={100}
            height={300}
            data={dataLeft}
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
            <Bar
              dataKey="exciseTaxDeductible"
              name="Deductible"
              fill="#72627D"
            />
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
      </ChartContainer>
    
    </>
  );
};

export default TaxLiabilityChart;
