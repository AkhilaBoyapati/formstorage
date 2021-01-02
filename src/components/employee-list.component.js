import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/employees/")
      .then((res) => {
        this.setState({
          employees: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  addFromDate(g) {
    var date = new Date(g.from_date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    var contime =
      date.getMonth() +
      1 +
      "-" +
      date.getDate() +
      "-" +
      date.getFullYear() +
      " " +
      strTime;
    return contime;
  }
  addToDate(g) {
    var date = new Date(g.to_date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    var contime =
      date.getMonth() +
      1 +
      "-" +
      date.getDate() +
      "-" +
      date.getFullYear() +
      " " +
      strTime;
    return contime;
  }
  render() {
    return (
      <div>
        <Table striped bordered hover>
          {/* <able className="table"> */}
          <thead>
            <tr>
              <th className="tablehead">Name</th>
              <th className="tablehead">Email</th>
              <th className="tablehead">Phone</th>
              <tr>
                <th className="tablehead"> address</th>
                <th className="tablehead">pincode</th>
                <th className="tablehead">From</th>
                <th className="tablehead">To</th>
                <th className="tablehead">Duration(days)</th>
              </tr>

              <th className="tablehead">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((k, i) => {
              return (
                <tr key={i}>
                  <td className="tabledata">{k.name}</td>
                  <td className="tabledata">{k.email}</td>
                  <td className="tabledata">{k.phone}</td>

                  {k.Address.map((g, index) => {
                    return (
                      <tr>
                        <td className="tabledata">{g.address}</td>
                        <td className="tabledata">{g.pincode}</td>
                        <td className="tabledata">{this.addFromDate(g)}</td>
                        <td className="tabledata">{this.addToDate(g)}</td>
                        <td className="tabledata">
                          {(new Date(g.to_date) - new Date(g.from_date)) /
                            (1000 * 60 * 60 * 24)}
                        </td>
                      </tr>
                    );
                  })}

                  <td className="tabledata">
                    <Link className="edit-link" to={`/edit-employee/${k._id}`}>
                      Edit
                    </Link>
                    <Button
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:4000/employees/delete-employee/${k._id}`
                          )
                          .then((res) => {
                            console.log("Employee successfully deleted!");
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                      size="sm"
                      variant="danger"
                    >
                      Delete
                    </Button>
                    &nbsp;&nbsp;
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
