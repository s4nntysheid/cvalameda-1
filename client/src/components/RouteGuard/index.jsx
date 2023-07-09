import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import mongoose from "mongoose";

const SECRET = "djfiwuw23";

const RouteGuard = ({ component: Component, ...rest }) => {
  async function hasJWT() {
    const setAuthToken = (token) => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
      } else delete axios.defaults.headers.common["Authorization"];
    };
    let flag = false;

    //check user has JWT token
    //localStorage.getItem("token") ? flag=true : flag=false

    let result = await fetch("localhost:3001/authenticate", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await result);
    let jsonResult = await result.json();
    console.log(jsonResult);
    if (jsonResult) {
      localStorage.setItem("token", jsonResult.token);

      setAuthToken(jsonResult.token);
      flag = true;
    } else {
      alert("babababababab");
      flag = false;
    }

    return flag;
  }

  console.log("aaaaaaaaaaaaaaaa", hasJWT())

  return (
    <Route
      {...rest}
      render={(props) =>
        hasJWT() ? <Component {...props} /> : <Link to="/login" />
      }
    />
  );
};

export default RouteGuard;
