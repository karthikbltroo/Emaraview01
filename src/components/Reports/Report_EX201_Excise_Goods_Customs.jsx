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

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MonthYearWidget from "../MonthYearWidget";

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
  styled
} from "@mui/material";
import api from "../../utils/api";
import { useForm } from "react-hook-form";


const columns = [
  { field: "transactionNumber", headerName: "Transaction Number", width: 200 },
  {
    field: "eServicesReferenceNumber",
    headerName: "eServices Ref Number",
    width: 200,
  },
  { field: "dateofSubmission", headerName: "Date of Submission", width: 180 },
  {
    field: "periodofdeclarationMonth",
    headerName: "Declaration Month",
    width: 160,
  },
  {
    field: "periodofdeclarationYear",
    headerName: "Declaration Year",
    width: 160,
  },
  { field: "status", headerName: "Status", width: 120 },
  {
    field: "whatistheExcisedeclarationrelatedto",
    headerName: "Excise Declaration Type",
    width: 250,
  },
  { field: "trn", headerName: "TRN", width: 180 },
  { field: "emirateArrivingto", headerName: "Emirate Arriving To", width: 200 },
  { field: "portofEntry", headerName: "Port of Entry", width: 200 },
  { field: "isDTSGoods", headerName: "Is DTS Goods", width: 150 },
  { field: "itemCode", headerName: "Item Code", width: 180 },
  { field: "itemDescription", headerName: "Item Description", width: 250 },
  {
    field: "productDescription",
    headerName: "Product Description",
    width: 250,
  },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "designatedPrice", headerName: "Designated Price", width: 180 },
  { field: "exciseTax", headerName: "Excise Tax", width: 150 },
  { field: "addedUser", headerName: "Added User", width: 180 },
];

const NoDataCard = () => {
  return (
    <Card
      style={{
        maxWidth: 1100,
        padding: "20px 5px",
        margin: "20px auto",
        boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px", // Optional: To give the card a minimum height
        }}
      >
        <Typography variant="h5" component="p">
          No Data Found.
        </Typography>
        <Typography style={{ marginTop: "20px" }}>
          Please select Month and Year or enter Transaction Number above
        </Typography>
      </CardContent>
    </Card>
  );
};

