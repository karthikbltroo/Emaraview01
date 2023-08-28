import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAuth } from "../../utils/AuthContext";
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
// import api from "../../utils/api";
import { useForm } from "react-hook-form";
import axios from "axios";
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

const Report_StockReport = () => {
  const [rows, setRows] = useState([]); // Use state to store the data
  const { handleSubmit, reset } = useForm();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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

  const navigate = useNavigate();

  const handleRowClick = (itemCode, ownerTRN, dzNumber) => {
    // Extract the values from the clicked row

    // Construct the query string
    const queryString = `?itemCode=${itemCode}&ownerTRN=${ownerTRN}&dzNumber=${dzNumber}`;

    // Open a new tab/window with the Report_StockByDeclaration component
    // navigate(`/reports/Report_StockByDeclaration${queryString}`);
    
    window.open(`/reports/Report_StockByDeclaration${queryString}`, "_blank");
  };

  const columns = [
    /// { field: "id", headerName: "ID", width: 100 },
    // { field: "orgID", headerName: "Org ID", width: 100 },
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
      renderCell: (params) => (
        <span
        style={{ color: "blue", cursor: "pointer" }}
          onClick={() =>
            handleRowClick(
              params.row.itemCode,
              params.row.ownerTRN,
              params.row.dzNumber
            )
          }
        >
          {params.row.itemCode}
        </span>
      ),
    },
   
    // { field: "itemCode", headerName: "Item Code", width: 180 },
    { field: "itemDescription", headerName: "Item Description", width: 250 },
    { field: "dzNumber", headerName: "Dz Number", width: 150 },
    { field: "currentStock", headerName: "Current Stock", width: 150 },
    { field: "pendingStock", headerName: "Pending Stock", width: 150 },
    { field: "totalStock", headerName: "Total Stock", width: 150 },
    { field: "ownerTRN", headerName: "Owner TRN", width: 180 },
    
  ];

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

  // const {displayName } = useAuth();
  // console.log(displayName)
  const { displayName } = useAuth();
  // let displayName = sessionStorage.getItem("displayName");
  console.log("name is", displayName);

  const fetchData = async (requestData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${PATHS.STOCKREPORT}`, requestData);
      console.log(response.data);

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
      if (error.response && error.response.status === 401) {
        setErrorMessage("Please login again");
        setSnackbarOpen(true);
        setRows([]);
      } else {
        setErrorMessage("Network or Session timeout error, Login again");
        setSnackbarOpen(true);

        setRows([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultRequestData = {
    client_Name: displayName,
    itemCode: null,
    skip: 0,
    offset: 50,
    dzNumber: null,
    itemDescription: null,
    ownerTRN: null,
    currentStock: {
      dropdownValue: null,
      inputValue: null,
    },
    pendingStock: {
      dropdownValue: null,
      inputValue: null,
    },
    totalStock: {
      dropdownValue: null,
      inputValue: null,
    },
  };

  useEffect(() => {
    // Fetch data only when component mounts
    fetchData({
      client_Name: displayName,
      itemCode: null,
      skip: 0,
      offset: 50,
      dzNumber: null,
      itemDescription: null,
      ownerTRN: null,
      currentStock: {
        dropdownValue: null,
        inputValue: null,
      },
      pendingStock: {
        dropdownValue: null,
        inputValue: null,
      },
      totalStock: {
        dropdownValue: null,
        inputValue: null,
      },
    });
  }, []);

  const handleFormSubmit = () => {
    setErrorOpen(false);

    const requestBody = {
      client_Name: displayName,
      itemCode: itemCode || null,
      skip: 0,
      offset: 50,
      dzNumber: dzNumber || null,
      itemDescription: itemDescription || null,
      ownerTRN: ownerTRN || null,
      currentStock: {
        dropdownValue: null,
        inputValue: currentStock || null,
      },
      pendingStock: {
        dropdownValue: null,
        inputValue: pendingStock || null,
      },
      totalStock: {
        dropdownValue: null,
        inputValue: totalStock || null,
      },
    };

    fetchData(requestBody);
  };

  const handleReset = () => {
    fetchData(defaultRequestData);
    setItemCode("");
    setItemDescription("");
    setDzNumber("");
    setOwnerTRN("");
    setCurrentStock("");
    setPendingStock("");
    setTotalStock("");
    setRows([]);
    setErrorOpen(false);
    reset();
  };

  return (
    <Box>
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
            <Typography variant="h6">Stock Report</Typography>
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
          height: "110px",
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
                      name="itemDescription"
                      variant="outlined"
                      label="Item Description"
                      value={itemDescription}
                      onChange={handleChangeItemDescription}
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
                      name="ownerTRN"
                      type="number"
                      variant="outlined"
                      label="Owner TRN"
                      value={ownerTRN}
                      onChange={handleChangeOwnerTRN}
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
                </Grid>

                <Box display="flex" justifyContent="flex-start" mt={5} mr={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ margin: "10px", marginTop: "10px" }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Submit</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: "10px" }}
                    onClick={handleReset}
                  >
                    <Typography style={{ fontSize: "12px" }}>Reset</Typography>
                  </Button>
                </Box>
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

export default Report_StockReport;
