/** @format */

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const initialstate = {
  name: "",
  contactno: "",
  emailaddress: "",
  password: "",
  address: "",
};

export default function Register() {
  const [state, setState] = useState(initialstate);
  const { name, contactno, emailaddress, password, address } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5010/api/post", {
        name,
        contactno,
        emailaddress,
        password,
        address,
      })
      .then(() => {
        setState({
          name: "",
          contactno: "",
          emailaddress: "",
          password: "",
          address: "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data);
      });

    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  return (
    <div className="container">
      <div className="col-sm-10 mx-auto">
        <h1 className="col-sm-4 my-3 mx-auto">User Registartion</h1>
        <form className="form-group" onSubmit={handleSubmit}>
          <table className="table">
            <tr>
              <td>
                <h4>Name</h4>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <h4>Contact No</h4>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  name="contactno"
                  value={contactno}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <h4>Email Address</h4>
              </td>
              <td>
                <input
                  type="email"
                  className="form-control"
                  name="emailaddress"
                  value={emailaddress}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <h4>Password</h4>
              </td>
              <td>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <h4>Address</h4>
              </td>

              <td>
                <textarea
                  rows={5}
                  cols={30}
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  type="submit"
                  className="btn btn-primary my-2  bg-primary"
                  value="Submit"
                />
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}
