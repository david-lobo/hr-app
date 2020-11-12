import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import DepartmentList from "./Department/DepartmentList";
import DepartmentCreate from "./Department/DepartmentCreate";
import DepartmentEdit from "./Department/DepartmentEdit";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeCreate from "./Employee/EmployeeCreate";
import EmployeeEdit from "./Employee/EmployeeEdit";
import Home from "./Home";

const Header = () => (
  <Router>
    <div>
      <nav className="navbar navbar-dark bg-success   navbar-expand-lg  ">
        <Link to="/" className="navbar-brand">
          HR App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link exact="true" to="/departments" className="nav-link">
                Departments
              </Link>
            </li>
            <li className="nav-item active">
              <Link exact="true" to="/employees" className="nav-link">
                Employees
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Route exact path="/" component={Home} />
      <Route exact path="/departments" component={DepartmentList} />
      <Route exact path="/departments/create" component={DepartmentCreate} />
      <Route path="/departments/:id/edit" component={DepartmentEdit} />
      <Route exact path="/employees" component={EmployeeList} />
      <Route exact path="/employees/create" component={EmployeeCreate} />
      <Route path="/employees/:id/edit" component={EmployeeEdit} />
    </div>
  </Router>
);

export default Header;
