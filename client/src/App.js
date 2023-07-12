import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import axios from "axios";

//import RouteGuard from "./components/RouteGuard";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Voluntarios from "./pages/Voluntarios";
//import Relatorios from "./pages/Relatorios";
import Areas from "./pages/Areas";
import NewVoluntario from "./pages/NewVoluntario";
import UserPage from "./pages/UserPage";
import Dashboard from "./pages/Dashboard";

function App() {
  //const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    async function hasJWT() {
      if (!localStorage.getItem("token")) {
        setAuthorized(false);
      }
      const setAuthToken = (token) => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = `${token}`;
        } else delete axios.defaults.headers.common["Authorization"];
      };

      //check user has JWT token
      //localStorage.getItem("token") ? flag=true : flag=false

      axios
        .post("/api/authenticate", {
          token: localStorage.getItem("token"),
        })
        .then((result) => {
          let jsonResult = result.data;
          if (jsonResult.success === true) {
            localStorage.setItem("token", jsonResult.token);

            setAuthToken(jsonResult.token);
            setAuthorized(true);
            setLoggedUser(jsonResult.user);
          } else {
            if (localStorage.getItem("token")) {
              localStorage.removeItem("token");
            }

            setAuthorized(false);
          }
        })
        .catch((e) => {
          console.log(e);
          setAuthorized(false);
        });
    }

    hasJWT();
  }, [authorized]);

  const RouteGuard = () => {
    if (authorized === true) {
    //if (true) {
      return (
        <div className="dashboard-container">
          <SideBar menu={sidebar_menu} loggedUser={loggedUser} />
          <div className="dashboard-body">
            <Outlet />
          </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard-container">
          <div className="dashboard-body">
            <Login />
          </div>
        </div>
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouteGuard />}>
          <Route path="/" element={<Voluntarios />} />
          <Route
            path="/voluntarios"
            element={<Voluntarios loggedUser={loggedUser} />}
          />
          <Route path="/areas" element={<Areas />} />
          <Route path="/novovoluntario" element={<NewVoluntario />} />
          <Route path="/locations" element={<div></div>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserPage user={loggedUser} />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
