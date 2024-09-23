import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home.js";
import CreateUser from "./components/CreateUser.js";
import ViewUsers from "./components/ViewUsers.js";
import DailyData from "./components/DailyData.js";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "@fontsource/mulish";

const theme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif", // 全局设置 Mulish 字体
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
              <Link to="/enter-daily-data">Daily Data</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/create-user" element={CreateUser()} />
          <Route path="/view-users" element={ViewUsers()} />
          <Route path="/enter-daily-data" element={DailyData()} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
