/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Update() {
  const initialstate = {
    name: "",
    contactno: "",
    emailaddress: "",
    address: "",
  };

  const [state, setState] = useState(initialstate);
  const { id } = useParams();
  const { name, contactno, emailaddress, address } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5010/api/get/${id}`)
      .then((res) => {
        setState({
          name: res.data[0].name,
          contactno: res.data[0].contactno,
          emailaddress: res.data[0].emailaddress,
          address: res.data[0].address,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5010/api/put/${id}`, {
        name,
        contactno,
        emailaddress,
        address,
      })
      .then(() => {
        setTimeout(() => navigate("/home"), 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="col-sm-10 mx-auto">
          <h1 className="col-sm-4 my-3 mx-auto">User Registartion</h1>
          <form onSubmit={handlesubmit} className="form-group">
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
                    value="Update"
                  />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
