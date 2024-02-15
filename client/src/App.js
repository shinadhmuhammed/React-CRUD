import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Users from "./Components/Users";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import Signup from "./Components/users/Signup";
import Login from "./Components/users/Login";
import Home from "./Components/users/Home";
import Profile from "./Components/users/Profile";
import AdminLogin from "./Components/AdminLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/adminlogin" element={<AdminLogin />}></Route>
          <Route path="/admin" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
