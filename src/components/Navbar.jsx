import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Tooltip,
  IconButton,
  MenuItem,
  Box,
  Menu,
  SvgIcon,
  styled,
  Card,
  Stack,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';

const StyledButton = styled(Button)(({ theme }) => ({
  "&.active": {
    borderBottom: `4px solid blue`,
    fontWeight: "bold",

    "& svg": {
      color: "blue",
    },
  },
  "&:hover": {
    // backgroundColor: 'black',
    // color: 'white',
  },
}));

// const Navbar = styled("nav")(({ theme }) => ({
//   borderBottom: "1px solid #ccc",
// }));

const NavItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const IconContainer = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const IconTextContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const Icon = styled(BrandingWatermarkOutlinedIcon)({
  marginRight: "5px",
});

const Navbar = () => {
  const [value, setValue] = useState();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  //  console.log(theme);
  // const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  const settings = ["Profile", "Account", "Logout"];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar style={{ background: "#fff", color: "#000" }}>
          <IconButton size="large" edge="start" color="inherit">
            <CatchingPokemonIcon />
          </IconButton>
          <Typography variant="h6" component="div" marginRight={20}>
            Emara View
          </Typography>

          <Stack direction="row" spacing={4}>
            {/* <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit">Emara Forms</Button>
           
            <Button color="inherit">Logout</Button> */}


<StyledButton
              component={NavLink}
              to="/dashboard"
              activeClassName="active"
              color="inherit"
            >
              <IconTextContainer>
                <DashboardIcon style={{marginRight:'6px'}} />
              </IconTextContainer>
              <Typography style={{ fontSize: "12px" }}>Dashboard</Typography>
            </StyledButton>

            <StyledButton
              component={NavLink}
              to="/reports"
              activeClassName="active"
              color="inherit"
            >
              <IconTextContainer>
                <AssessmentIcon style={{marginRight:'6px'}} />
              </IconTextContainer>
              <Typography style={{ fontSize: "12px" }}>Reports</Typography>
            </StyledButton>

            <StyledButton
              component={NavLink}
              to="/Emaraforms"
              activeClassName="active"
              color="inherit"
            >
              <IconTextContainer>
                <DescriptionIcon style={{marginRight:'6px'}} />
              </IconTextContainer>
              <Typography style={{ fontSize: "12px" }}>Emara Forms</Typography>
            </StyledButton>

            <StyledButton
              component={NavLink}
              to="/profile"
              activeClassName="active"
              color="inherit"
            >
              <IconTextContainer>
                <AccountCircleIcon style={{marginRight:'6px'}} />
              </IconTextContainer>
              <Typography style={{ fontSize: "12px" }}>Profile</Typography>
            </StyledButton>

            <StyledButton
              component={NavLink}
              to="/logout"
              activeClassName="active"
              color="inherit"
            >
              <IconTextContainer>
                <LogoutIcon style={{marginRight:'6px'}} />
              </IconTextContainer>
              <Typography style={{ fontSize: "12px" }}>Logout</Typography>
            </StyledButton>

           
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
