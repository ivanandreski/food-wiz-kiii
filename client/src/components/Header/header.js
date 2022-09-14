import React from "react";
import { Link } from "react-router-dom";
import Auth from "../Auth/Auth";
import Authentication from "../Authentication/Authentication";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
        <a className="navbar-brand" href="#">
          FoodViz
        </a>
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
            <li className="nav-item">
              <Link className="nav-link active" to={"/upload"}>
                Upload
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/datasets"}>
                Datasets
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/predict"}>
                Free text FoodNER annotation
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/result-resources"}>
                FoodNER resources
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/food-onto-map"}>
                Food Onto Map Index
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/foo-dis"}>
                Food-Disease annotations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/cafeteria"}>
                Cafeteria annotations
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
