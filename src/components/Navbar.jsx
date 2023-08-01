// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   NavLink,
//   useLocation
// } from "react-router-dom";
// import {
//   AppBar,
//   Button,
//   Tab,
//   Tabs,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Avatar,
//   Tooltip,
//   IconButton,
//   MenuItem,
//   Box,
//   Menu,
//   SvgIcon,
//   styled,
//   Card,
//   Stack,
// } from "@mui/material";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
// import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
// import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
// import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
// import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import DescriptionIcon from '@mui/icons-material/Description';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import DashboardIcon from '@mui/icons-material/Dashboard';

// const StyledButton = styled(Button)(({ theme }) => ({
//   "&.active": {
//     borderBottom: `4px solid blue`,
//     fontWeight: "bold",

//     "& svg": {
//       color: "blue",
//     },
//   },
//   "&:hover": {
//     // backgroundColor: 'black',
//     // color: 'white',
//   },
// }));

// // const Navbar = styled("nav")(({ theme }) => ({
// //   borderBottom: "1px solid #ccc",
// // }));

// const NavItem = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   marginBottom: theme.spacing(1),
// }));

// const IconContainer = styled("div")(({ theme }) => ({
//   marginRight: theme.spacing(2),
// }));

// const IconTextContainer = styled(Box)({
//   display: "flex",
//   alignItems: "center",
// });

// const Icon = styled(BrandingWatermarkOutlinedIcon)({
//   marginRight: "5px",
// });

// const Navbar = () => {
//   const [value, setValue] = useState();
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const theme = useTheme();
//   //  console.log(theme);
//   // const isMatch = useMediaQuery(theme.breakpoints.down("md"));
//   // console.log(isMatch);

//   const settings = ["Profile", "Account", "Logout"];
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const [isReportsOpen, setIsReportsOpen] = useState(false);
//   const [isFormsOpen, setIsFormsOpen] = useState(false);
//   const location = useLocation();

//   const handleReportsMenu = () => {
//     setIsReportsOpen((prev) => !prev);
//   };

//   const handleFormsMenu = () => {
//     setIsFormsOpen((prev) => !prev);
//   };

//   const handleCloseReports = (event) => {
//     if (anchorReportsRef.current && anchorReportsRef.current.contains(event.target)) {
//       return;
//     }

//     setIsReportsOpen(false);
//   };

//   const handleCloseForms = (event) => {
//     if (anchorFormsRef.current && anchorFormsRef.current.contains(event.target)) {
//       return;
//     }

//     setIsFormsOpen(false);
//   };

//   const anchorReportsRef = React.useRef(null);
//   const anchorFormsRef = React.useRef(null);

//   return (
//     <>
//      {location.pathname !== "/" && (
//       <AppBar position="sticky">
//         <Toolbar style={{ background: "#fff", color: "#000" }}>
//           <IconButton size="large" edge="start" color="inherit">
//             <CatchingPokemonIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" marginRight={20}>
//             Emara View
//           </Typography>

//           <Stack direction="row" spacing={4}>
//             {/* <Button color="inherit" component={Link} to="/dashboard">
//               Dashboard
//             </Button>
//             <Button color="inherit">Emara Forms</Button>
           
//             <Button color="inherit">Logout</Button> */}


// <StyledButton
//               component={NavLink}
//               to="/dashboard"
//               activeClassName="active"
//               color="inherit"
//             >
//               <IconTextContainer>
//                 <DashboardIcon style={{marginRight:'6px'}} />
//               </IconTextContainer>
//               <Typography style={{ fontSize: "12px" }}>Dashboard</Typography>
//             </StyledButton>

//             <StyledButton
//               component={NavLink}
//               to="/reports"
//               activeClassName="active"
//               color="inherit"
//             >
//               <IconTextContainer>
//                 <AssessmentIcon style={{marginRight:'6px'}} />
//               </IconTextContainer>
//               <Typography style={{ fontSize: "12px" }}>Reports</Typography>
//             </StyledButton>

//             <StyledButton
//               component={NavLink}
//               to="/Emaraforms"
//               activeClassName="active"
//               color="inherit"
//             >
//               <IconTextContainer>
//                 <DescriptionIcon style={{marginRight:'6px'}} />
//               </IconTextContainer>
//               <Typography style={{ fontSize: "12px" }}>Emara Forms</Typography>
//             </StyledButton>

//             <StyledButton
//               component={NavLink}
//               to="/profile"
//               activeClassName="active"
//               color="inherit"
//             >
//               <IconTextContainer>
//                 <AccountCircleIcon style={{marginRight:'6px'}} />
//               </IconTextContainer>
//               <Typography style={{ fontSize: "12px" }}>Profile</Typography>
//             </StyledButton>

