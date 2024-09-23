import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home.js";
import Login from './components/Login.js';
import CreateUser from "./components/CreateUser.js";
import ViewUsers from "./components/ViewUsers.js";
import DailyData from "./components/DailyData.js";
import CreateGoal from './components/CreateGoal.js'
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/mulish";

const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif", 
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-user">Create User</Link>
            </li>
            <li>
              <Link to="/view-users">View Users</Link>
            </li>
            <li>
              <Link to="/login">Login</Link> 
            </li>
            <li>
              <Link to="/enter-daily-data">Daily Data</Link>
            </li>
            <li>
              <Link to="/create-goal">Create Goal</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/create-user" element={CreateUser()} />
          <Route path="/view-users" element={ViewUsers()} />
          <Route path="/login" element={<Login />} />
          <Route path="/enter-daily-data" element={DailyData()} />
          <Route path="/create-goal" element={CreateGoal()} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
