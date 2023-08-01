import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button,Box } from "@mui/material";

const MonthYearWidget = ({ onSubmit }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeTransactionNumber = (event) => {
    setTransactionNumber(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedMonth && selectedYear && transactionNumber) {
      onSubmit(selectedMonth, selectedYear, transactionNumber);
    }
  };

  return (
    <Box style={{ maxWidth: 900, padding: "20px", margin: "0 auto",  display: "flex", justifyContent: "center", alignItems: "center",  width:'95%', border:'3px solid blue' }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Select Filters</Typography>
        <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
        <select value={selectedMonth} onChange={handleChangeMonth} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
            <option value="">Select Month</option>
            <option value="Jan">January</option>
            <option value="Feb">February</option>
            <option value="Mar">March</option>
            <option value="Apr">April</option>
            <option value="May">May</option>
            <option value="Jun">June</option>
            <option value="Jul">July</option>
            <option value="Aug">August</option>
            <option value="Sep">September</option>
            <option value="Oct">October</option>
            <option value="Nov">November</option>
            <option value="Dec">December</option>
          </select>
          {/* <select value={selectedYear} onChange={handleChangeYear} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
            <option value="">Select Year</option>
           
          </select> */}
          <select value={selectedYear} onChange={handleChangeYear} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
            <option value="">Select Year</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <TextField variant="standard" label="Transaction Number" value={transactionNumber} onChange={handleChangeTransactionNumber} />
        </div>
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

// const ReportAA = () => {
//   const handleSubmit = (month, year, transactionNumber) => {
//     console.log("Selected Month:", month);
//     console.log("Selected Year:", year);
//     console.log("Transaction Number:", transactionNumber);
//   };

//   return (
//     <div>
//       <MonthYearWidget onSubmit={handleSubmit} />
//     </div>
//   );
// };

export default MonthYearWidget;