//             <StyledButton
//               component={NavLink}
//               to="/logout"
//               activeClassName="active"
//               color="inherit"
//             >
//               <IconTextContainer>
//                 <LogoutIcon style={{marginRight:'6px'}} />
//               </IconTextContainer>
//               <Typography style={{ fontSize: "12px" }}>Logout</Typography>
//             </StyledButton>

           
//           </Stack>
//         </Toolbar>
//       </AppBar>)}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Stack,
  IconButton,
  styled,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";


const StyledButton = styled(Button)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  padding: "6px 16px",
  borderRadius: "4px",
  transition: "background-color 0.3s, color 0.3s",
  "&.active": {
    backgroundColor: "#f0f8ff", // Light blue color for active tab
    color: "blue", // Blue color for active text
    "& svg": {
      color: "blue", // Blue color for active icon
    },
  },
  "&:hover": {
    backgroundColor: "#f0f8ff", // Light blue color on hover
  },
}));

const Navbar = () => {
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  const location = useLocation();

  const handleReportsMenu = () => {
    setIsReportsOpen((prev) => !prev);
  };

  const handleFormsMenu = () => {
    setIsFormsOpen((prev) => !prev);
  };

  const handleCloseReports = (event) => {
    if (anchorReportsRef.current && anchorReportsRef.current.contains(event.target)) {
      return;
    }
    setIsReportsOpen(false);
  };

  const handleCloseForms = (event) => {
    if (anchorFormsRef.current && anchorFormsRef.current.contains(event.target)) {
      return;
    }
    setIsFormsOpen(false);
  };

  const anchorReportsRef = useRef(null);
  const anchorFormsRef = useRef(null);

  return (
    <>
      {location.pathname !== "/" && (
        <AppBar position="sticky" color="default">
          <Toolbar style={{ background: "#fff", color: "#000" }}>
            <IconButton size="large" edge="start" color="inherit">
              <CatchingPokemonIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Emara View
            </Typography>
            <Stack direction="row" spacing={4}>
              <StyledButton
                component={NavLink}
                to="/dashboard"
                activeClassName="active"
              >
                <Stack direction="row" alignItems="center">
                  <DashboardIcon style={{ marginRight: "6px" }} />
                  <Typography variant="body2">Dashboard</Typography>
                </Stack>
              </StyledButton>
              <StyledButton
                ref={anchorReportsRef}
                onClick={handleReportsMenu}
                aria-controls={isReportsOpen ? "reports-list" : undefined}
                aria-haspopup="true"
                className={isReportsOpen ? "active" : ""}
              >
                <Stack direction="row" alignItems="center">
                  <AssessmentIcon style={{ marginRight: "6px" }} />
                  <Typography variant="body2">Reports</Typography>
                </Stack>
              </StyledButton>
              <Popper
                open={isReportsOpen}
                anchorEl={anchorReportsRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseReports}>
                        <List autoFocusItem={isReportsOpen} id="reports-list">
                          <ListItem button component={NavLink} to="/reports/reportAA">
                            <ListItemText primary="Report AA" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/reports/reportBB">
                            <ListItemText primary="Report BB" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/reports/reportCC">
                            <ListItemText primary="Report CC" />
                          </ListItem>
                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <StyledButton
                ref={anchorFormsRef}
                onClick={handleFormsMenu}
                aria-controls={isFormsOpen ? "forms-list" : undefined}
                aria-haspopup="true"
                className={isFormsOpen ? "active" : ""}
              >
                <Stack direction="row" alignItems="center">
                  <DescriptionIcon style={{ marginRight: "6px" }} />
                  <Typography variant="body2">Emara Forms</Typography>
                </Stack>
              </StyledButton>
              <Popper
                open={isFormsOpen}
                anchorEl={anchorFormsRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseForms}>
                        <List autoFocusItem={isFormsOpen} id="forms-list">
                          <ListItem button component={NavLink} to="/forms/formAA">
                            <ListItemText primary="Form AA" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/formBB">
                            <ListItemText primary="Form BB" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/formCC">
                            <ListItemText primary="Form CC" />
                          </ListItem>
                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <StyledButton
                component={NavLink}
                to="/profile"
                activeClassName="active"
              >
                <Stack direction="row" alignItems="center">
                  <AccountCircleIcon style={{ marginRight: "6px" }} />
                  <Typography variant="body2">Profile</Typography>
                </Stack>
              </StyledButton>
              <StyledButton
                component={NavLink}
                to="/logout"
                activeClassName="active"
              >
                <Stack direction="row" alignItems="center">
                  <LogoutIcon style={{ marginRight: "6px" }} />
                  <Typography variant="body2">Logout</Typography>
                </Stack>
              </StyledButton>
            </Stack>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
