import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
//import Employee from "./components/state";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateEmployee from "./components/create-employee.component";
import EditEmployee from "./components/edit-employee.component";
import EmployeeList from "./components/employee-list.component";

function App() {
  return (
 <Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="primary">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-employee"} className="nav-link">
                Happy learning and grow
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-employee"} className="nav-link">
                  Create Employee
                </Link>
              </Nav>

             { /*<Nav>
                <Link to={"/edit-employee/:id"} className="nav-link">
                  Edit Student
                </Link>
             </Nav> */}

              <Nav>
                <Link to={"/employee-list"} className="nav-link">

                Employee List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateEmployee} />
                <Route path="/create-employee" component={CreateEmployee} />
                <Route path="/edit-employee/:id" component={EditEmployee} />
                <Route path="/employee-list" component={EmployeeList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
 </Router>);
}

export default App;