import React from "react";
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

const BorderBox = styled(Box)({
  border: "4px solid #1976D2", // Blue border color
  borderRadius: "10px",
  // backgroundColor: "#f0f5fc", // Light blue background color
  display: "flex",
  height: "80vh",
  overflow: "hidden", // To keep the border wrap both divisions
});

const LeftDivision = styled(CardContent)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RightDivision = styled(CardContent)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: ({ theme }) => theme.spacing(2),
  // borderLeft: "1px solid #1976D2", // Blue border for the right division
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
  marginTop: ({ theme }) => theme.spacing(3),
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: ({ theme }) => theme.spacing(2),
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

const TwoDivisionsCard = () => {
  return (
    <BorderBox>
     
      <LeftDivision>
        <Box>
          {/* Replace the image source with your desired image */}
          {/* <Image src="src/assets/pexels-nataliya-vaitkevich-6863175.jpg" /> */}
          <Typography variant="h6">Welcome to Emara View</Typography>
        </Box>
      </LeftDivision>
      <DividerContainer>
        <DividerStyled orientation="vertical" sx={{ height: "80%" }} />
      </DividerContainer>
      <RightDivision>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <DividerStyled sx={{ width: "100%" }} />
        <Form>
          <StyledTextField label="Username" variant="outlined" />
          <StyledTextField label="Password" variant="outlined" type="password" />
          <SignUpButton variant="contained" color="primary">
            Sign Up
          </SignUpButton>
        </Form>
      </RightDivision>
    </BorderBox>
  );
};

export default TwoDivisionsCard;