const Report_EX201_Excise_Goods_Customs = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]); // Use state to store the data
  const { handleSubmit, reset } = useForm();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeTransactionNumber = (event) => {
    setTransactionNumber(event.target.value);
  };

  const fetchData = async (requestData) => {
    try {
      setLoading(true);
      const response = await api.post("/getEmaraForms", requestData);
      console.log(response.data.data);

      const updatedRows = response.data.data.map((row) => ({
        ...row,
        id: row.checkDuplicates,
      }));

      setRows(updatedRows);
      setErrorText("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };



  // const handleFormSubmit = () => {
  //   const isMonthYearSelected = selectedMonth && selectedYear;
  //   const isTransactionNumberEntered = !!transactionNumber;

  //    if (!isMonthYearSelected && !isTransactionNumberEntered) {
  //   setErrorText("*Please select Month and Year or enter Transaction Number");
  //   return;
  // }
  //   setErrorText("");

  //   const requestBody = {
  //     client_Name: "Bombay hospital",
  //     form_Type: "EX201_Excise_Goods_Customs",
  //     skip: 0,
  //     offset: 50,
  //     trans_Num: transactionNumber || null,
  //     period_Month: selectedMonth || null,
  //     period_Year: selectedYear || null,
  //   };

  //   fetchData(requestBody); // Call the fetchData function to fetch data from API
  // };

  let resetFunc = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setTransactionNumber("");
    // setRows([]);
  };

  const handleFormSubmit = () => {


    if (!selectedMonth && selectedYear && transactionNumber) {
     
      setErrorText(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorOpen(true);

      return;
    }

    if (selectedMonth && !selectedYear && transactionNumber) {
    
    
      setErrorText(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorOpen(true);
      return;
    }
    if (!selectedMonth && selectedYear && !transactionNumber) {
      
      
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorOpen(true);
      return;
    }
    if (selectedMonth && !selectedYear && !transactionNumber) {
      
      setErrorText(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorOpen(true);
      return;
    }
    if (selectedMonth && selectedYear && transactionNumber) {
      
      setErrorText(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number, but not both"
      );
      setErrorOpen(true);
      return;
    }

    setErrorText("");
    setErrorOpen(false);

    const requestBody = {
      client_Name: "Bombay hospital",
      form_Type: "EX201_Excise_Goods_Customs",
      skip: 0,
      offset: 50,
      trans_Num: transactionNumber || null,
      period_Month: selectedMonth || null,
      period_Year: selectedYear || null,
    };

    fetchData(requestBody); 
  };

  const handleReset = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setTransactionNumber("");
    setRows([]);
    setErrorText("");
    setErrorOpen(false);
    reset(); 
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        autoHideDuration={5000}
        onClose={() => setErrorOpen(false)}
        style={{ marginTop: "2px" }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorOpen(false)}
          color="primary"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      {/* working card.. */}
      {/* <Card
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
            <Typography>EX201_Excise_Goods_Customs</Typography>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <select
                name="selectedMonth"
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                value={selectedMonth}
                onChange={handleChangeMonth}
              >
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
              <select
                name="selectedYear"
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                value={selectedYear}
                onChange={handleChangeYear}
              >
                <option value="">Select Year</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
              <TextField
                name="transactionNumber"
                variant="outlined"
                label="Transaction Number"
                value={transactionNumber}
                onChange={handleChangeTransactionNumber}
              />
              <Button variant="contained" type="submit">
                <Typography style={{ fontSize: "12px" }}>Submit</Typography>
              </Button>
              <Button variant="contained" onClick={handleReset}>
                <Typography style={{ fontSize: "12px" }}>Reset</Typography>
              </Button>
            </form>
            
          </Box>
        </CardContent>
      </Card> */}
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
            <Typography>EX201_Excise_Goods_Customs - card 2</Typography>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <select
                name="selectedMonth"
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                value={selectedMonth}
                onChange={handleChangeMonth}
              >
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
              <select
                name="selectedYear"
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                value={selectedYear}
                onChange={handleChangeYear}
              >
                <option value="">Select Year</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
              <TextField
                name="transactionNumber"
                variant="outlined"
                label="Transaction Number"
                value={transactionNumber}
                onChange={handleChangeTransactionNumber}
              />
              <Button variant="contained" type="submit">
                <Typography style={{ fontSize: "12px" }}>Submit</Typography>
              </Button>
              <Button variant="contained" onClick={handleReset}>
                <Typography style={{ fontSize: "12px" }}>Reset</Typography>
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
      {/* <Card
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
          <Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">
                EX201_Excise_Goods_Customs - card 3
              </Typography>
            </Box>

            <Box>
              <form onSubmit={handleSubmit(handleFormSubmit)} style={{}}>
                <Grid Container style={{ width: "200px" }}>
                  <Grid item>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel>Select Year</InputLabel>
                        <Select
                          label="Select Year"
                          // displayEmpty
                          value={selectedYear}
                          onChange={handleChangeYear}
                        >
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
                  </Grid>

                  <Grid item>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel>Select Month</InputLabel>
                        <Select
                          label="Select Month"
                          value={selectedMonth}
                          onChange={handleChangeMonth}
                        >
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
                  </Grid>

<Grid item>
<TextField
                  name="transactionNumber"
                  variant="outlined"
                  label="Transaction Number"
                  value={transactionNumber}
                  onChange={handleChangeTransactionNumber}
                />

</Grid>

<Grid item>
<Button variant="contained" type="submit">
                  <Typography style={{ fontSize: "12px" }}>Submit</Typography>
                </Button>
                <Button variant="contained" onClick={handleReset}>
                  <Typography style={{ fontSize: "12px" }}>Reset</Typography>
                </Button>

</Grid>


                </Grid>

            
                
              </form>
            </Box>
          </Box>
        </CardContent>
      </Card> */}
      <Card
        style={{
          maxWidth: 1100,
          padding: "20px 5px",
          margin: " 20px auto",
          boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <CardContent>
          <Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">
                EX201-Excise Goods Customs - card 3
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(handleFormSubmit)} >
              <Grid container spacing={2} alignItems="center">

              <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              // justifyContent: "center",
              marginBottom: "0px",
            }}
          >
            <Typography variant="subtitle1" color='gray'>Period</Typography>
          </Box>
        </Grid>
                <Grid item>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel style={{ fontSize: '13px', fontWeight:'bold' }}>
                      Select Year</InputLabel>
                      <Select
                        label="Select Year"
                        size="medium"
                        variant="outlined"
                        // displayEmpty
                        value={selectedYear}
                        onChange={handleChangeYear}
                        style={{ height: '45px' }}
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
                </Grid>
                <Grid item>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                        style={{ fontSize: '13px', fontWeight:'bold' }}
                        >Select Month</InputLabel>
                        <Select
                          label="Select Month"
                          size="medium"
                          value={selectedMonth}
                          onChange={handleChangeMonth}
                          style={{ height: '45px' }}
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
                  </Grid>

                <Grid item>
                  <Typography variant="subtitle1" style={{ margin: "0 10px" }}>
                    Or
                  </Typography>
                </Grid>
                <Grid item>
                {/* <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
    Transaction Number
  </Typography> */}
   <Typography
            variant="subtitle1"
            style={{ fontWeight: 'bold', margin: '10px 10px' }}
          >
            Transaction Number
          </Typography>
                  <TextField
                    name="transactionNumber"
                    variant="outlined"
                    label="Transaction Number"
                    value={transactionNumber}
                    onChange={handleChangeTransactionNumber}
                    InputLabelProps={{
                      style: { fontSize: '12px', fontWeight:'bold' }, // Set the font size of the label
                    }}
                    // InputProps={{style: {  height: 45, backgroundColor: '#fff' }}}
                    // sx={{'.MuiFormLabel-root[data-shrink=true]': { top: -8} }}
                    sx={{
                      // '& label.Mui-focused': {
                      //   color: 'black', // Set the color of the label when focused
                      // },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'gray', // Set the border color
                        },
                        // '&:hover fieldset': {
                        //   borderColor: 'gray', // Set the border color on hover
                        // },
                        // '&.Mui-focused fieldset': {
                        //   borderColor: 'black', // Set the border color when focused
                        // },
                      },
                      '& .MuiInputBase-input': {
                        height: '10px', // Adjust the height of the input area
                        width:'160px'
                      },
                      '& .MuiInputLabel-root': {
                        lineHeight: '15px', // Adjust the line height to vertically center the label
                      },
                    }}
                   
                    
                  />
                </Grid>
                {/* <Grid item>
                  <Button variant="contained" type="submit">
                    <Typography style={{ fontSize: "12px" }}>Submit</Typography>
                  </Button>
                  <Button variant="contained" onClick={handleReset}>
                    <Typography style={{ fontSize: "12px" }}>Reset</Typography>
                  </Button>
                </Grid> */}
                 <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" mt={0}>
              <Button variant="contained" type="submit" style={{ marginRight: "10px" }}>
                <Typography style={{ fontSize: "12px" }}>Submit</Typography>
              </Button>
              <Button variant="contained" onClick={handleReset}>
                <Typography style={{ fontSize: "12px" }}>Reset</Typography>
              </Button>
            </Box>
          </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
      
      {/* {errorText && (
                <Alert severity="info">{errorText}</Alert> // Display the Alert component conditionally
              )} */}
      {rows.length > 0 ? (
        <Card
          style={{
            maxWidth: 1100,
            padding: "20px 5px",
            margin: " 20px auto",
            boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
          }}
        >
          <CardContent>
            <div style={{ height: 500, width: "100%" }}>
              <Box style={{ margin: "10px auto" }}>
                {loading && <LinearProgress />}
              </Box>
              <DataGrid
                rows={rows}
                columns={columns}
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: { printOptions: { disableToolbarButton: true } },
                }}
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
      ) : (
        <NoDataCard />
      )}
    </Box>
  );
};

export default Report_EX201_Excise_Goods_Customs;
