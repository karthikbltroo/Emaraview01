import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
// import api from "../../utils/api";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PATHS } from "../../apiURL";

const baseURL = "http://43.204.209.147:81/Api"

const NoDataCard = () => {
  return (
    <Card
      style={{
        maxWidth: 1100,
        padding: "20px 5px",
        margin: "20px auto",
        // boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        {/* <Typography variant="h5" component="p">
          No Data Found.
        </Typography> */}
        <Typography style={{ marginTop: "18px" }}>
          Please select Month and Year or enter Transaction Number above
        </Typography>
      </CardContent>
    </Card>
  );
};

const Report_StockByDeclaration = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]); // Use state to store the data
  const { handleSubmit, reset } = useForm();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [declarationType, setDeclarationType] = useState("");
  const [transactionNumber, setTransactionNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [dzNumber, setDzNumber] = useState("");
  const [ownerTRN, setOwnerTRN] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [pendingStock, setPendingStock] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [quantity, setQuantity] = useState("");

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  // let displayName = sessionStorage.getItem("displayName");
  const { displayName } = useAuth();
  console.log("name is", displayName);
  const navigate = useNavigate();


  // //////////////////////////////////////////////////

  const openTransactionDetails = (params) => {
    const { transactionNumber, declarationType } = params.row;
  
    let formPagePath = "";
    let formPageQuery = "";
  
    switch (declarationType) {
      case "EX202A_Export_Goods_DZ":
        formPagePath = "/forms/Form_EX202A_Export_Goods_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX201_Excise_Goods_Customs":
        formPagePath = "/forms/Form_EX201_Excise_Goods_Customs";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX202A_Import_DZ":
        formPagePath = "/forms/Form_EX202A_Import_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX202A_Enter_Goods_DZ":
        formPagePath = "/forms/Form_EX202A_Enter_Goods_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX202A_Production":
        formPagePath = "/forms/Form_EX202A_Production_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX202A_Release_Goods_DZ":
        formPagePath = "/forms/Form_EX202A_Release_Goods_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX202A_Transfer_Goods_DZ":
        formPagePath = "/forms/Form_EX202A_Transfer_Goods_DZ";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX203B_Lost_Damaged":
        formPagePath = "/forms/Form_EX203B_Lost_Damaged";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX203C_Transfer_of_Ownership":
        formPagePath = "/forms/Form_EX203C_Transfer_of_Ownership";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      case "EX203_Deductible":
        formPagePath = "/forms/Form_EX203_Deductible";
        formPageQuery = `?transactionNumber=${transactionNumber}`;
        break;
  
      default:
        console.log("Unsupported declaration type:", declarationType);
        break;
    }
  
   
  
    if (formPagePath && formPageQuery) {
      const formPageUrl = `${formPagePath}${formPageQuery}`;
      window.open(formPageUrl, "_blank");
      // navigate(formPageUrl);
    }
  };
  
  const columns = [
    // { field: "id", headerName: "ID", width: 100 },
    // { field: "orgId", headerName: "Org ID", width: 100 },
    {
      field: "transactionNumber",
      headerName: "Transaction Number",
      width: 180,
      renderCell: (params) => (
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => openTransactionDetails(params)}
        >
          {params.value}
        </span>
      ),
    },
    { field: "ownerTRN", headerName: "Owner TRN", width: 180 },
    { field: "itemCode", headerName: "Item Code", width: 180 },
    { field: "dzNumber", headerName: "Dz Number", width: 150 },
    // { field: "transactionNumber", headerName: "Transaction Number", width: 180 },
    {
      field: "periodofdeclarationMonth",
      headerName: "Declaration Month",
      width: 150,
    },
    {
      field: "periodofdeclarationYear",
      headerName: "Declaration Year",
      width: 150,
    },
    { field: "status", headerName: "Status", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "declarationDate", headerName: "Declaration Date", width: 180 },
    { field: "declarationType", headerName: "Declaration Type", width: 180 },
    { field: "runningBalance", headerName: "Running Balance", width: 150 },
    
  
  ];


  //////////////////////////////////////////////////

  useEffect(() => {
    // Retrieve the values from the query parameters
    const itemCodeParam = queryParams.get("itemCode");
    const ownerTRNParam = queryParams.get("ownerTRN");
    const dzNumberParam = queryParams.get("dzNumber");

    // Populate the input fields with the query parameter values

    setItemCode(itemCodeParam || "");
    setOwnerTRN(ownerTRNParam || "");
    setDzNumber(dzNumberParam || "");
    console.log("line 218")
  }, []);



  useEffect(() => {
    // Check if this is the initial load (new tab) or a submit action
    if (!submitted && queryParams.get("itemCode") && queryParams.get("dzNumber") && queryParams.get("ownerTRN")) {
      // Fetch data from API based on the query parameters
      const requestData = {
        client_Name: displayName,
        skip: 0,
        offset: 50,
        itemCode: queryParams.get("itemCode") || null,
        dzNumber: queryParams.get("dzNumber") || null,
        transactionNumber: null,
        periodOfDeclarationMonth: null,
        periodOfDeclarationYear: null,
        ownerTRN: queryParams.get("ownerTRN") || null,
        status: null,
        quantity: null,
        declarationDate: null,
        declarationType: null,
      };
      
      fetchData(requestData);
    } else if (submitted) {
      // Fetch data based on the state values when submit is clicked
      const requestData = {
        client_Name: displayName,
        skip: 0,
        offset: 50,
        itemCode: itemCode || null,
        dzNumber: dzNumber || null,
        transactionNumber: null,
        periodOfDeclarationMonth: null,
        periodOfDeclarationYear: null,
        ownerTRN: ownerTRN || null,
        status: null,
        quantity: null,
        declarationDate: null,
        declarationType: null,
      };
      
      fetchData(requestData);
      setSubmitted(false); // Reset submitted status after fetching data
    }
  }, [submitted]);

  


  // useEffect(() => {

  //   if (itemCode || dzNumber || ownerTRN) {
  //   // Fetch data from API based on the state values
  //   const requestData = {
  //     client_Name: displayName,
  //     skip: 0,
  //     offset: 50,
  //     itemCode: itemCode || null,
  //     dzNumber: dzNumber || null,
  //     transactionNumber: null,
  //     periodOfDeclarationMonth: null,
  //     periodOfDeclarationYear: null,
  //     ownerTRN: ownerTRN || null,
  //     status: null,
  //     quantity: null,
  //     declarationDate: null,
  //     declarationType: null,
  //   };
  //   console.log("line 240", itemCode, dzNumber,ownerTRN)
  //       fetchData(requestData);
  // }
  //       console.log("line 242 after executing fetch data", itemCode, dzNumber,ownerTRN)     
  // }, [itemCode, dzNumber, ownerTRN]);



  // old code
  // useEffect(() => {
  //   // Fetch data from API based on the state values
  //   const requestData = {
  //     client_Name: displayName,
  //     skip: 0,
  //     offset: 50,
  //     itemCode: itemCode || null,
  //     dzNumber: dzNumber || null,
  //     transactionNumber: null,
  //     periodOfDeclarationMonth: null,
  //     periodOfDeclarationYear: null,
  //     ownerTRN: ownerTRN || null,
  //     status: null,
  //     quantity: null,
  //     declarationDate: null,
  //     declarationType: null,
  //   };
  //   fetchData(requestData);
  // }, []);

  
  const handleChangeItemCode = (event) => {
    setItemCode(event.target.value);
  };

  const handleChangeItemDescription = (event) => {
    setItemDescription(event.target.value);
  };

  const handleChangeDzNumber = (event) => {
    setDzNumber(event.target.value);
  };

  const handleChangeOwnerTRN = (event) => {
    setOwnerTRN(event.target.value);
  };

  const handleChangeCurrentStock = (event) => {
    setCurrentStock(event.target.value);
  };

  const handleChangePendingStock = (event) => {
    setPendingStock(event.target.value);
  };

  const handleChangeTotalStock = (event) => {
    setTotalStock(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangeTransactionNumber = (event) => {
    setTransactionNumber(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChangeDeclarationType = (event) => {
    setDeclarationType(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  // const {displayName } = useAuth();
  // console.log(displayName)

  const fetchData = async (requestData) => {
    try {
      setLoading(true);
      console.log("line326",itemCode,dzNumber, ownerTRN )
      const response = await axios.post(`${baseURL}/StockByDeclaration`, requestData);
      console.log("Main response line",response.data);

      const updatedRows = response?.data?.map((row) => ({
        ...row,
        id: row.id,
      }));

      setRows(updatedRows);
      if (response && response.status === 200 && response.data.length === 0) {
        setErrorMessage("No Data found for given period");
        setSnackbarOpen(true);
      }
      setLoading(false);
      if (response && response.status === 401) {
        setErrorMessage("Please login again");
        setSnackbarOpen(true);
      }
    } catch (error) {
      // catch (error) {
      //   if (error.response && error.response.status === 401) {
      //     setErrorMessage("Please login again");
      //     setSnackbarOpen(true);
      //     setRows([]);
      //   } else {
      //     setErrorMessage("Network or Session timeout error, Login again");
      //     setSnackbarOpen(true);
      //     setRows([]);
      //   }

      // }

      console.log("error is", error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Please login again");
          setSnackbarOpen(true);
          setRows([]);
        } else {
          setErrorMessage("Network or Session timeout error, Login again");
          setSnackbarOpen(true);
          setRows([]);
        }
      } else {
        console.log("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setErrorOpen(false);

 // Check if any filter value is provided
 if (!(itemCode || dzNumber || ownerTRN|| transactionNumber || selectedMonth  || selectedYear|| declarationType )) {
  setShowSnackbar(true); // Show Snackbar if no filter values provided
  return; // Don't proceed with fetching data
}


    const requestBody = {
      client_Name: displayName,
      skip: 0,
      offset: 50,
      itemCode: itemCode || null,
      dzNumber: dzNumber || null,
      transactionNumber: transactionNumber || null,
      periodOfDeclarationMonth: selectedMonth || null,
      periodOfDeclarationYear: selectedYear || null,
      ownerTRN: ownerTRN || null,
      status: null,
      quantity: null,
      declarationDate: null,
      declarationType: declarationType || null,
    };

    fetchData(requestBody);
  };

  const handleReset = () => {
    setItemCode("");
    setDzNumber("");
    setOwnerTRN("");
    setTransactionNumber("");
    setDeclarationType("");
    setSelectedMonth("");
    setSelectedYear("");
    setRows([]);
    setErrorOpen(false);
    reset();
  };

  return (
    <Box>

<Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="warning">
          Please enter filter values before submitting.
        </Alert>
      </Snackbar>








      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={6}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        style={{ marginTop: "150px", marginLeft: "350px" }}
      >
        <Alert
          // elevation={6}
          // variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={6}
        open={errorOpen}
        autoHideDuration={5000}
        onClose={() => setErrorOpen(false)}
        style={{ marginTop: "140px", marginLeft: "350px" }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorOpen(false)}
          color="primary"
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Card
        style={{
          maxWidth: 1100,
          margin: " 20px auto",
          // boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
          display: "flex",
          height: "55px",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <CardContent>
          <Box>
            <Typography variant="h6">Stock By Declaration Report</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card
        style={{
          maxWidth: 1100,

          margin: " 20px auto",
          // boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
          display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          height: "200px",
        }}
      >
        <CardContent>
          <Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box style={{ display: "flex" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        // justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle2" color="gray" mb={1}>
                        Report Filter
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="itemCode"
                      type="number"
                      variant="outlined"
                      label="Item Code"
                      value={itemCode}
                      onChange={handleChangeItemCode}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" }, // Set the font size of the label
                      }}
                      // InputProps={{style: {  height: 45, backgroundColor: '#fff' }}}
                      // sx={{'.MuiFormLabel-root[data-shrink=true]': { top: -8} }}
                      sx={{
                        // '& label.Mui-focused': {
                        //   color: 'black', // Set the color of the label when focused
                        // },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray", // Set the border color
                          },
                          // '&:hover fieldset': {
                          //   borderColor: 'gray', // Set the border color on hover
                          // },
                          // '&.Mui-focused fieldset': {
                          //   borderColor: 'black', // Set the border color when focused
                          // },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px", // Adjust the height of the input area
                          width: "160px",
                        },
                        "& .MuiInputBase-input::-webkit-inner-spin-button, .MuiInputBase-input::-webkit-outer-spin-button":
                        {
                          appearance: "none", // Hide Webkit inner and outer spin buttons
                          // margin: 0, // Remove any margin
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px", // Adjust the line height to vertically center the label
                        },
                      }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="dzNumber"
                      variant="outlined"
                      label="Dz Number"
                      value={dzNumber}
                      onChange={handleChangeDzNumber}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" }, // Set the font size of the label
                      }}
                      // InputProps={{style: {  height: 45, backgroundColor: '#fff' }}}
                      // sx={{'.MuiFormLabel-root[data-shrink=true]': { top: -8} }}
                      sx={{
                        // '& label.Mui-focused': {
                        //   color: 'black', // Set the color of the label when focused
                        // },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray", // Set the border color
                          },
                          // '&:hover fieldset': {
                          //   borderColor: 'gray', // Set the border color on hover
                          // },
                          // '&.Mui-focused fieldset': {
                          //   borderColor: 'black', // Set the border color when focused
                          // },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px", // Adjust the height of the input area
                          width: "160px",
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px", // Adjust the line height to vertically center the label
                        },
                      }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="transactionNumber"
                      type="number"
                      variant="outlined"
                      label="Transaction Number"
                      value={transactionNumber}
                      onChange={handleChangeTransactionNumber}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" },
                      }}
                      sx={{
                        // '& label.Mui-focused': {
                        //   color: 'black', // Set the color of the label when focused
                        // },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray", // Set the border color
                          },
                          // '&:hover fieldset': {
                          //   borderColor: 'gray', // Set the border color on hover
                          // },
                          // '&.Mui-focused fieldset': {
                          //   borderColor: 'black', // Set the border color when focused
                          // },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px", // Adjust the height of the input area
                          width: "160px",
                        },
                        "& .MuiInputBase-input::-webkit-inner-spin-button, .MuiInputBase-input::-webkit-outer-spin-button":
                        {
                          appearance: "none", // Hide Webkit inner and outer spin buttons
                          // margin: 0, // Remove any margin
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px", // Adjust the line height to vertically center the label
                        },
                      }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="ownerTRN"
                      type="number"
                      variant="outlined"
                      label="Owner TRN"
                      value={ownerTRN}
                      onChange={handleChangeOwnerTRN}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" },
                      }}
                      sx={{
                        // '& label.Mui-focused': {
                        //   color: 'black', // Set the color of the label when focused
                        // },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray", // Set the border color
                          },
                          // '&:hover fieldset': {
                          //   borderColor: 'gray', // Set the border color on hover
                          // },
                          // '&.Mui-focused fieldset': {
                          //   borderColor: 'black', // Set the border color when focused
                          // },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px", // Adjust the height of the input area
                          width: "160px",
                        },
                        "& .MuiInputBase-input::-webkit-inner-spin-button, .MuiInputBase-input::-webkit-outer-spin-button":
                        {
                          appearance: "none", // Hide Webkit inner and outer spin buttons
                          // margin: 0, // Remove any margin
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px", // Adjust the line height to vertically center the label
                        },
                      }}
                    />
                  </Grid>

                
                  <Grid item style={{ marginTop: "5px" }}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Year
                        </InputLabel>
                        <Select
                          label="Select Year"
                          size="medium"
                          variant="outlined"
                          // displayEmpty
                          value={selectedYear}
                          onChange={handleChangeYear}
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
                  </Grid>

                  <Grid item style={{ marginTop: "5px" }}>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Month
                        </InputLabel>
                        <Select
                          label="Select Month"
                          size="medium"
                          value={selectedMonth}
                          onChange={handleChangeMonth}
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
                  </Grid>

                  <Grid item style={{ marginTop: "5px" }}>
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Declaration Type
                        </InputLabel>
                        <Select
                          label="Select Declaration Type"
                          size="medium"
                          value={declarationType}
                          onChange={handleChangeDeclarationType}
                          style={{ height: "45px" }}
                        >
                          <MenuItem value="">Select Declaration Type</MenuItem>
                          <MenuItem value="EX201_Excise_Goods_Customs">
                            EX201 Excise Goods Customs
                          </MenuItem>
                          <MenuItem value="EX202A_Enter_Goods_DZ">
                            EX202A Enter Goods DZ
                          </MenuItem>
                          <MenuItem value="EX202A_Export_Goods_DZ">
                            EX202A Export Goods DZ
                          </MenuItem>
                          <MenuItem value="EX202A_Import_DZ">
                            EX202A Import DZ
                          </MenuItem>
                          <MenuItem value="EX202A_Production_DZ">
                            EX202A Production DZ
                          </MenuItem>
                          <MenuItem value="EX202A_Release_Goods_DZ">
                            EX202A Release Goods DZ
                          </MenuItem>
                          <MenuItem value="EX202A_Transfer_Goods_DZ">
                            EX202A Transfer Goods DZ
                          </MenuItem>
                          <MenuItem value="EX203_Deductible">
                            EX203 Deductible
                          </MenuItem>
                          <MenuItem value="EX203B_Lost_Damaged">
                            EX203B Lost_Damaged
                          </MenuItem>
                          <MenuItem value="EX203C_Transfer_of_Ownership">
                            EX203C Transfer of Ownership
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    mt={12}
                    mr={14}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ margin: "10px", marginTop: "10px" }}
                    >
                      <Typography style={{ fontSize: "12px" }}>
                        Submit
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      style={{ margin: "10px" }}
                      onClick={handleReset}
                    >
                      <Typography style={{ fontSize: "12px" }}>
                        Reset
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>

      {rows.length > 0 ? (
        <Card
          style={{
            maxWidth: 1100,
            padding: "20px 5px",
            margin: " 20px auto",
            // boxShadow: "0px 0px 13px rgba(0, 0, 0, .25)",
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

export default Report_StockByDeclaration;
