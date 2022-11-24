import React from "react";
import { Link } from "react-router-dom";
import Authentication from "../Authentication/Authentication";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
        <Link to="/" className="navbar-brand">
          FoodViz
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link active" to={"/corpus"}>
                Corpus
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link active" to={"/datasets"}>
                Datasets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/upload"}>
                Upload
              </Link>
            </li>
          </ul>
        </div>
        <Authentication />
      </nav>
    </header>
  );
};
export default Header;
