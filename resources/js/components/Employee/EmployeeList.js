import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paginator from '../Paginator';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pagination: {
          data: []
      }
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(page) {
    var params = '';
    if (page !== null) {
      params = '?page=' + page;
    }
    axios.get("/employees" + params).then(response => {
      this.setState({
        pagination: response.data
      });
    });
  }

  paginate(page) {
    if (page.includes('Previous')) {
      if (this.state.pagination.current_page > 1) {
        page = this.state.pagination.current_page-1;
      }
    } else if (page.includes('Next')) {
      if (this.state.pagination.current_page < this.state.pagination.last_page) {
        page = this.state.pagination.current_page+1;
      }
    }
    this.getData(page);
  }

  handleDelete(e) {
    e.preventDefault();

    const id = e.target.id.value;
    axios.delete("/employees/" + id);
    this.getData();
  }

  render() {
    const { items } = this.state;

    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12"><h3>All Employees</h3></div>
          <div className="col-md-12">
            <Link className="btn btn-primary btn-sm mb-3" to="/employees/create">
              Create Employee
            </Link>

            {this.state.pagination.data.length !== 0 ? (
            <React.Fragment>
              <div className="table-responsive">
              <table className="table table-hovered table-striped table-bordered">
                <thead>
                  <tr>
                    <td>Id.</td>
                    <td>Name</td>
                    <td>Salary</td>
                    <td>Department</td>
                    <td className="action">Edit</td>
                    <td className="action">Delete</td>
                  </tr>
                </thead>
                <tbody>
                {this.state.pagination.data.map((item, i) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td> {item.employee_name}</td>
                    <td> {item.salary}</td>
                    <td> {item.department_name}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`employees/${item.id}/edit`}
                        key={item.id}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <form onSubmit={this.handleDelete}>
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="btn btn-danger">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
              </div>

              <Paginator pagination={this.state.pagination} paginate={(page) => {this.paginate(page)}} />
            </React.Fragment>
            ) : (
              <div> No Employees Found!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
