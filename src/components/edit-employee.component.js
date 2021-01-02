import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeePhone = this.onChangeEmployeePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/employees/edit-employee/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeEmployeeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmployeeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeEmployeePhone(e) {
    this.setState({ phone: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const employeeObject = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    };

    axios
      .put(
        "http://localhost:4000/employees/update-employee/" +
          this.props.match.params.id,
        employeeObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Employee successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to Employee List
    this.props.history.push("/employee-list");
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeEmployeeName}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={this.onChangeEmployeeEmail}
            />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={this.state.phone}
              onChange={this.onChangeEmployeePhone}
            />
          </Form.Group>

          <Button variant="primary" size="lg" block="block" type="submit">
            Update Employee
          </Button>
        </Form>
      </div>
    );
  }
}
