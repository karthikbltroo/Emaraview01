import React from "react";
import {
  Card,
  CardContent,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
});

const LeftDivision = styled(CardContent)({
  flex: "1 0 50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const RightDivision = styled(CardContent)({
  flex: "1 0 50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DividerContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ({ theme }) => theme.spacing(2),
});

const DividerStyled = styled(Divider)({
  backgroundColor: "#1976D2", // Blue border color for the divider
  width: "100%",
});

const MyCard = () => {
  return (
    <StyledCard>
      <LeftDivision>
        <Typography variant="h5">Left Division</Typography>
      </LeftDivision>
      <DividerContainer>
        <DividerStyled orientation="vertical" />
      </DividerContainer>
      <RightDivision>
        <Typography variant="h5">Right Division</Typography>
      </RightDivision>
    </StyledCard>
  );
};

export default MyCard;
