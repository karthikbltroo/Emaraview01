import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import api from "../../utils/api";
import { useForm } from "react-hook-form";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "orgID", headerName: "Org ID", width: 100 },
  { field: "ownerTRN", headerName: "Owner TRN", width: 180 },
  { field: "itemCode", headerName: "Item Code", width: 180 },
  { field: "itemDescription", headerName: "Item Description", width: 250 },
  { field: "dzNumber", headerName: "Dz Number", width: 150 },
  { field: "currentStock", headerName: "Current Stock", width: 150 },
  { field: "pendingStock", headerName: "Pending Stock", width: 150 },
  { field: "totalStock", headerName: "Total Stock", width: 150 },
];

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
  const { id } = useParams();
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
  let displayName = sessionStorage.getItem("displayName");
  console.log("name is", displayName);



  const fetchData = async (requestData) => {
    try {
      setLoading(true);
      const response = await api.post("/StockReport", requestData);
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

  useEffect(() => {
    // Fetch data only when component mounts
    fetchData({
      client_Name: "AFK FACTORY F.Z.E",
      itemCode:  null,
      skip: 0,
      offset: 50,
      dzNumber:  null,
      itemDescription:  null,
      ownerTRN:  null,
      currentStock: {
        dropdownValue: null,
        inputValue:  null,
      },
      pendingStock: {
        dropdownValue: null,
        inputValue:  null,
      },
      totalStock: {
        dropdownValue: null,
        inputValue:  null,
      },
    });
  }, []);

  const handleFormSubmit = () => {
    // if (
    //   (!selectedMonth && selectedYear && transactionNumber) ||
    //   (selectedMonth && !selectedYear && transactionNumber) ||
    //   (!selectedMonth && selectedYear && !transactionNumber) ||
    //   (selectedMonth && !selectedYear && !transactionNumber) ||
    //   (!selectedMonth && !selectedYear && !transactionNumber)||
    //   (selectedMonth && selectedYear && transactionNumber)
    // ) {
    //   setErrorMessage(
    //     "*Please select Month and Year or enter Transaction Number"
    //   );
    //   setErrorOpen(true);
    //   return;
    // }

    setErrorOpen(false);

    const requestBody = {
      client_Name: "AFK FACTORY F.Z.E",
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
    setItemCode("");
    setItemDescription("");
    setDzNumber("");
    setOwnerTRN("");
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
            <Typography variant="h6">Stock Reports</Typography>
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
                        "& .Mucurrent stockiInputLabel-root": {
                          lineHeight: "15px", // Adjust the line height to vertically center the label
                        },
                      }}
                    />
                  </Grid>

                  {/* other filters in progress */}
                  {/* <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="currentStock"
                      type="number"
                      variant="outlined"
                      label="Current Stock Input"
                      value={currentStock}
                      onChange={handleChangeCurrentStock}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray",
                          },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px",
                          width: "160px",
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="pendingStock"
                      type="number"
                      variant="outlined"
                      label="Pending Stock"
                      value={pendingStock}
                      onChange={handleChangePendingStock}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray",
                          },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px",
                          width: "160px",
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: "2px" }}>
                    <TextField
                      name="totalStock"
                      type="number"
                      variant="outlined"
                      label="Total Stock"
                      value={totalStock}
                      onChange={handleChangeTotalStock}
                      InputLabelProps={{
                        style: { fontSize: "12px", fontWeight: "bold" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "gray",
                          },
                        },
                        "& .MuiInputBase-input": {
                          height: "11px",
                          width: "160px",
                        },
                        "& .MuiInputLabel-root": {
                          lineHeight: "15px",
                        },
                      }}
                    />
                  </Grid> */}
                  {/* <Grid container>
                    <Grid item>
                      <Box
                        sx={{
                          minWidth: 190,
                          marginLeft: "8px",
                          marginTop: "1px",
                        }}
                      >
                        <FormControl fullWidth>
                          <InputLabel
                            style={{ fontSize: "12px", fontWeight: "bold" }}
                          >
                            Current Stock value
                          </InputLabel>
                          <Select
                            label="Current Stock value"
                            size="medium"
                            variant="outlined"
                            // displayEmpty
                            // value={selectedYear}
                            // onChange={handleChangeYear}
                            style={{ height: "45px" }}
                            // InputProps={{style: {  height: 35 }}}
                          >
                            <MenuItem value="">Select Value</MenuItem>
                            <MenuItem value="Is">Equal = </MenuItem>
                            <MenuItem value="Greater Than">Greater </MenuItem>
                            <MenuItem value="Less Than">Lesser</MenuItem>
                                                    </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid> */}

                  {/* <Grid item>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Select Year
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
                  </Grid> */}
                  {/* 
                  <Grid item>
                    <Box sx={{ minWidth: 150 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          Select Month
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
                  </Grid> */}
                </Grid>

                {/* <Box style={{ margin: "40px 15px 0px -130px" }}>
                  <Grid Container>
                    <Grid item>
                      <Typography variant="subtitle1" component="p">
                        Or
                      </Typography>
                    </Grid>
                  </Grid>
                </Box> */}
                {/* <Grid container>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        // justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle2" color="gray" mb={-1}>
                        Transaction Number
                      </Typography>
                    </Box>
                  </Grid>

             
                  <Box display="flex" justifyContent="flex-start" mt={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ margin: "10px" }}
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
                </Grid> */}
                <Box display="flex" justifyContent="flex-start" mt={5} mr={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ margin: "10px", marginTop:'10px' }}
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
