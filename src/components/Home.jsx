import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const BorderBox = styled(Box)({
  border: "4px solid #1976D2", // Blue border color
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

const LeftDivision = styled(CardContent)({
  flex: 1,
  width: "80%", // Reduce the width by 40%
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // margin: "8px", // Add margin to compensate for the negative margin of the card
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
  width: "80%",
  height: "60%",
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
  backgroundColor: "#1976D2", // Blue border color for the divider
});
const StyledHeading = styled(Typography)({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#1976D2", // Blue color
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Shadow effect
  textAlign: "center",
});

const TwoDivisionsCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const onSubmit = async (data) => {
    try {
      const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              };
      const response = await axios.post("http://43.204.209.147:81/Api/login", {
        userName: data.username,
        password: data.password,
      },{headers});
  
      console.log(response);
  
     
      if (response) {
        navigate("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  };
  




  return (
    <BorderBox>
      <WhiteCard>
        <LeftDivision>
          <Box>
            {/* Replace the image source with your desired image */}
            {/* <Image src="src/assets/pexels-nataliya-vaitkevich-6863175.jpg" /> */}
            <StyledHeading
              variant="h2"
              style={{
                marginTop: "90px",
                marginLeft: "30px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Welcome to Emara View
            </StyledHeading>
          </Box>
        </LeftDivision>
      </WhiteCard>
      <DividerContainer>
        <DividerStyled orientation="vertical" sx={{ height: "90%" }} />
      </DividerContainer>
      <WhiteCard>
        <RightDivision>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {/* <DividerStyled sx={{ width: "100%" }} />
          <Form>
            <StyledTextField label="Username" variant="outlined" />
            <StyledTextField label="Password" variant="outlined" type="password" />
            <SignUpButton variant="contained" color="primary">
              Sign Up
            </SignUpButton>
          </Form> */}

          {/* <DividerStyled sx={{ width: "100%" }} /> */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField
              type="email"
              placeholder="Enter user name"
              label="user name"
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
            {/* <StyledTextField
            size="large"
            placeholder="Enter password"
            label="Enter password"
            variant="standard"
            fullWidth
            required
            {...register("password", {
              required: true,
              // pattern: {
              //   value: /^[a-zA-Z ]*$/,
              //   message: "Invalid Text Entry",
              // },
            })}
        
          /> */}
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
              Sign Up
            </SignUpButton>
          </Form>
        </RightDivision>
      </WhiteCard>
    </BorderBox>
  );
};

export default TwoDivisionsCard;

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const headers = {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       };

//       const response = await axios.post(
//         "http://43.204.209.147:81/Api/login",
//         {
//           username,
//           password,
//         },
//         { headers }
//       );

//       if (response) {
// console.log(response)
//         navigate("/dashboard");
//       } else {
//         alert("Invalid username or password");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred during login");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <br />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
