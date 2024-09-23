import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './components/Home.js'
import CreateUser from './components/CreateUser.js'
import ViewUsers from './components/ViewUsers.js'
import CreateGoal from './components/CreateGoal.js'

function App() {
  return (
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
              <Link to="/create-goal">Create Goal</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/create-user" element={CreateUser()} />
          <Route path="/view-users" element={ViewUsers()} />
          <Route path="/create-goal" element={CreateGoal()} />
        </Routes>
    </Router>
  )
}

export default App;
