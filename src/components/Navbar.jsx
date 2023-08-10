import React, { useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useAuth } from "../utils/AuthContext";



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
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const isFormsActive = location.pathname.includes("/forms");

  return (
    <>
      {location.pathname !== "/" && (
        <AppBar position="sticky" color="default">
          <Toolbar style={{ background: "#fff", color: "#000" }}>
            <IconButton size="large" edge="start" color="inherit">
              <CatchingPokemonIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Emara Analytics
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
                // className={isReportsOpen ? "active" : ""}
                className={(isReportsOpen || location.pathname.includes("/reports/report")) ? "active" : ""}
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
                          <ListItem button component={NavLink} to="/reports/Report_StockReport">
                            <ListItemText primary="Stock Report" />
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
                // className={isFormsOpen ? "active" : ""}
                // className={(isFormsOpen || location.pathname.includes("/forms/form")) ? "active" : ""}
                className={isFormsActive || isFormsOpen ? "active" : ""}
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
                          <ListItem button component={NavLink} to="/forms/Form_EX201_Excise_Goods_Customs">
                            <ListItemText primary="EX201-Excise Goods Customs" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Export_Goods_DZ">
                            <ListItemText primary="EX202A-Export Goods DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Import_DZ">
                            <ListItemText primary="EX202A-Import DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Enter_Goods_DZ">
                            <ListItemText primary="EX202A-Enter Goods DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Production_DZ">
                            <ListItemText primary="EX202A-Production DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Release_Goods_DZ">
                            <ListItemText primary="EX202A-Release Goods DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX202A_Transfer_Goods_DZ">
                            <ListItemText primary="EX202A-Transfer Goods DZ" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX203B_Lost_Damaged">
                            <ListItemText primary="EX203B-Lost Damaged" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX203C_Transfer_of_Ownership">
                            <ListItemText primary="EX203C-Transfer of Ownership" />
                          </ListItem>
                          <ListItem button component={NavLink} to="/forms/Form_EX203_Deductible">
                            <ListItemText primary="EX203-Deductible" />
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
          
                // activeClassName="active"
                to="/"
                onClick={() => logout(navigate)} 
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
