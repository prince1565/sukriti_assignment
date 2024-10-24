/** @format */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Home() {
  const [data, setdata] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5010/api/get");
    setdata(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios.delete(`http://localhost:5010/delete/${id}`);
      setTimeout(() => loadData(), 100);
    }
  };

  const handlelogout = () => {
    Cookies.remove("user");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row col-sm-12">
        <div className="col-sm-10 mx-auto my-5">
          <h2>
            <u>User Management System</u>
          </h2>
          <Link className="nav-link my-4 col-sm-4 mx-auto my-5 " to="/register">
            <h1>Register New User?</h1>
          </Link>
        </div>
        <div className="col-sm-1 mx-auto mt-5">
          <button className="btn btn-primary" onClick={handlelogout}>
            logout
          </button>
        </div>
      </div>

      <br />
      <br />

      <div className="col-sm-10 mx-auto">
        <table className="table table-bodered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Contact No</th>
              <th>Email Address</th>
              <th>Address</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.contactno}</td>
                  <td>{item.emailaddress}</td>

                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-secondary">Update</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
