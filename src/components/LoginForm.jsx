import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
// import combinedImage from "../assets/combined.png";
// import pink from '../assets/pink.jpg'
import LoginImage from "../assets/LoginImage.png";
import logoSvg from "../assets/EmaraAnalyticsLogo.svg";

import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const BorderBox = styled(Box)({
  border: "4px solid #72627D", // Blue border color
  borderRadius: "10px",
  // backgroundColor: "#f0f5fc", // Light blue background color
  display: "flex",
  height: "80vh",
  marginTop: "30px",
  overflow: "hidden", // To keep the border wrap both divisions
  width: "60%", // Reduce the width by 40%
  margin: "30px auto",
});

const WhiteCard = styled(Card)({
  background: "#fff",
  flex: 1,
  // margin: "-8px", // Negative margin to extend outside the border
});

// const LeftDivision = styled(CardContent)({
//   flex: 1,
//   width: "80%", // Reduce the width by 40%
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   // margin: "8px", // Add margin to compensate for the negative margin of the card
//   objectFit:'cover'
// });
const LeftDivision = styled(CardContent)({
  width: "100%", // Set width to 100%
  height: "100%", // Set height to 100%
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // Remove margin to eliminate space between image and container
  "& img": {
    width: "90%",
    height: "90%",
    objectFit: "cover",
  },
});

const RightDivision = styled(CardContent)({
  flex: 1,
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: ({ theme }) => theme.spacing(2),
  marginTop: "70px",
  marginLeft: "20px",
});

const Image = styled("img")({
  width: "50%",
  height: "50%",
  // borderRadius: "50%",
  // border: "3px solid #1976D2", // Blue border color for the image
});

const Form = styled("form")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: ({ theme }) => theme.spacing(5),
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "20px",
});

const SignUpButton = styled(Button)({
  width: "100%",
});

const DividerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ({ theme }) => theme.spacing(2),
});

const DividerStyled = styled(Divider)({
  backgroundColor: "#72627D", // Blue border color for the divider
});
const StyledHeading = styled(Typography)({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#1976D2", // Blue color
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Shadow effect
  textAlign: "center",
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await login(data.username, data.password);
      setLoading(false);
      if (response && response.status === 401) {
        setLoginError("Invalid credentials, Login again");
        setSnackbarOpen(true);
         } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoginError("An error occurred during login - check network");
      setSnackbarOpen(true);
      
    }
  };

  return (
    <BorderBox>
      <WhiteCard>
        <LeftDivision>
          {/* Replace the image source with your desired image */}
          <Image src={LoginImage} alt="Emara View" />
          {/* <StyledHeading
              variant="h2"
              style={{
                marginTop: "90px",
                marginLeft: "30px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Welcome to Emara View
            </StyledHeading> */}
        </LeftDivision>
      </WhiteCard>
      <DividerContainer>
        <DividerStyled orientation="vertical" sx={{ height: "100%" }} />
      </DividerContainer>
      <WhiteCard>
        <RightDivision>

        <img
              src={logoSvg}
              alt="Emara Analytics Logo"
              style={{ height: "100px", width: "auto", marginTop:'10px' }}
            />
          {/* <Typography variant="h4" color="primary"   mb={2}>
            Welcome to Emara Analytics
          </Typography> */}
          <Box style={{ marginBottom: "60px" }}>
          

          </Box>

   
          {/* <DividerStyled sx={{ width: "100%" }} /> */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField
              type="email"
              placeholder="Enter user name"
              label="Enter username*"
              variant="standard"
              fullWidth
              {...register("username", {
                required: true,
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "username is not valid",
                },
              })}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />

            <StyledTextField
              label="Enter password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              {...register("password", {
                required: true,
                // pattern: {
                //   value: /^[a-zA-Z ]*$/,
                //   message: "Invalid Text Entry",
                // },
              })}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <SignUpButton type="submit" variant="contained" color="primary">
              Login
            </SignUpButton>
            {loading && <CircularProgress color="primary" />}
          </Form>
          {/* {loading && <LinearProgress />} */}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            style={{ marginTop: "30px", marginLeft: "190px" }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity="error"
            >
              {loginError}
            </Alert>
          </Snackbar>
        </RightDivision>
      </WhiteCard>
    </BorderBox>
  );
};

export default LoginForm;
