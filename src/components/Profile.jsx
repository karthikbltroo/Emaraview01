import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Autocomplete,
  Chip,
 


} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
import { useForm } from "react-hook-form";

import { useState , useEffect} from "react";

const Profile = () => {
  const [value, setValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, dob: dayjs(data.dob).format("/DD/YYYY") });
  };



  

  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };


  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "red",
    },
  });
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCountryChange = (event, value) => {
    setSelectedCountry(value);
    setSelectedState(null);
  };

  const handleStateChange = (event, value) => {
    setSelectedState(value);
  };

  const countries = [
    { name: "India", states: ["Delhi", "Mumbai", "Kolkata"], district: [""] },
    { name: "USA", states: ["California", "New York", "Texas"] },
    { name: "UK", states: ["London", "Manchester", "Birmingham"] },
  
  ];

  const data = [
    { actionAt: '2023-07-05 11:26:41 +0530', actionBy: 'John Doe', action: 'edited', comments:'ok' },
    { actionAt: '2023-07-05 11:26:39 +0530', actionBy: 'Jane Smith', action: 'pending',  comments:'checked' },
    { actionAt: '2023-07-05 11:26:39 +0530', actionBy: 'Bob Johnson', action: 'verified', comments:'ok'  },
  ];

// Image code
const ImageBox = styled(Box)({
  width: 200,
  height: 200,
  border: "3px solid #ccc",
  overflow: "hidden",
  // borderStyle:'dotted'
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
});
const UploadImageBox = styled(Box)({
  width: 500,
  height: 200,
  border: "3px solid #ccc",
  overflow: "hidden",
  // borderStyle:'dotted'
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
});

const ImagePreview = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const [existingImage, setExistingImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  useEffect(() => {
    fetchImage(); // Fetch the image
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch(
        "https://source.unsplash.com/random" // Sample image API (returns a random image)
      );
      setExistingImage(response.url); // Set the image URL
    } catch (error) {
      console.log(error);
    }
  };

  // functions
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  const handleImageDelete = () => {
    setSelectedFile(null);
    setIsFileSelected(false);
  };
  // functions
// Image code

  return (
    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" , marginTop:'100px'}}>
      <Box>
    <Card style={{ width: "93vw" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile
        </Typography>
        <Divider />
        <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid xs={12} sm={6} item>
                  <TextField
                    // inputProps={{ style: { fontSize: 23, fontWeight: "500" } }} 
                    // InputLabelProps={{
                    //   style: { fontSize: 23, fontWeight: "500" },
                    // }} 
                    size="large"
                    placeholder="Enter First name"
                    label="First Name"
                    variant="standard"
                    fullWidth
                    required
                    {...register("firstname", {
                      required: true,
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Invalid Text Entry",
                      },
                    })}
                    error={!!errors.firstname}
                    helperText={errors.firstname && errors.firstname.message}
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    // inputProps={{ style: { fontSize: 23 } }} 
                    // InputLabelProps={{
                    //   style: { fontSize: 23, fontWeight: "500" },
                    // }} 
                    size="large"
                    placeholder="Enter Last name"
                    label="Last Name"
                    variant="standard"
                    fullWidth
                   
                    {...register("lastname", {
                      
                      pattern: {
                        value: /^[a-zA-Z ]*$/,
                        message: "Invalid Text Entry",
                      },
                    })}
                    error={!!errors.lastname}
                    helperText={errors.lastname && errors.lastname.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    placeholder="Enter Mobile Number"
                    variant="standard"
                    label="Mobile Number"
                    required
                    {...register("mobilenumber", {
                      required: true,
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    error={!!errors.mobilenumber}
                    helperText={
                      errors.mobilenumber && errors.mobilenumber.message
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                </Grid>

           

                <Box style={{ margin: "100px auto" }}>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Box>

        </Grid>
    
      </CardContent>
    </Card>
    </Box>
    </Box>
  );
};

export default Profile;
