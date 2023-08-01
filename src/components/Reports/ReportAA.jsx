// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// import MonthYearWidget from "../MonthYearWidget";

// import {
//   Box,
//   Paper,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   TextField,Button
// } from "@mui/material";
// import data from "../../data";

// const columns = [
//   { field: "id", headerName: "TrooID", width: 130 },
//   { field: "first_name", headerName: "First name", width: 130 },
//   { field: "last_name", headerName: "Last name", width: 130 },
//   { field: "phone", headerName: "phone", type: "number", width: 130 },
//   { field: "email", headerName: "email", width: 130 },
//   { field: "district", headerName: "District", width: 130 },
//   { field: "pincode", headerName: "Pincode", width: 130 },
//   { field: "score", headerName: "Score", width: 130 },
//   { field: "last updated", headerName: "Lastupdated", width: 130 },
//   { field: "Action", headerName: "Action", width: 130 },
// ];

// const rows = [...data];

// const ReportAA = () => {
//   const { id } = useParams();
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [transactionNumber, setTransactionNumber] = useState("");

//   const handleChangeMonth = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const handleChangeYear = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handleChangeTransactionNumber = (event) => {
//     setTransactionNumber(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (selectedMonth && selectedYear && transactionNumber) {
//       onSubmit(selectedMonth, selectedYear, transactionNumber);
//     }
//   };

//   // Here, you can use the id to fetch and display the detailed report information
//   // For example, you can fetch the report data using the id from an API or a data array
//   // const handleMonthYearSubmit = (selectedMonth, selectedYear) => {
//   //   console.log("Selected Month:", selectedMonth);
//   //   console.log("Selected Year:", selectedYear);
//   // };

//   return (
//     <Container>
//       <Grid>
//         <Card
//           style={{
//             maxWidth: 1100,
//             padding: "20px 5px",
//             margin: " 20px auto",
//             boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CardContent>
           
//             <Box style={{ height: 10, width: "100%" , display:'flex', alignItems:'center'}}>
//               <Typography>Report -AA</Typography>
//               {/* <MonthYearWidget onSubmit={handleMonthYearSubmit} /> */}
//               <Box style={{ maxWidth: 900, padding: "20px", margin: "0 auto",  display: "flex", justifyContent: "center", alignItems: "center", height:'40%', width:'95%' }}>
//       <Box style={{ display: "flex", alignItems: "center" }}>
//         {/* <Typography variant="h6">Select Filters</Typography> */}
//         <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
//         <select value={selectedMonth} onChange={handleChangeMonth} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
//             <option value="">Select Month</option>
//             <option value="Jan">January</option>
//             <option value="Feb">February</option>
//             <option value="Mar">March</option>
//             <option value="Apr">April</option>
//             <option value="May">May</option>
//             <option value="Jun">June</option>
//             <option value="Jul">July</option>
//             <option value="Aug">August</option>
//             <option value="Sep">September</option>
//             <option value="Oct">October</option>
//             <option value="Nov">November</option>
//             <option value="Dec">December</option>
//           </select>
//           {/* <select value={selectedYear} onChange={handleChangeYear} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
//             <option value="">Select Year</option>
           
//           </select> */}
//           <select value={selectedYear} onChange={handleChangeYear} style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
//             <option value="">Select Year</option>
//             <option value="2017">2017</option>
//             <option value="2018">2018</option>
//             <option value="2019">2019</option>
//             <option value="2020">2020</option>
//             <option value="2021">2021</option>
//             <option value="2022">2022</option>
//             <option value="2023">2023</option>
//           </select>
//           <TextField variant="standard" label="Transaction Number" value={transactionNumber} onChange={handleChangeTransactionNumber} />
//         </div>
//       </Box>
//       <Button variant="contained" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Box>


//             </Box>
           
//           </CardContent>
//         </Card>

//         <Card
//           style={{
//             maxWidth: 1100,
//             padding: "20px 5px",
//             margin: " 20px auto",
//             boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
//           }}
//         >
//           <CardContent>
//             <div style={{ height: 500, width: "100%" }}>
//               <DataGrid
//                 rows={rows}
//                 disableDensitySelector
//                 columns={columns}
//                 slots={{ toolbar: GridToolbar }}
//                 slotProps={{ toolbar: { printOptions: { disableToolbarButton: true }, } }}
//                 initialState={{
//                   pagination: {
//                     paginationModel: { page: 0, pageSize: 5 },
//                   },
//                 }}
//                 pageSizeOptions={[5, 10, 20, 30, 50, 100]}
//                 checkboxSelection
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Container>
//   );
// };

// export default ReportAA;



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MonthYearWidget from "../MonthYearWidget";
import { Box, Paper, Typography, Container, Grid, Card, CardContent, TextField, Button } from "@mui/material";
import axios from "axios"; // import axios for making API requests
import api from "../../utils/api";
import { useForm } from "react-hook-form";

const columns = [
  { field: "transactionNumber", headerName: "Transaction Number", width: 180 },
  { field: "eServicesReferenceNumber", headerName: "eServices Reference Number", width: 200 },
  { field: "dateofSubmission", headerName: "Date of Submission", width: 180 },
  { field: "periodofdeclarationMonth", headerName: "Declaration Month", width: 160 },
  { field: "periodofdeclarationYear", headerName: "Declaration Year", width: 160 },
  { field: "status", headerName: "Status", width: 120 },
];

const ReportAA = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]); // Use state to store the data

  // Function to fetch data from API and update rows state
  // const fetchData = async (requestData) => {
  //   try {
  //     const response = await api.post("/getEmaraForms", requestData);
  //     setRows(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async (requestData) => {
    try {
      const response = await api.post("/getEmaraForms", requestData,);
      console.log(response.data.data)
      // setRows(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  

  const { handleSubmit, control } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Form data:", data);

    const requestBody = {
      client_Name: "Bombay hospital",
      form_Type: "EX201_Excise_Goods_Customs",
      skip: 0,
      offset: 50,
      trans_Num: data.transactionNumber ? data.transactionNumber : null,
      period_Month: data.selectedMonth ? data.selectedMonth : null,
      period_Year: data.selectedYear ? data.selectedYear : null,
    };

    fetchData(requestBody); // Call the fetchData function to fetch data from API
  };

  // useEffect(() => {
  //   // Fetch initial data when the component mounts
  //   fetchData({
  //     client_Name: "Bombay hospital",
  //     form_Type: "EX201_Excise_Goods_Customs",
  //     skip: 0,
  //     offset: 50,
  //     trans_Num: null,
  //     period_Month: null,
  //     period_Year: null,
  //   });
  // }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            style={{
              maxWidth: 1100,
              padding: "20px 5px",
              margin: " 20px auto",
              boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Box
                style={{
                  height: 10,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                 
                  padding: "10px",
                }}
              >
                <Typography>Report -AA</Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  <select {...control} name="selectedMonth" style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                  <select {...control} name="selectedYear" style={{ padding: "5px 10px", borderRadius: "4px", marginRight: "10px" }}>
                    <option value="">Select Year</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                  <TextField {...control} name="transactionNumber" variant="standard" label="Transaction Number" />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ maxWidth: 1100, padding: "20px 5px", margin: " 20px auto", boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)" }}>
            <CardContent>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  slots={{ toolbar: GridToolbar }}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                  checkboxSelection
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportAA;

