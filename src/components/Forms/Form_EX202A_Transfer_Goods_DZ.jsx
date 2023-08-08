import React, { useState } from "react";
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
  { field: "transactionNumber", headerName: "Transaction Number", width: 200 },
  {
    field: "eServicesReferenceNumber",
    headerName: "eServices Reference Number",
    width: 250,
  },
  { field: "dateofSubmission", headerName: "Date of Submission", width: 150 },
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
  { field: "status", headerName: "Status", width: 200 },
  { field: "trn", headerName: "TRN", width: 150 },
  { field: "purchaserTRN", headerName: "Purchaser TRN", width: 150 },
  {
    field: "originDesignatedZoneNumber",
    headerName: "Origin Designated Zone Number",
    width: 250,
  },
  {
    field: "istheownershipofthegoodsbeingtransferred",
    headerName: "Ownership Transfer",
    width: 150,
  },
  {
    field: "destinationDesignatedZoneNumber",
    headerName: "Destination Designated Zone Number",
    width: 250,
  },
  { field: "designatedPrice", headerName: "Designated Price", width: 150 },
  { field: "itemCode", headerName: "Item Code", width: 150 },
  { field: "itemDescription", headerName: "Item Description", width: 300 },
  {
    field: "productDescription",
    headerName: "Product Description",
    width: 300,
  },
  { field: "quantity", headerName: "Quantity", width: 150 },
  { field: "exciseTax", headerName: "Excise Tax", width: 150 },
  { field: "checkDuplicates", headerName: "Check Duplicates", width: 200 },
  { field: "taxciseMovementID", headerName: "Taxcise Movement ID", width: 200 },
  { field: "modifiedTime", headerName: "Modified Time", width: 200 },
  { field: "modifiedUser", headerName: "Modified User", width: 150 },
  { field: "addedTime", headerName: "Added Time", width: 200 },
  { field: "addedUser", headerName: "Added User", width: 150 },
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

const Form_EX202A_Transfer_Goods_DZ = () => {
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

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleChangeTransactionNumber = (event) => {
    setTransactionNumber(event.target.value);
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
      const response = await api.post("/getEmaraForms", requestData);
      console.log(response.data.data);

      const updatedRows = response?.data?.data?.map((row) => ({
        ...row,
        id: row.checkDuplicates,
      }));

      setRows(updatedRows);
      if (
        response &&
        response.status === 200 &&
        response.data.data.length === 0
      ) {
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

  const handleFormSubmit = () => {
    if (
      (!selectedMonth && selectedYear && transactionNumber) ||
      (selectedMonth && !selectedYear && transactionNumber) ||
      (!selectedMonth && selectedYear && !transactionNumber) ||
      (selectedMonth && !selectedYear && !transactionNumber) ||
      (!selectedMonth && !selectedYear && !transactionNumber)
      // (selectedMonth && selectedYear && transactionNumber)
    ) {
      setErrorMessage(
        "*Please select Month and Year or enter Transaction Number"
      );
      setErrorOpen(true);
      return;
    }

    setErrorOpen(false);

    const requestBody = {
      client_Name: displayName,
      form_Type: "EX202A_Transfer_Goods_DZ",
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
            <Typography variant="h6">Form_EX202A_Transfer_Goods_DZ</Typography>
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
          height: "100px",
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
                      <Typography variant="subtitle2" color="gray" mb={-1}>
                        Period
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item>
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
                  </Grid>

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
                  </Grid>
                </Grid>
                <Box style={{ margin: "40px 15px 0px -130px" }}>
                  <Grid Container>
                    <Grid item>
                      <Typography variant="subtitle1" component="p">
                        Or
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container>
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

                  <Grid item style={{ marginTop: "15px" }}>
                    <TextField
                      name="transactionNumber"
                      variant="outlined"
                      label="Transaction Number"
                      value={transactionNumber}
                      onChange={handleChangeTransactionNumber}
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

export default Form_EX202A_Transfer_Goods_DZ;
