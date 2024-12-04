import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import CreateUser from "./components/CreateUser.js";
import ResetPasswordRequest from "./components/ResetPasswordRequest.js";
import OneTimePassword from "./components/OneTimePassword.js";
import PasswordReset from "./components/PasswordReset.js";
import ViewUsers from "./components/ViewUsers.js";
import ManageProfile from "./components/ManageProfile.js";
import DailyData from "./components/DailyData.js";
import CreateGoal from "./components/CreateGoal.js";
import ManageDailyData from "./components/ManageDailyData.js";
import LogoutButton from "./components/Logout.js";

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

// Styling
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TodayIcon from '@mui/icons-material/Today';

import "@fontsource/mulish";

const sidebarWidth = "16vw";
const appBarHeight = "5rem";

const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif",
  },
  palette: {
    primary: {
      main: "#e2ddd5",
      secondary: "#3A3A3A",
    },
  },
});

function App({ RouterComponent = Router }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On component mount, check if user is already logged in
  useEffect(() => {
    const token = Cookies.get('authToken')
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterComponent>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          {/* AppBar at the top */}
          <AppBar
            position="fixed"
            sx={{
              height: `${appBarHeight}`,
              bgcolor: "primary.secondary",
              boxShadow: theme.shadows[1],
            }}
          >
            <Toolbar
              sx={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <img
                src="/app-logo.png"
                alt="Logo"
                style={{
                  height: `calc(${appBarHeight} - 1rem)`,
                  width: `calc(${appBarHeight} - 1rem)`,
                  margin: "1%",
                }}
              />
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  padding: "3%",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Health and Wellness Tracker - Forked by Cory Potwin
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Left side navigation drawer */}
          <Drawer
            sx={{
              marginTop: appBarHeight,
              height: `calc(100% - ${appBarHeight})`,
              width: sidebarWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                marginTop: appBarHeight,
                width: sidebarWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            {/* Sidebar Navigation */}
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon>
                    {" "}
                    <HomeIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

              {!isAuthenticated ? (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login">
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <LogoutButton setIsAuthenticated={setIsAuthenticated} />
              )}

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/enter-daily-data">
                  <ListItemIcon>
                    {" "}
                    <EditNoteIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Record Daily Data" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/manage-daily-data">
                  <ListItemIcon>
                    {" "}
                    <TodayIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Manage Daily Data" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/create-goal">
                  <ListItemIcon>
                    {" "}
                    <TrackChangesIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Manage Goal" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/manage-profile">
                  <ListItemIcon>
                    {" "}
                    <AccountCircleIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary="Manage Profile" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "#E2DDD5", // Background color applied here
              minHeight: "100vh", // Full viewport height for every page
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              {/* Routes need to be outside of the Drawer, so that they render in the main content area */}
              <Routes>
                <Route path="/" element={<Home initialData={[]}/>} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
                <Route path="/one-time-password" element={<OneTimePassword setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="/view-users" element={<ViewUsers />} />
                <Route path="/manage-profile" element={<ManageProfile />} />
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/enter-daily-data" element={<DailyData />} />
                <Route
                  path="/manage-daily-data"
                  element={<ManageDailyData />}
                />
                <Route path="/create-goal" element={<CreateGoal />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </RouterComponent>
    </ThemeProvider>
  );
}

export default App;
