import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Create from "./Pages/Create/Create";
import Project from "./Pages/Project/Project";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

import Onlineusers from "./Components/Onlineusers";

import "./App.css";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              {user && <Route path="/" element={<Dashboard />} />}
              {!user && <Route path="/" element={<Login />} />}
              {user && <Route path="/create" element={<Create />} />}
              {!user && <Route path="/create" element={<Login />} />}
              {user && <Route path="/projects/:id" element={<Project />} />}
              {!user && <Route path="/projects/:id" element={<Login />} />}
              {!user && <Route path="/login" element={<Login />} />}
              {user && <Route path="/login" element={<Dashboard />} />}
              {!user && <Route path="/signup" element={<Signup />} />}
              {user && <Route path="/signup" element={<Dashboard />} />}
            </Routes>
          </div>
          {user && <Onlineusers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
