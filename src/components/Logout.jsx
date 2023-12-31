import React,{useState} from "react";
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

const BorderBox = styled(Box)({
  border: "4px solid #1976D2", // Blue border color
  borderRadius: "10px",
  // backgroundColor: "#f0f5fc", // Light blue background color
  display: "flex",
  height: "80vh",
  marginTop:'30px',
  overflow: "hidden", // To keep the border wrap both divisions
  width: "60%", // Reduce the width by 40%
  margin:'30px auto'
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
  marginTop:'70px',
  marginLeft:'20px'
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
  marginBottom: '20px'
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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit = (data) => {
    if (data.username === "user" && data.password === "pass") {
      // Redirect to the dashboard page
      navigate("/dashboard");
      setIsLoggedIn(true);
    } else {
      // Handle invalid credentials or show error message
    }
  };
  return (
    <BorderBox>
      <WhiteCard>
   <Typography style={{display:'flex', alignItems:'center', justifyContent:'center' ,fontWeight:'200px', fontSize:'50px'}} >Logged out sucessfully</Typography>
      </WhiteCard>
  
  

    </BorderBox>
  );
};

export default TwoDivisionsCard;
