import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import bootstrap from "bootstrap/dist/css/bootstrap.css";

const Paginator = (props) => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {props.pagination.links.map((page, i) => {
          var label = "" + page.label;
          label = label.replace("&laquo;", "").replace("&raquo;", "");
          var active = false;
          let disabled = false;
          if (page.active) {
            active = true;
          }

          if (
            label.includes("Next") &&
            props.pagination.current_page == props.pagination.last_page
          ) {
            disabled = true;
          }
          return (
            <li
              key={label}
              className={
                "page-item " +
                (disabled ? "disabled" : "") +
                (active ? " active" : "")
              }
            >
              <a className="page-link" onClick={() => props.paginate(label)}>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginator;
