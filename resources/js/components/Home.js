import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paginator from "./Paginator";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pagination: {
        data: [],
        current_page: 1,
        links: [],
      },
      report: "departmentOver50k",
    };
  }

  componentDidMount() {
    this.getData(1);
  }

  getData(page) {
    let params = "?report=" + this.state.report;
    if (page !== null) {
      params += "&page=" + page;
    }
    axios.get("/reports" + params).then((response) => {
      let newState = { ...this.state };
      newState.pagination.data = response.data.data;
      newState.pagination.links = response.data.links;
      this.setState(newState);
    });
  }

  paginate(page) {
    if (page.includes("Previous")) {
      if (this.state.pagination.current_page > 1) {
        page = this.state.pagination.current_page - 1;
      }
    } else if (page.includes("Next")) {
      if (
        this.state.pagination.current_page < this.state.pagination.last_page
      ) {
        page = this.state.pagination.current_page + 1;
      }
    }
    this.getData(page);
  }

  handleReportChange(e) {
    this.setState({ report: e.target.value }, () => {
      this.getData(1);
    });
  }

  render() {
    const column3Title =
      this.state.report === "departmentOver50k" ? "Over 50K" : "Highest Salary";
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h3>Reports</h3>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="report"> Select Report to View</label>
              <select
                id="report"
                name="report"
                className="form-control"
                value={this.state.report}
                onChange={(e) => this.handleReportChange(e)}
              >
                <option value="departmentMaxSalary">
                  Highest Salary In Department
                </option>
                <option value="departmentOver50k">
                  Employees with Salary Over 50K{" "}
                </option>
              </select>
            </div>
            {this.state.pagination.data.length !== 0 ? (
              <React.Fragment>
                <div className="table-responsive">
                  <table className="table table-hovered table-striped table-bordered">
                    <thead>
                      <tr>
                        <td>Id.</td>
                        <td>Department</td>
                        <td>{column3Title}</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.pagination.data.map((item, i) => {
                        let column1Value = i;
                        if (typeof item.id !== "undefined") {
                          column1Value = item.id;
                        }

                        if (typeof item.department_id !== "undefined") {
                          column1Value = item.department_id;
                        }
                        const column3Value =
                          this.state.report === "departmentOver50k"
                            ? item.salary_count
                            : item.max_salary;
                        return (
                          <tr key={column1Value}>
                            <td>{column1Value}</td>
                            <td> {item.name}</td>
                            <td> {column3Value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <Paginator
                  pagination={this.state.pagination}
                  paginate={(page) => {
                    this.paginate(page);
                  }}
                />
              </React.Fragment>
            ) : (
              <div> No Data Found!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
