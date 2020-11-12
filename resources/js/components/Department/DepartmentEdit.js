import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class DepartmentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      errors: [],
    };

    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.input = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios
      .get(`/departments/${id}/edit`)
      .then((response) => {
        this.setState({ name: response.data.name });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdateItem(event) {
    event.preventDefault();

    const id = this.props.match.params.id;
    const { name } = event.target;
    const { history } = this.props;

    const data = {
      name: name.value
    };

    axios
      .put("/departments/" + id, data)
      .then((response) => {
        // redirect to the homepage
        history.push("/departments");
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors,
        });
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
          <div className="col-md-12"><h3>Edit Department</h3></div>
          <div className="col-md-12">
            <Link className="btn btn-primary btn-sm mb-3" to="/departments">
              Back to Departments
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
                  <button className="btn btn-primary">Update Department</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DepartmentEdit;
