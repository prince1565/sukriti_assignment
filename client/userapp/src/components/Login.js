/** @format */

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const initialstate = {
  emailaddress: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialstate);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5010/login", state)
      .then(async (res) => {
        if (res.data.Login) {
          const value = JSON.stringify(res.data.username);
          Cookies.set("user", value, { expires: 1 });
          dispatch(login());
          setTimeout(() => {
            navigate("/home");
          }, 100);
        } else {
          alert("data not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleInputChange}
                name="emailaddress"
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleInputChange}
                name="password"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
