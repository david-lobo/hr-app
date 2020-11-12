import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      salary: "",
      errors: [],
      departments: []
    };

    this.handleCreateNewItem = this.handleCreateNewItem.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.input = React.createRef();
    this.loadDepartments();
  }

  handleCreateNewItem(event) {
    event.preventDefault();

    const { name, salary } = event.target;
    const { history } = this.props;
    const data = {
      name: name.value,
      salary: salary.value,
      department_id: department_id.value
    };

    axios
      .post("/employees", data)
      .then(response => {
        history.push("/employees");
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        });
      });
  }

  loadDepartments() {
    axios
    .get(`/departments?perPage=10000`)
    .then((response) => {
      this.setState({ departments: response.data.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  hasErrorFor(field) {
    return !!this.state.errors[field];
  }

  renderErrorFor(field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className="invalid-feedback">
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      );
    }
  }

  render() {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12"><h3>Create Employee</h3></div>
          <div className="col-md-12">
            <Link className="btn btn-primary btn-sm mb-3" to="/employees">
              Back to Employees
            </Link>

            <div className="card">
              <div className="card-header">Add New </div>
              <div className="card-body">
                <form onSubmit={this.handleCreateNewItem}>
                  <div className="form-group">
                    <label htmlFor="name"> Name</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("name") ? "is-invalid" : ""
                      }`}
                      name="name"
                      ref={this.input}
                    />
                    {this.renderErrorFor("name")}
                  </div>

                  <div className="form-group">
                    <label htmlFor="salary"> Salary</label>
                    <input
                      id="salary"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("salary") ? "is-invalid" : ""
                      }`}
                      name="salary"
                      ref={this.input}
                    />
                    {this.renderErrorFor("salary")}
                  </div>

                  <div className="form-group">
                    <label htmlFor="department_id"> Department</label>
                    <select 
                        id="department_id"
                        className={`form-control ${
                            this.hasErrorFor("department_id") ? "is-invalid" : ""
                          }`}
                        name="department_id"
                        ref={this.input}
                    >
                    {this.state.departments.map((item, i) => ( 
                        <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    )}
                    </select>
                    {this.renderErrorFor("department_id")}
                  </div>
                  <button className="btn btn-primary">Create Employee</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeCreate;
