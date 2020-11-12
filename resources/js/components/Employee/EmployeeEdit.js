import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      salary: "",
      departments: "",
      errors: [],
      departments: [],
    };

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.input = React.createRef();
    this.loadDepartments();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/employees/${id}/edit`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          salary: response.data.salary,
          department_id: response.data.department_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdateItem(event) {
    event.preventDefault();

    const id = this.props.match.params.id;
    const { name, salary, department_id } = event.target;
    const { history } = this.props;

    const data = {
      name: name.value,
      salary: salary.value,
      department_id: department_id.value,
    };
    axios
      .put("/employees/" + id, data)
      .then((response) => {
        // redirect to the homepage
        history.push("/employees");
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors,
        });
      });
  }

  loadDepartments() {
    axios
      .get(`/departments?perPage=1000`)
      .then((response) => {
        this.setState({ departments: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDepartmentChange(event) {
    this.setState({ department_id: event.target.value });
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
          <div className="col-md-12">
            <h3>Edit Employee</h3>
          </div>
          <div className="col-md-12">
            <Link className="btn btn-primary btn-sm mb-3" to="/employees">
              Back to Employees
            </Link>

            <div className="card">
              <div className="card-header">Edit Item</div>
              <div className="card-body">
                <form onSubmit={this.handleUpdateItem}>
                  <div className="form-group">
                    <label htmlFor="name"> Name</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("name") ? "is-invalid" : ""
                      }`}
                      name="name"
                      defaultValue={this.state.name}
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
                      defaultValue={this.state.salary}
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
                      value={this.state.department_id}
                      onChange={(e) => this.handleDepartmentChange(e)}
                    >
                      {this.state.departments.map((item, i) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {this.renderErrorFor("department_id")}
                  </div>
                  <button className="btn btn-primary">Update Employee</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeEdit;
