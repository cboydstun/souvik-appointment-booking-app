import React, { useEffect, useState } from "react";
// import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
// import Sitefooter from "../Footers/Sitefooter";
import "./newStyle2.css";
// import "../bootstrap/dist/css/bootstrap.min.css";

// import "bootstrap/dist/css/bootstrap/min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import {Link,useHistory} from 'react-router-dom';

export default function Loginpage() {


 

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('role') === 'admin'){
      history.push('/admindashboard')
    }

    if(localStorage.getItem('token') && localStorage.getItem('role') === 'user'){
      history.push('/dashboard')
    }
  })


  const authAxios = axios.create({
    baseURL: "http://localhost:5001",
  });

  let form_data = {};
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const history = useHistory()


  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    let form_data = {
      email: email,

      password: password,
    };

    console.log(form_data);

    authAxios.post("/aptusers/login", form_data, {}).then((res) => {
      console.log(res.data);

     

      if (res.data.status === "ok") {
        // everythign went fine
        console.log("Got the token: ", res.data.data);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("name2", res.data.name);
        localStorage.setItem("token", res.data.data);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("email2", res.data.email);
        alert("Logged in successfully");
        window.location = "/dashboard";
      } else {
        alert("invalid credentials");
      }
    });
   
  };

  return (
    <div>
      <video
        src="/videos/eduvid3.mp4"
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "auto" }}
      />
      <div className="register " class="registerback">
        <div
          className="register_container shadow"
          class="colorbox"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} class=" newrow">
            {/* <h5>First Name</h5> */}
            <h3 class="section-header">User Login</h3>
            <br />
            <div class=" indv">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-user fa" aria-hidden="true"></i>
                </span>

                <input
                  placeholder="Enter Email"
                  name="firstname"
                  class="form-control"
                  value={email}
                  type="email"
                  required
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div class="indv">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-lock fa" aria-hidden="true"></i>
                </span>
                <input
                  placeholder="Password"
                  name="password"
                  class="form-control"
                  defaultValue={password}
                  required
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                ></input>
                {errors.password && errors.password.message}
              </div>
            </div>
            {/* <h5>Confirm Password</h5> */}

            <br></br>

            <div class="coolone">
              <button
                class="col-md-10 indv"
                style={{ backgroundColor: "#3f51b5", color: "white" }}
                className="shadow btn my-2 mx-5"
                type="submit"
              >
                Login
              </button>
            </div>

            <span>
              Don't have a user account?{" "}
              <Link to="/">Sign Up Now</Link>
            </span>
            <br />
            <span>
              Go to{" "}
              <Link to="/AdminLogin">Admin Sign In</Link>
            </span>
            <br />
            <p style={{ color: "lightgray" }}>Made by Souvik Das in 2021</p>
          </form>
        </div>
      </div>
      {/* <Sitefooter /> */}
    </div>
  );
}
